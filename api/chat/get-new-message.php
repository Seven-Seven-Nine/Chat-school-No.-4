<?php

session_start();

header('Content-Type: application/json');

require_once $_SERVER['DOCUMENT_ROOT'] . '/api/database/database.php';

/**
 * Получение новых сообщений чата.
 * @param string|int $id_message id последнего сообщения в чате пользователя.
 * @param string|int $id_chat id чата, в котором нужно найти новые сообщения.
 * @return void
 */
function get_new_message(string | int $id_message, string | int $id_chat): void {
    try {
        $connection = get_connection_database();
        $stmt = $connection->prepare('SELECT `id_message`, `id_chat`, `id_user`, `text`, `date`, `path_to_file`, `file_name` FROM `messages` WHERE `id_message` > ? AND `id_chat` = ? ORDER BY `id_message` ASC LIMIT 100');
        $stmt->bind_param('ss', $id_message, $id_chat);
        $stmt->execute();

        $result_new_message = $stmt->get_result();
        if ($result_new_message->num_rows > 0) {
            $response = ['result' => 'new messages found successfully'];

            while ($message_row = $result_new_message->fetch_assoc()) {
                $login = '';
                $path_to_avatar = '';
                $stmt2 = $connection->prepare('SELECT `login`, `path_to_avatar` FROM `users` WHERE `id_user` = ?');
                $stmt2->bind_param('s', $message_row['id_user']);
                $stmt2->execute();

                $result_user = $stmt2->get_result();
                while ($user_row = $result_user->fetch_assoc()) {
                    $login = $user_row['login'];
                    $path_to_avatar = $user_row['path_to_avatar'];
                }

                $response[$message_row['id_message']] = [
                    'id_message' => $message_row['id_message'],
                    'id_user' => $message_row['id_user'],
                    'login' => $login,
                    'path_to_avatar' => $path_to_avatar,
                    'text' => htmlspecialchars($message_row['text']),
                    'path_to_file' => $message_row['path_to_file'],
                    'file_name' => $message_row['file_name'],
                    'date' => $message_row['date']
                ];
            }

            echo json_encode($response);
        } else {
            echo json_encode(['result' => 'there are no new messages']);
        }
    } catch (\Throwable $th) {
        echo json_encode([
            'error' => 'error in the message editing request',
            'error message' => 'Ошибка запроса редактирования сообщения!',
            'more information error' => $th->getMessage()
        ]);
    } finally {
        $connection->close();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = json_decode(file_get_contents('php://input'), true);
    get_new_message($json['id_message'], $json['id_chat']);
}
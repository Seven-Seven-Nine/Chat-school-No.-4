<?php

session_start();

header('Content-Type: application/json');

require_once $_SERVER['DOCUMENT_ROOT'] . '/api/database/database.php';

/**
 * Проверка на наличие чатов пользователя.
 * @return возвращает JSON с данными чата или сообщением о том, что у пользователя нет подключённых чатов.
 */
function loading_chat(): void {
    try {
        $connection = get_connection_database();
        $stmt = $connection->prepare('SELECT `chat_participants`.`id_chat`, `chat_participants`.`id_user`, `chat_participants`.`joined_at` FROM `chat_participants` JOIN `users` ON `chat_participants`.`id_user` = `users`.`id_user` WHERE `users`.`login` = ?');
        $stmt->bind_param('s', $_SESSION['login']);
        $stmt->execute();

        $result_search = $stmt->get_result();
        if ($result_search->num_rows > 0) {
            $response = ['result' => 'chats found successfully'];
            while ($row = $result_search->fetch_assoc()) {
                $stmt->prepare('SELECT `id_chat`, `title`, `path_to_image` FROM `chats` WHERE `id_chat` = ?');
                $stmt->bind_param('s', $row['id_chat']);
                $stmt->execute();

                $result_chat = $stmt->get_result();
                while ($row_chat = $result_chat->fetch_assoc()) {
                    $response[$row_chat['id_chat']] = [
                        'id_chat' => $row_chat['id_chat'],
                        'title' => $row_chat['title'],
                        'path_to_image' => $row_chat['path_to_image']
                    ];
                }
            }

            echo json_encode($response);
        } else {
            echo json_encode(['result' => 'the user does not have any active chats']);
        }
    } catch (\Throwable $th) {
        echo json_encode([
            'error' => 'error requesting chats to be uploaded',
            'error message' => 'Ошибка запроса загрузки чатов пользователя!',
            'more information error' => $th->getMessage()
        ]);
    } finally {
        $connection->close();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    loading_chat();
}
<?php

session_start();

header('Content-Type: application/json');

require_once $_SERVER['DOCUMENT_ROOT'] . '/api/database/database.php';

/**
 * Изменить название чата.
 * @param string|int $id_chat id чата, для которого нужно изменить название чата.
 * @param string $new_title новое название чата.
 * @return void
 */
function change_chat_title(string | int $id_chat, string $new_title): void {
    try {
        $connection = get_connection_database();

        $stmt = $connection->prepare('SELECT `id_user` FROM `users` WHERE `login` = ?');
        $stmt->bind_param('s', $_SESSION['login']);
        $stmt->execute();

        $id_user = '';
        $result_search_user = $stmt->get_result();
        while ($row = $result_search_user->fetch_assoc()) {
            $id_user = $row['id_user'];
        }

        $stmt2 = $connection->prepare('SELECT `id_user` FROM `chats` WHERE `id_user` = ?');
        $stmt2->bind_param('s', $id_user);
        $stmt2->execute();

        $result_search_id_creator = $stmt2->get_result();
        if ($result_search_id_creator->num_rows > 0) {
            $stmt3 = $connection->prepare('UPDATE `chats` SET `title` = ? WHERE `id_chat` = ?');
            $stmt3->bind_param('ss', $new_title, $id_chat);
            $stmt3->execute();

            echo json_encode(['result' => 'the chat title has been successfully changed']);
        } else {
            echo json_encode([
                'error' => 'error, the user doesn\'t have enough rights to change the chat name',
                'error message' => 'Ошибка, у пользователя нет прав для изменения названия чата!',
            ]);
        }
    } catch (\Throwable $th) {
        echo json_encode([
            'error' => 'error requesting a change in the chat title',
            'error message' => 'Ошибка запроса изменения названия чата!',
            'more information error' => $th->getMessage()
        ]);
    } finally {
        $connection->close();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = json_decode(file_get_contents('php://input'), true);
    change_chat_title($json['id_chat'], $json['new_title']);
}
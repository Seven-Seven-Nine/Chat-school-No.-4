<?php

session_start();

header('Content-Type: application/json');

require_once $_SERVER['DOCUMENT_ROOT'] . '/api/database/database.php';

/**
 * Добавления пользователя а активный чат.
 * @param string $login логин пользователя.
 * @param string|int $id_chat id чата, в который добавляют пользователя.
 * @return void
 */
function add_user_chat(string $login, string | int $id_chat): void {
    try {
        $date = date('Y-m-d H:i:s');
        $connection = get_connection_database();

        $stmt = $connection->prepare('SELECT `id_user` FROM `users` WHERE `login` = ?');
        $stmt->bind_param('s', $login);
        $stmt->execute();

        $id_user = '';
        $result_search_id_user = $stmt->get_result();
        while ($row = $result_search_id_user->fetch_assoc()) {
            $id_user = $row['id_user'];
        }

        $stmt2 = $connection->prepare('SELECT `id_chat`, `id_user` FROM `chat_participants` WHERE `id_chat` = ? AND `id_user` = ?');
        $stmt2->bind_param('ss', $id_chat, $id_user);
        $stmt2->execute();

        $result_search_user_in_chat = $stmt2->get_result();
        if ($result_search_user_in_chat->num_rows === 0) {
            $stmt3 = $connection->prepare('INSERT INTO `chat_participants` (`id_chat`, `id_user`, `joined_at`) VALUES (?, ?, ?)');
            $stmt3->bind_param('sss', $id_chat, $id_user, $date);
            $stmt3->execute();
    
            echo json_encode(['result' => 'the user has been successfully added to the chat']);
        } else {
            echo json_encode([
                'error' => 'the user is already in the chat',
                'error message' => 'Пользователь уже добавлен в чат!'
            ]);
        }
    } catch (\Throwable $th) {
        echo json_encode([
            'error' => 'error in the request to add a user to the chat',
            'error message' => 'Ошибка запроса добавления пользователя в чат!',
            'more information error' => $th->getMessage()
        ]);
    } finally {
        $connection->close();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = json_decode(file_get_contents('php://input'), true);
    add_user_chat($json['login'], $json['id_chat']);
}
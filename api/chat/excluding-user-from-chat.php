<?php

session_start();

header('Content-Type: application/json');

require_once $_SERVER['DOCUMENT_ROOT'] . '/api/database/database.php';

/**
 * Функция получения пользователей чата.
 * @param string|int $id_chat id чата.
 * @param string $login логин пользователя.
 * @return void
 */
function excluding_user_from_chat(string | int $id_chat, string $login): void {
    try {
        $connection = get_connection_database();
        $stmt = $connection->prepare('SELECT `id_user` FROM `users` WHERE `login` = ?');
        $stmt->bind_param('s', $login);
        $stmt->execute();

        $id_user = '';
        $result_search_id_user = $stmt->get_result();
        while ($row = $result_search_id_user->fetch_assoc()) {
            $id_user = $row['id_user'];  
        }

        $stmt2 = $connection->prepare('DELETE FROM `chat_participants` WHERE `id_chat` = ? AND `id_user` = ?');
        $stmt2->bind_param('ss', $id_chat, $id_user);
        $stmt2->execute();

        echo json_encode(['result' => 'the user has been successfully deleted']);
    } catch (\Throwable $th) {
        echo json_encode([
            'error' => 'error in the request to exclude the user from the chat',
            'error message' => 'Ошибка запроса исключения пользователя из чата!',
            'more information error' => $th->getMessage()
        ]);
    } finally {
        $connection->close();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = json_decode(file_get_contents('php://input'), true);
    excluding_user_from_chat($json['id_chat'], $json['login']);
}
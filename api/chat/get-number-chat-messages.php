<?php

session_start();

header('Content-Type: application/json');

require_once $_SERVER['DOCUMENT_ROOT'] . '/api/database/database.php';

/**
 * Получить количество сообщений в чате. Необходимо для проверки обновлений количества сообщений.
 * @param string|int $id_chat id чата, к которому будет привязано сообщение.
 * @return void
 */
function get_number_chat_messages(string | int $id_chat): void {
    try {
        $connection = get_connection_database();
        $stmt = $connection->prepare('SELECT `id_message` FROM `messages` WHERE `id_chat` = ?');
        $stmt->bind_param('s', $id_chat);
        $stmt->execute();

        $result = $stmt->get_result();
        $num = $result->num_rows;

        echo json_encode([
            'result' => 'successfully receiving the number of chat messages',
            'number of messages' => $num
        ]);
    } catch (\Throwable $th) {
        echo json_encode([
            'error' => 'error in the request to receive the number of chat messages',
            'error message' => 'Ошибка запроса получения количества сообщений в чате!',
            'more information error' => $th->getMessage()
        ]);
    } finally {
        $connection->close();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = json_decode(file_get_contents('php://input'), true);
    get_number_chat_messages($json['id_chat']);
}
<?php

session_start();

header('Content-Type: application/json');

require_once $_SERVER['DOCUMENT_ROOT'] . '/api/database/database.php';

/**
 * Получение данных сообщения.
 * @param string|int $id_message id сообщения для получения его данных.
 * @return void
 */
function get_all_data(string | int $id_message): void {
    try {
        $connection = get_connection_database();
        $stmt = $connection->prepare('SELECT `id_message`, `id_chat`, `id_user`, `text`, `date` FROM `messages` WHERE `id_message` = ?');
        $stmt->bind_param('s', $id_message);
        $stmt->execute();

        $result = $stmt->get_result();
        while ($row = $result->fetch_assoc()) {
            echo json_encode([
                'result' => 'these messages were successfully received',
                'id_message' => $row['id_message'],
                'id_chat' => $row['id_chat'],
                'id_user' => $row['id_user'],
                'text' => $row['text'],
                'date' => $row['date']
            ]);
        }
    } catch (\Throwable $th) {
        echo json_encode([
            'error' => 'error requesting the receipt of message data',
            'error message' => 'Ошибка запроса получения данных сообщения!',
            'more information error' => $th->getMessage()
        ]);
    } finally {
        $connection->close();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = json_decode(file_get_contents('php://input'), true);
    get_all_data($json['id_message']);
}
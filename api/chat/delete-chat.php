<?php

session_start();

header('Content-Type: application/json');

require_once $_SERVER['DOCUMENT_ROOT'] . '/api/database/database.php';

/**
 * Функция удаления чата из базы данных.
 * @param string|int $id_chat id чата, который требуется удалить.
 * @return void
 */
function delete_chat(string | int $id_chat): void {
    try {
        $connection = get_connection_database();
        $stmt = $connection->prepare('DELETE FROM `chats` WHERE `id_chat` = ?');
        $stmt->bind_param('s', $id_chat);
        $stmt->execute();

        echo json_encode(['result' => 'the chat was successfully deleted']);
    } catch (\Throwable $th) {
        echo json_encode([
            'error' => 'chat deletion request error',
            'error message' => 'Ошибка запроса удаления чата!',
            'more information error' => $th->getMessage()
        ]);
    } finally {
        $connection->close();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = json_decode(file_get_contents('php://input'), true);
    delete_chat($json['id_chat']);
}
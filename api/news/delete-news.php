<?php

session_start();

header('Content-Type: application/json');

require_once $_SERVER['DOCUMENT_ROOT'] . '/api/database/database.php';

/**
 * Удаление новости в базе данных.
 * @param string|int $id_news id новости.
 * @return void
 */
function delete_news(string | int $id_news): void {
    try {
        $connection = get_connection_database();
        $stmt = $connection->prepare('DELETE FROM `news` WHERE `id_news` = ?');
        $stmt->bind_param('s', $id_news);
        $stmt->execute();

        echo json_encode(['result' => 'the news was successfully deleted']);
    } catch (\Throwable $th) {
        echo json_encode([
            'error' => 'news deletion request error',
            'error message' => 'Ошибка запроса удаления новости!',
            'more information error' => $th->getMessage()
        ]);
    } finally {
        $connection->close();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = json_decode(file_get_contents('php://input'), true);
    delete_news($json['id_news']);
}
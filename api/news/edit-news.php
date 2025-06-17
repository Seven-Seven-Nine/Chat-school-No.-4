<?php

session_start();

header('Content-Type: application/json');

require_once $_SERVER['DOCUMENT_ROOT'] . '/api/database/database.php';

/**
 * Редактирование новости в базе данных.
 * @param string|int $id_news id новости.
 * @param string $title название новости.
 * @param string $text текст новости. 
 * @return void
 */
function edit_news(string | int $id_news, string $title, string $text): void {
    try {
        $connection = get_connection_database();
        $stmt = $connection->prepare('UPDATE `news` SET `title` = ?, `text` = ? WHERE `id_news` = ?');
        $stmt->bind_param('sss', $title, $text, $id_news);
        $stmt->execute();

        echo json_encode(['result' => 'the news was successfully changed']);
    } catch (\Throwable $th) {
        echo json_encode([
            'error' => 'news editing request error',
            'error message' => 'Ошибка запроса редактирования новости!',
            'more information error' => $th->getMessage()
        ]);
    } finally {
        $connection->close();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = json_decode(file_get_contents('php://input'), true);
    edit_news($json['id_news'], $json['title'], $json['text']);
}
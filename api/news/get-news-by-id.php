<?php

session_start();

header('Content-Type: application/json');

require_once $_SERVER['DOCUMENT_ROOT'] . '/api/database/database.php';

/**
 * Добавление новости в базу данных.
 * @param string|int $id_news id сообщения.
 * @return void
 */
function get_news_by_id(string | int $id_news): void {
    try {
        $connection = get_connection_database();
        $stmt = $connection->prepare('SELECT `id_news`, `id_user`, `title`, `text`, `date` FROM `news` WHERE `id_news` = ?');
        $stmt->bind_param('s', $id_news);
        $stmt->execute();

        $result = $stmt->get_result();
        if ($result->num_rows === 1) {
            while ($row = $result->fetch_assoc()) {
                echo json_encode([
                    'result' => 'news found successfully',
                    'id_news' => $row['id_news'],
                    'id_user' => $row['id_user'],
                    'title' => $row['title'],
                    'text' => $row['text'],
                    'date' => $row['date']
                ]);
            }
        } else {
            echo json_encode(['result' => 'there is no news in the database']);
        }
    } catch (\Throwable $th) {
        echo json_encode([
            'error' => 'error requesting the news',
            'error message' => 'Ошибка запроса получения новости!',
            'more information error' => $th->getMessage()
        ]);
    } finally {
        $connection->close();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = json_decode(file_get_contents('php://input'), true);
    get_news_by_id($json['id_news']);
}
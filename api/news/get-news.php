<?php

session_start();

header('Content-Type: application/json');

require_once $_SERVER['DOCUMENT_ROOT'] . '/api/database/database.php';

/**
 * Получение всех сообщений из базы данных.
 * @return void
 */
function get_news(): void {
    try {
        $connection = get_connection_database();
        $stmt = $connection->prepare('SELECT `id_news`, `id_user`, `title`, `text`, `date` FROM `news` ORDER BY `id_news` DESC');
        $stmt->execute();

        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $response = ['result' => 'news found successfully'];
            while ($row = $result->fetch_assoc()) {
                $response[$row['id_news']] = [
                    'id_news' => $row['id_news'],
                    'id_user' => $row['id_user'],
                    'title' => $row['title'],
                    'text' => $row['text'],
                    'date' => $row['date']
                ];
            }
            echo json_encode($response);
        } else {
            echo json_encode(['result' => 'there is no news in the database']);
        }
    } catch (\Throwable $th) {
        echo json_encode([
            'error' => 'error requesting all the news',
            'error message' => 'Ошибка запроса получения всех новостей!',
            'more information error' => $th->getMessage()
        ]);
    } finally {
        $connection->close();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    get_news();
}
<?php

session_start();

header('Content-Type: application/json');

require_once $_SERVER['DOCUMENT_ROOT'] . '/api/database/database.php';

/**
 * Получить все чаты из базы данных.
 * @return void
 */
function get_all_chats(): void {
    try {
        $connection = get_connection_database();
        $stmt = $connection->prepare('SELECT `id_chat`, `id_user`, `title`, `path_to_image` FROM `chats`');
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $response = ['result' => 'chats found successfully'];
            while ($row = $result->fetch_assoc()) {
                $response[$row['id_chat']] = [
                    'id_chat' => $row['id_chat'],
                    'id_user' => $row['id_user'],
                    'title' => $row['title'],
                    'path_to_image' => $row['path_to_image']
                ];
            }
            echo json_encode($response);
        } else {
            echo json_encode(['result' => 'there are no chats in the database']);
        }
    } catch (\Throwable $th) {
        echo json_encode([
            'error' => 'error receiving all chats',
            'error message' => 'Ошибка запроса получения всех чатов!',
            'more information error' => $th->getMessage()
        ]);
    } finally {
        $connection->close();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    get_all_chats();
}
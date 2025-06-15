<?php

session_start();

header('Content-Type: application/json');

require_once $_SERVER['DOCUMENT_ROOT'] . '/api/database/database.php';

/**
 * Функция получения данных чата.
 * @param mixed $id_chat id чата, данные которого требуется получить.
 * @return void
 */
function get_chat_data(string | int $id_chat): void {
    try {
        $connection = get_connection_database();
        $stmt = $connection->prepare('SELECT `id_chat`, `id_user`, `title`, `path_to_image` FROM `chats` WHERE `id_chat` = ?');
        $stmt->bind_param('s', $id_chat);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                echo json_encode([
                    'result' => 'chat found successfully',
                    'id_chat' => $row['id_chat'],
                    'id_user' => $row['id_user'],
                    'title' => $row['title'],
                    'path_to_image' => $row['path_to_image']
                ]);
            }
        } else {
            echo json_encode([
                'error' => 'the chat was not found',
                'error message' => 'Чат не найден!'
            ]);
        }
    } catch (\Throwable $th) {
        echo json_encode([
            'error' => 'error requesting chat data',
            'error message' => 'Ошибка запроса получения данных чата!',
            'more information error' => $th->getMessage()
        ]);
    } finally {
        $connection->close();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = json_decode(file_get_contents('php://input'), true);
    get_chat_data($json['id_chat']);
}
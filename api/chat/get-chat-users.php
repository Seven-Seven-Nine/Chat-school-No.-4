<?php

session_start();

header('Content-Type: application/json');

require_once $_SERVER['DOCUMENT_ROOT'] . '/api/database/database.php';

/**
 * Функция получения пользователей чата.
 * @param string|int $id_chat id чата.
 * @return void
 */
function get_chat_users(string | int $id_chat): void {
    try {
        $connection = get_connection_database();
        $stmt = $connection->prepare('SELECT `id_user` FROM `chat_participants` WHERE `id_chat` = ?');
        $stmt->bind_param('s', $id_chat);
        $stmt->execute();

        $response = ['result' => 'users found successfully'];

        $result_search_users_id = $stmt->get_result();
        if ($result_search_users_id->num_rows > 0) {
            while ($row_id_user = $result_search_users_id->fetch_assoc()) {
                $stmt2 = $connection->prepare('SELECT `id_user`, `login`, `role`, `email`, `path_to_avatar` FROM `users` WHERE `id_user` = ?');
                $stmt2->bind_param('s', $row_id_user['id_user']);
                $stmt2->execute();

                $result_search_user_data = $stmt2->get_result();
                while ($row_user_data = $result_search_user_data->fetch_assoc()) {
                    $response[$row_id_user['id_user']] = [
                        'id_user' => $row_user_data['id_user'],
                        'login' => $row_user_data['login'],
                        'role' => $row_user_data['role'],
                        'email' => $row_user_data['email'],
                        'path_to_avatar' => $row_user_data['path_to_avatar']
                    ];
                }
            }

            echo json_encode($response);
        }
    } catch (\Throwable $th) {
        echo json_encode([
            'error' => 'error requesting chat users',
            'error message' => 'Ошибка запроса получения пользователей чата!',
            'more information error' => $th->getMessage()
        ]);
    } finally {
        $connection->close();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = json_decode(file_get_contents('php://input'), true);
    get_chat_users($json['id_chat']);
}
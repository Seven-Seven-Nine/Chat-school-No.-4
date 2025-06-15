<?php

session_start();

header('Content-Type: application/json');

require_once $_SERVER['DOCUMENT_ROOT'] . '/api/database/database.php';

/**
 * Функция получения данных пользователей.
 * @return void
 */
function get_all_users(): void {
    try {
        $connection = get_connection_database();
        $stmt = $connection->prepare('SELECT `id_user`, `login`, `role`, `email`, `path_to_avatar` FROM `users`');
        $stmt->execute();

        $response = ['result' => 'user data has been successfully received'];

        $result = $stmt->get_result();
        while ($row = $result->fetch_assoc()) {
            $response[$row['id_user']] = [
                'id_user' => $row['id_user'],
                'login' => $row['login'],
                'role' => $row['role'],
                'email' => $row['email'],
                'path_to_avatar' => $row['path_to_avatar']
            ];
        }
        
        echo json_encode($response);
    } catch (\Throwable $th) {
        echo json_encode([
            'error' => 'error requesting the data of all users',
            'error message' => 'Ошибка запроса получения списка данных пользователей!',
            'more information error' => $th->getMessage()
        ]);
    } finally {
        $connection->close();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    get_all_users();
}
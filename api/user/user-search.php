<?php

session_start();

header('Content-Type: application/json');

require_once $_SERVER['DOCUMENT_ROOT'] . '/api/database/database.php';

/**
 * Найти пользователя по логину в базе данных.
 * @param string $login логин пользователя для поиска.
 * @return void
 */
function user_search(string $login): void {
    try {
        $search_login = '%' . $login .'%';
        $connection = get_connection_database();
        $stmt = $connection->prepare('SELECT `id_user`, `login`, `role`, `email`, `path_to_avatar` FROM `users` WHERE `login` LIKE ?');
        $stmt->bind_param('s', $search_login);
        $stmt->execute();

        $response = ['result' => 'the search was successfully performed'];

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
            'error' => 'user search request error',
            'error message' => 'Ошибка запроса поиска пользователя!',
            'more information error' => $th->getMessage()
        ]);
    } finally {
        $connection->close();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = json_decode(file_get_contents('php://input'), true);
    user_search($json['login']);
}
<?php

session_start();

header('Content-Type: application/json');

require_once $_SERVER['DOCUMENT_ROOT'] . '/api/database/database.php';

/**
 * Сохранения изменений пользователя в базе данных.
 * @param mixed $data - массив с ключами: 'login', 'role', 'email', 'path_to_avatar';
 * @return void
 */
function user_update($data): void {
    try {
        if (isset($data['login']) && isset($data['role']) && isset($data['email']) && isset($data['path_to_avatar'])) {
            $connection = get_connection_database();
            $stmt = $connection->prepare('SELECT `login` FROM `users` WHERE `login` = ? OR `email` = ?');
            $stmt->bind_param('ss', $data['login'], $data['email']);
            $stmt->execute();

            $result_search_user = $stmt->get_result();
            if ($result_search_user->num_rows === 0) {
                $stmt->prepare('UPDATE `users` SET `login` = ?, `role` = ?, `email` = ?, `path_to_avatar` = ? WHERE `login` = ?');
                $stmt->bind_param('sssss', $data['login'], $data['role'], $data['email'],$data['path_to_avatar'], $_SESSION['login']);
                $stmt->execute();
        
                $_SESSION['login'] = $data['login'];
                $_SESSION['role'] = $data['role'];
                $_SESSION['email'] = $data['email'];
                $_SESSION['path_to_avatar'] = $data['path_to_avatar'];
    
                echo json_encode(['result' => 'the user\'s data has been updated']);
            } else {
                echo json_encode([
                    'error' => 'this username is already in use',
                    'error message' => 'Такой логин или почта уже используется другим пользователем!'
                ]);
            }
        } else {
            echo json_encode([
                'error' => 'incorrect data for updating the user',
                'error message' => 'Некорректные данные для обновления пользователя!'
            ]);
        }
    } catch (\Throwable $th) {
        echo json_encode([
            'error' => 'data update request error',
            'error message' => 'Ошибка запроса обновления данных пользователя!',
            'more information errors' => $th->getMessage()
        ]);
    } finally {
        $connection->close();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = json_decode(file_get_contents('php://input'), true);
    user_update($json);
}
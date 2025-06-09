<?php

session_start();

require_once $_SERVER['DOCUMENT_ROOT'] . '/api/database/database.php';

header('Content-Type: application/json');

/**
 * Авторизация пользователя.
 * @param array $data данные пользователя ('login', 'password').
 * @return void
 */
function authorization(array $data): void {
    try {
        $connection = get_connection_database();
        $stmt = $connection->prepare('SELECT `login`, `role`, `email`, `password`, `path_to_avatar` FROM `users` WHERE `login` = ?');
        $stmt->bind_param('s', $data['login']);
        $stmt->execute();

        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $role = '';
            $email = '';
            $user_password_hash = '';
            $path_to_avatar = '';
            while ($row = $result->fetch_assoc()) {
                $role = $row['role'];
                $email = $row['email'];
                $user_password_hash = $row['password'];
                $path_to_avatar = $row['path_to_avatar'];
            }
            if (password_verify($data['password'], $user_password_hash)) {
                $_SESSION['login'] = $data['login'];
                $_SESSION['role'] = $role;
                $_SESSION['email'] = $email;
                $_SESSION['path_to_avatar'] = $path_to_avatar;

                echo json_encode(['result' => 'user authorization is successful']);
            } else {
                echo json_encode([
                    'error' => 'the password doesn\'t match',
                    'error message' => 'Пароль неправильный!'
                ]);
            }
        } else {
            echo json_encode([
                'error' => 'the user was not found',
                'error message' => 'Пользователь не найден.'
            ]);
        }
    } catch (\Throwable $th) {
        echo json_encode([
                'error' => 'authorization request error',
                'error message' => 'Ошибка запроса авторизации!',
                'more information errors' => $th->getMessage()
            ]);
    } finally {
        $connection->close();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = json_decode(file_get_contents('php://input'), true);
    authorization($json);
} else {
    echo json_encode(['error' => 'incorrect request method']);
}
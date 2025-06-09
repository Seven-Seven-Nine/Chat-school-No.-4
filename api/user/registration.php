<?php

session_start();

require_once $_SERVER['DOCUMENT_ROOT'] . '/api/database/database.php';

header('Content-Type: application/json');

/**
 * Регистрация пользователя.
 * @param array $data данные пользователя ('login', 'email', 'password').
 * @return void
 */
function registration(array $data): void {
    if (isset($data['login']) && isset($data['email']) && isset($data['password'])) {
        try {
            $connection = get_connection_database();
            $stmt = $connection->prepare('SELECT `login`, `email` FROM `users` WHERE `login` = ? AND `email` = ?');
            $stmt->bind_param('ss', $data['login'], $data['email']);
            $stmt->execute();

            $result = $stmt->get_result();
            if ($result->num_rows == 0) {
                $role = 'user';
                $hash_password = password_hash($data['password'], PASSWORD_DEFAULT);
                $stmt->prepare('INSERT INTO `users` (`login`, `role`, `email`, `password`) VALUES (?, ?, ?, ?)');
                $stmt->bind_param('ssss', $data['login'], $role, $data['email'], $hash_password);
                $stmt->execute();

                $_SESSION['login'] = $data['login'];
                $_SESSION['role'] = $role;
                $_SESSION['email'] = $data['email'];
                $_SESSION['path_to_avatar'] = 'none';
                
                echo json_encode(['result' => 'authorization is successful']);
            } else {
                echo json_encode([
                    'error' => 'the user is already registered',
                    'error message' => 'Пользователь уже зарегистрирован!'
                ]);
            }
        } catch (\Throwable $th) {
            echo json_encode([
                'error' => 'registration request error',
                'error message' => 'Ошибка запроса регистрации!',
                'more information errors' => $th->getMessage()
            ]);
        } finally {
            $connection->close();
        }
    } else {
        echo json_encode(['error' => 'incorrect data']);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = json_decode(file_get_contents('php://input'), true);
    registration($json);
} else {
    echo json_encode(['error' => 'incorrect request method']);
}
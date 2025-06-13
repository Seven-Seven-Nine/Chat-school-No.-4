<?php

session_start();

header('Content-Type: application/json');

require_once $_SERVER['DOCUMENT_ROOT'] . '/api/database/database.php';

/**
 * Сброс пароля у пользователя.
 * @param array $data - массив с ключами: 'login', 'current_password', 'new_password'.
 * @return void
 */
function password_update(array $data): void {
    try {
        if (isset($data['login']) && isset($data['current_password']) && isset($data['new_password'])) {
            $connection = get_connection_database();
            $stmt = $connection->prepare('SELECT `login`, `password` FROM `users` WHERE `login` = ?');
            $stmt->bind_param('s', $data['login']);
            $stmt->execute();

            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                $hash_password = '';
                while ($row = $result->fetch_assoc()) {
                    $hash_password = $row['password']; 
                }
                if (password_verify($data['current_password'], $hash_password)) {
                    $new_hash_password = password_hash($data['new_password'], PASSWORD_DEFAULT);
                    $stmt->prepare('UPDATE `users` SET `password` = ? WHERE `login` = ?');
                    $stmt->bind_param('ss', $new_hash_password, $data['login']);
                    $stmt->execute();

                    echo json_encode(['result' => 'password has been successfully updated']);
                } else {
                    echo json_encode([
                        'error' => 'the current password does not match',
                        'error message' => 'Старый пароль введён неправильно!'
                    ]);
                }
            } else {
                echo json_encode([
                    'error' => 'the user was not found',
                    'error message' => 'Пользователь не найден!'
                ]);
            }
        } else {
            echo json_encode([
                'error' => 'incorrect data for resetting the user\'s password',
                'error message' => 'Некорректные данные для сброса пароля пользователя!'
            ]);
        }
    } catch (\Throwable $th) {
        echo json_encode([
            'error' => 'user password reset request error',
            'error message' => 'Ошибка запроса сброса пароля пользователя!',
            'more information errors' => $th->getMessage()
        ]);
    } finally {

    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = json_decode(file_get_contents('php://input'), true);
    password_update($json);
}
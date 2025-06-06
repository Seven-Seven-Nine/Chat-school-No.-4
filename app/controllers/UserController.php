<?php

header('Content-Type: application/json');
require_once $_SERVER['DOCUMENT_ROOT'] . '/app/models/User.php';

class UserController {
    public static function add(array $data): void {
        $login = $data['login'];
        $email = $data['email'];
        $password = $data['password'];

        try {
            $user = new User(null, $login, 'user', $email, $password);
            $user->add();

            echo json_encode(['result' => 'the user is registered']);
        } catch (\Throwable $th) {
            echo json_encode([
                'result' => 'registration error',
                'error' => 'the user is already registered',
                'error message' => 'Пользователь уже зарегистрирован!',
                'more information about the error' => $th->getMessage()
            ]);
        }
    }

    public static function authorization(array $data): void {
        $login = $data['login'];
        $password = $data['password'];

        try {
            if (User::availability_user_by_login($login)) {
                $user = new User(null, $login, null, null, $password);
                $user->find_by_login();
                $password_hash = $user->get_password();
                
                if (password_verify($password, $password_hash)) {
                    echo json_encode([
                        'result' => 'authorization is allowed',
                        'role' => $user->get_role(),
                        'email' => $user->get_email()
                    ]);
                } else {
                    echo json_encode([
                        'result' => 'authorization error',
                        'error' => 'the received password does not match the hash',
                        'error message' => 'Неправильный пароль!'
                    ]);
                }
            } else {
                echo json_encode([
                'result' => 'authorization error',
                'error' => 'the user was not found',
                'error message' => 'Пользователь не найден!'
            ]);
            }
        } catch (\Throwable $th) {
            echo json_encode([
                'result' => 'authorization error',
                'error' => 'authorization error',
                'error message' => 'Ошибка авторизации пользователя!',
                'more information about the error' => $th->getMessage()
            ]);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action'])) {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    switch ($_GET['action']) {
        case 'add_user':
            UserController::add($data);
            break;
        case 'authorization':
            UserController::authorization($data);
            break;
        default:
            echo json_encode(['request error' => 'action not found']);
            break;
    }
}
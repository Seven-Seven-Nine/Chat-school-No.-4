<?php

header('Content-Type: application/json');
session_start();

/**
 * Класс для работы с сессией PHP с JavaScript. JavaScript fetch отсылает запрос с данными, после чего они или сохраняются в сессии, или сравниваются.
 */
class Session {
    private static array $allowed_keys = ['login', 'role', 'email'];

    /**
     * Сохранение сессии с разрешённым ключами.
     * @param array $data полученный декодированный json от клиента.
     * @return void
     */
    public static function save(array $data): void {
        if (!empty($data) && is_array($data)) {
            foreach ($data as $key => $value) {
                if (in_array($key, Session::$allowed_keys)) {
                    $_SESSION[$key] = $value;
                }
            }
            echo json_encode(['session result' => 'saved']);
        } else {
            echo json_encode(['session result' => 'invalid data']);
        }
    }

    /**
     * Получение сессии пользователя.
     * @return void
     */
    public static function get(): void {
        if (isset($_SESSION['login']) && isset($_SESSION['role']) && isset($_SESSION['email'])) {
            echo json_encode([
                'login' => $_SESSION['login'],
                'role' => $_SESSION['role'],
                'email' => $_SESSION['email']
            ]);
        } else {
            echo json_encode(['session result' => 'the user session does not exist']);
        }
    }

    /**
     * Проверка на полученные данные от клиента с сессией.
     * @param array $data полученный декодированный json от клиента.
     * @return void
     */
    public static function check(array $data): void {
        $result = ['session result' => 'the session is correct'];

        if (!empty($data) && is_array($data)) {
            foreach ($data as $key => $value) {
                if (in_array($key, Session::$allowed_keys)) {
                    if (!isset($_SESSION[$key])) {
                        $result['session result'] = 'the session key was not found';
                    } else if ($_SESSION[$key] !== $value) {
                        $result['session result'] = 'the session key does not correspond to reality';
                    }
                }
            }
        } else {
            $result['session result'] = 'invalid data';
        }

        echo json_encode($result);
    }

    /**
     * Проверка наличии сохранённой сессии пользователя.
     * @return void
     */
    public static function checking_availability(): void {
        if (isset($_SESSION['login']) && isset($_SESSION['role']) && isset($_SESSION['email'])) {
            echo json_encode(['session result' => 'the user session was found']);
        } else {
            echo json_encode(['session result' => 'the user session was not found']);
        }
    }

    /**
     * Уничтожение сессии пользователя.
     * @return void
     */
    public static function destroy(): void {
        session_destroy();
        echo json_encode(['session result' => 'the session is destroyed']);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action'])) {
    $data = json_decode(file_get_contents("php://input"), true);

    switch ($_GET['action']) {
        case 'save':
            Session::save($data);
            break;
        case 'get_session':
            Session::get();
            break;
        case 'check_session':
            Session::check($data);
            break;
        case 'checking_availability':
            Session::checking_availability();
            break;
        case 'destroy':
            Session::destroy();
            break;
        default:
            echo json_encode(['request error' => 'action not found']);
            break;
    }
}
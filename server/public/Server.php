<?php
header('Content-type: application/json');

class Server {
    public function get_method(): void {
        switch ($_GET['request']) {
            case 'get_html_data':
                require_once '../src/GetHtml.php';
                new GetHtml($_GET['path_file']);
                break;
            default:
                $json_data = ['status' => 'unknown get request'];
                echo json_encode($json_data);
                http_response_code(403);
                break;
        }
    }

    public function post_method(array $input): void {
        switch ($input['request']) {
            case 'registration':
                require_once '../src/Registration.php';
                new Registration($input['login'], $input['email'], $input['password'], 'none');
                break;
            case 'authorization':
                require_once '../src/Authorization.php';
                if (isset($input['token'])) {
                    new Authorization('none', 'none', $input['token']);
                } else {
                    new Authorization($input['login'], $input['password'], 'none');
                }
                break;
            case 'get_all_user_data':
                require_once '../src/GetUserData.php';
                new GetUserData($input['token']);
                break;
            default:
                $json_data = ['status' => 'unknown post request'];
                echo json_encode($json_data);
                http_response_code(403);
                break;
        }
    }

    public function update_method(): void {
        $json_data = ['status' => 'in development',];
        echo json_encode($json_data);
    }

    public function delete_method(): void {
        $json_data = ['status' => 'in development',];
        echo json_encode($json_data);
    }

    public function unknown_method(): void {
        $json_data = ['status' => 'unknown request method',];
        echo json_encode($json_data);
        
        http_response_code(403);
    }
}

$server = new Server();

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $server->get_method();
        break;
    case 'POST':
        $server->post_method(json_decode(file_get_contents('php://input'), true));
        break;
    case 'UPDATE':
        $server->update_method();
        break;
    case 'DELETE':
        $server->delete_method();
        break;
    default:
        $server->unknown_method();
        break;
}
<?php

require_once '../src/DataBase.php';
/**
 * Класс авторизации пользователя
 */
class Authorization {
    private string $login;
    private string $password;
    private string $token;
    private string $generate_token;
    private DataBase $data_base;
    private mysqli $mysqli;
    private array $json_data;

    public function __construct(string $login, string $password, string $token) {
        $this->login = $login;
        $this->password = $password;
        $this->token = $token;
        $this->data_base = new DataBase();

        $this->init();
    }

    private function init(): void {
        $this->connecting_db();
        $this->authorization_user_in_db();
        $this->close_connecting_db();
    }

    private function connecting_db(): void {
        $this->mysqli = new mysqli($this->data_base->get_host_name(), $this->data_base->get_user(), $this->data_base->get_password(), $this->data_base->get_data_base());
    }

    private function close_connecting_db(): void {
        $this->mysqli->close();
    }

    private function authorization_user_in_db(): void {
        if ($this->token !== 'none') {
            $this->authorization_user_using_token();
        } else {
            $sql = "SELECT `login`, `password` FROM `users` WHERE `login` = ?";
            $stmt = $this->mysqli->prepare($sql);
            $stmt->bind_param('s', $this->login);
            $stmt->execute();
            
            $result = $stmt->get_result();
            $stmt->close();
            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $hash_password = $row['password'];
                if (password_verify($this->password, $hash_password)) {
                    $this->generate_new_token();
                    $this->echo_200();
                } else {
                    $this->echo_error_password_does_not_match();
                }
            } else {
                $this->echo_error_user_no_found();
            }
        }

    }

    private function generate_new_token(): void {
        $this->generate_token = bin2hex(random_bytes(16));
        $sql = "UPDATE `users` SET `token` = ? WHERE `login` = ?";
        $stmt = $this->mysqli->prepare($sql);
        $stmt->bind_param('ss', $this->generate_token, $this->login);  
        $stmt->execute();
        $stmt->close();
    }

    private function authorization_user_using_token(): void {
        $sql = "SELECT `login`, `token` FROM `users` WHERE `token` = ?";
        $stmt = $this->mysqli->prepare($sql);
        $stmt->bind_param('s', $this->token);
        $stmt->execute();

        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $this->login = $row['login'];

            $this->generate_new_token();
            $this->echo_200();
        } else {
            $this->echo_error_user_no_found();
        }
    }

    private function echo_200(): void {
        $this->json_data['status'] = '200';
        $this->json_data['body']['message'] = 'authorization allowed';
        $this->json_data['body']['token'] = $this->generate_token;
        echo json_encode($this->json_data);
        http_response_code(200);
        exit(0);
    }
    
    private function echo_error_user_no_found(): void {
        $this->json_data['status'] = '200 error';
        $this->json_data['body']['error'] = 'user no found';
        echo json_encode($this->json_data);
        http_response_code(200);
        exit(0);
    }

    private function echo_error_password_does_not_match(): void {
        $this->json_data['status'] = '200 error';
        $this->json_data['body']['error'] = 'password does not match';
        echo json_encode($this->json_data);
        http_response_code(200);
        exit(0);
    }
}
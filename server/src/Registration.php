<?php

require_once '../src/DataBase.php';

/**
 * Класс регистрации пользователя.
 */
class Registration {
    private string $login;
    private string $email;
    private string $password;
    private string $avatar_src;
    private string $generate_token;
    private DataBase $data_base;
    private mysqli $mysqli;
    private array $json_data;

    public function __construct(string $login, string $email, string $password, string $avatar_src) {
        $this->login = $login;
        $this->email = $email;
        $this->password = $password;
        $this->avatar_src = $avatar_src;
        $this->data_base = new DataBase();

        $this->init();
    }

    private function init(): void {
        $this->connecting_db();
        if ($this->checking_user_in_db()) {
            $this->add_user_in_db();
            $this->echo_200();
        } else {
            $this->echo_error();
        }
        $this->close_connecting_db();
    }

    private function connecting_db(): void {
        $this->mysqli = new mysqli($this->data_base->get_host_name(), $this->data_base->get_user(), $this->data_base->get_password(), $this->data_base->get_data_base());
    }

    private function close_connecting_db(): void {
        $this->mysqli->close();
    }

    private function checking_user_in_db(): bool {
        $sql = "SELECT `login`, `email` FROM `users` WHERE `login` = ? OR `email` = ?";
        $stmt = $this->mysqli->prepare($sql);
        $stmt->bind_param('ss', $this->login, $this->email);
        $stmt->execute();
        
        $result = $stmt->get_result();
        $stmt->close();
        if ($result->num_rows > 0) {
            return false;
        } else {
            return true;
        }
    }

    private function add_user_in_db(): void {
        $sql = "INSERT INTO `users` (`role`, `login`, `email`, `password`, `avatar_src`, `token`) VALUES ('user', ?, ?, ?, ?, ?)";
        $stmt = $this->mysqli->prepare($sql);
        $hash_password = password_hash($this->password, PASSWORD_DEFAULT);
        $generate_token = bin2hex(random_bytes(16));
        $this->generate_token = $generate_token;
        $stmt->bind_param('sssss', $this->login, $this->email, $hash_password, $this->avatar_src, $generate_token);
        $stmt->execute();

        $result = $stmt->get_result();
        $stmt->close();
    }

    private function echo_200(): void {
        $this->json_data['status'] = '200';
        $this->json_data['body']['user'] = 'user is registered';
        $this->json_data['body']['token'] = $this->generate_token;
        echo json_encode($this->json_data);
        http_response_code(200);
        exit(0);
    }

    private function echo_error(): void {
        $this->json_data['status'] = '200 error';
        $this->json_data['body']['error'] = 'user is already registered';
        echo json_encode($this->json_data);
        http_response_code(200);
        exit(0);
    }
}
<?php

require_once '../src/DataBase.php';

class GetUserData {
    private string $token;
    private string $role;
    private string $login;
    private string $email;
    private string $avatar_src;
    private DataBase $data_base;
    private mysqli $mysqli;
    private array $json_data;

    public function __construct(string $token) {
        $this->token = $token;
        $this->data_base = new DataBase();

        $this->main();
    }

    private function main(): void {
        $this->connecting_db();
        $this->get_user_data();
        $this->close_connecting_db();
    }

    private function connecting_db(): void {
        $this->mysqli = new mysqli($this->data_base->get_host_name(), $this->data_base->get_user(), $this->data_base->get_password(), $this->data_base->get_data_base());
    }

    private function close_connecting_db(): void {
        $this->mysqli->close();
    }

    private function get_user_data(): void {
        $sql = "SELECT `role`, `login`, `email`, `avatar_src` FROM `users` WHERE `token` = ?";
        $stmt = $this->mysqli->prepare($sql);
        $stmt->bind_param('s', $this->token);
        $stmt->execute();

        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $this->role = $row['role'];
            $this->login = $row['login'];
            $this->email = $row['email'];
            $this->avatar_src = $row['avatar_src'];
            $this->echo_200();
        } else {
            $this->echo_error_user_undefined();
        }
    }

    private function echo_200(): void {
        $this->json_data['status'] = '200';
        $this->json_data['body']['user']['role'] = $this->role;
        $this->json_data['body']['user']['login'] = $this->login;
        $this->json_data['body']['user']['email'] = $this->email;
        $this->json_data['body']['user']['avatar_src'] = $this->avatar_src;
        echo json_encode($this->json_data);
        http_response_code(200);
        exit(0);
    }

    private function echo_error_user_undefined(): void {
        $this->json_data['status'] = '200 error';
        $this->json_data['body']['error'] = 'user no found';
        echo json_encode($this->json_data);
        http_response_code(200);
        exit(0);
    }
}
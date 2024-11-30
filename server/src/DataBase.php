<?php

/**
 * Класс описания базы данных с методами получения этих данных.
 */
class DataBase {
    private string $host_name = 'localhost';
    private string $user = 'root';
    private string $password = '';
    private string $data_base = 'chat_school4';

    public function get_host_name(): string {
        return $this->host_name;
    }

    public function get_user(): string {
        return $this->user;
    }

    public function get_password(): string {
        return $this->password;
    }

    public function get_data_base(): string {
        return $this->data_base;
    }
}
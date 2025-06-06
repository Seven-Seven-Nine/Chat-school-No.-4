<?php

require_once $_SERVER['DOCUMENT_ROOT'] . '/app/database/database.php';

class User {
    private int | null $id;
    private string | null $login;
    private string | null $role;
    private string | null $email;
    private string | null $password;

    public function __construct(int | null $id, string | null $login, string | null $role, string | null $email, string | null $password) {
        $this->id = $id;
        $this->login = $login;
        $this->role = $role;
        $this->email = $email;
        $this->password = $password;
    }

    public function add(): void {
        $password_hash = password_hash($this->password, PASSWORD_DEFAULT);

        try {
            $connection = get_connection_database();
            $stmt = $connection->prepare('INSERT INTO users (login, role, email, password) VALUES (?, ?, ?, ?)');
            $stmt->bind_param('ssss', $this->login, $this->role, $this->email, $password_hash);
            $stmt->execute();
        } catch (\Throwable $th) {
            throw new RuntimeException();
        } finally {
            $connection->close();
        }
    }

    public function delete(): void {}

    public function find_by_login(): void {
        try {
            $connection = get_connection_database();
            $stmt = $connection->prepare('SELECT id_user, login, role, email, password FROM users WHERE login = ?');
            $stmt->bind_param('s', $this->login);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $this->id = $row['id_user'];
                    $this->login = $row['login'];
                    $this->role = $row['role'];
                    $this->email = $row['email'];
                    $this->password = $row['password'];
                }
            }
        } catch (\Throwable $th) {
            throw new RuntimeException();
        } finally {
            $connection->close();
        }
    }

    public static function availability_user_by_login($login): bool {
        try {
            $connection = get_connection_database();
            $stmt = $connection->prepare('SELECT login FROM users WHERE login = ?');
            $stmt->bind_param('s', $login);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                return true;
            } else {
                return false;
            }
        } catch (\Throwable $th) {
            throw new RuntimeException();
        } finally {
            $connection->close();
        }
    }

    public function get_id(): int | null {
        return $this->id;
    }

    public function get_login(): string | null {
        return $this->login;
    }

    public function get_role(): string | null {
        return $this->role;
    }

    public function get_email(): string | null {
        return $this->email;
    }

    public function get_password(): string | null {
        return $this->password;
    }
}
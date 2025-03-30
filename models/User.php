<?php

require_once $_SERVER['DOCUMENT_ROOT'] . '/config/database.php';

class User {
  private int | null $id;
  private string | null $login;
  private string | null $role;
  private string | null $email;
  private string | null $password;
  private string | null $token;

  public function __construct(int | null $id, string | null $login, string | null $role, string | null $email, string | null $password) {
    $this->id = $id;
    $this->login = $login;
    $this->role = $role;
    $this->email = $email;
    $this->password = $password;
    $this->token = bin2hex(openssl_random_pseudo_bytes(16));
  }

  public function save(): void {
    $hash_password = password_hash($this->password, PASSWORD_DEFAULT);
    
    $connection = get_connection_database();
    $stmt = $connection->prepare('INSERT INTO `users` (`login`, `email`, `password`, `token`) VALUES (?, ?, ?, ?)');
    $stmt->bind_param('ssss', $this->login, $this->email, $hash_password, $this->token);
    $stmt->execute();

    $stmt->close();
    $connection->close();

    $this->create_session($this->login, 'user');
  }

  public function check_password(string $password): bool {
    $this->get_all_data();

    if (password_verify($password, $this->password)) {
      $this->update_token();
      return true;
    } else {
      return false;
    }
  }

  public function create_session(string $login, string $role): void {
    $_SESSION['id'] = $this->id;
    $_SESSION['login'] = $login;
    $_SESSION['role'] = $role;
    $_SESSION['token'] = $this->token;
  }

  public function delete_session(): void {
    session_destroy();
  }

  private function update_token(): void {
    $connection = get_connection_database();
    $stmt = $connection->prepare('UPDATE `users` SET `token` = ? WHERE `login` = ?');
    $stmt->bind_param('ss', $this->token, $this->login);
    $stmt->execute();
    $stmt->close();
    $connection->close();
  }

  private function get_all_data(): void {
    $connection = get_connection_database();
    $stmt = $connection->prepare('SELECT `id_user`, `login`, `role`, `email`, `password` FROM `users` WHERE `login` = ?');
    $stmt->bind_param('s', $this->login);
    $stmt->execute();

    $result = $stmt->get_result();
    
    while ($row = $result->fetch_assoc()) {
      $this->id = $row['id_user'];
      $this->login = $row['login'];
      $this->role = $row['role'];
      $this->email = $row['email'];
      $this->password = $row['password'];
    }

    $stmt->close();
    $connection->close();
  }

  public function get_id(): int {
    return $this->id;
  }

  public function get_login(): string {
    return $this->login;
  }

  public function get_role(): string {
    return $this->role;
  }

  public function get_email(): string {
    return $this->email;
  }

  public function get_password(): string {
    return $this->password;
  }
}
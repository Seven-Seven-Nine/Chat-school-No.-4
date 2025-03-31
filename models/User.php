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

    $this->create_session();
  }

  public function update(): void {
    $connection = get_connection_database();
    $stmt = $connection->prepare('UPDATE `users` SET `login` = ?, `role` = ?, `email` = ? WHERE `id_user` = ?');
    $stmt->bind_param('sssi', $this->login, $this->role, $this->email, $this->id);
    $stmt->execute(); 
    $stmt->close(); 
    $connection->close();
  }

  public function delete(): void {
    $connection = get_connection_database();
    $stmt = $connection->prepare('DELETE FROM `users` WHERE `id_user` = ?');
    $stmt->bind_param('i', $this->id);
    $stmt->execute();
  }

  public function check_password(string $password): bool {
    if (password_verify($password, $this->password)) {
      $this->update_token();
      return true;
    } else {
      return false;
    }
  }

  public function create_session(): void {
    $_SESSION['id'] = $this->id;
    $_SESSION['login'] = $this->login;
    $_SESSION['role'] = $this->role;
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

  public function get_all_data(): void {
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

  public function get_user_by_id(): array {
    $connection = get_connection_database();
    $stmt = $connection->prepare('SELECT * FROM `users` WHERE `id_user` = ?');
    $stmt->bind_param('i', $this->id);
    $stmt->execute();
    
    $result = $stmt->get_result();
    
    $stmt->close();
    $connection->close();
    
    return $result->fetch_all(MYSQLI_ASSOC) ?? [];
  }

  public static function display_list_all_users(): void {
    $connection = get_connection_database();
    $stmt = $connection->prepare('SELECT `id_user`, `login`, `role`, `email` FROM `users`');
    $stmt->execute();
    
    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc()) {
      echo '
        <a class="element-list" href="/?module=edit_user&id_user='. $row['id_user'] .'">Пользователь <span class="green-text">'. $row['login'] .'</span> | <span class="red-text">'. $row['role'] .'</span> | <span class="yellow-text">'. $row['email'] .'</span></a>
      ';
    }

    $stmt->close();
    $connection->close();
  }
}
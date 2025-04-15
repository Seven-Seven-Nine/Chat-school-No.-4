<?php

require_once $_SERVER['DOCUMENT_ROOT'] . '/config/database.php';

class User {
  private int | null $id;
  private string | null $login;
  private string | null $role;
  private string | null $email;
  private string | null $password;
  private string | null $path_to_image;
  private string | null $token;

  public function __construct(int | null $id, string | null $login, string | null $role, string | null $email, string | null $password, string | null $path_to_image) {
    $this->id = $id;
    $this->login = $login;
    $this->role = $role;
    $this->email = $email;
    $this->password = $password;
    $this->path_to_image = $path_to_image;
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
    $stmt = $connection->prepare('UPDATE `users` SET `login` = ?, `role` = ?, `email` = ?, `path_to_image` = ? WHERE `id_user` = ?');
    $stmt->bind_param('ssssi', $this->login, $this->role, $this->email, $this->path_to_image, $this->id);
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
    $_SESSION['email'] = $this->email;
    $_SESSION['path_to_image'] = $this->path_to_image;
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
    $stmt = $connection->prepare('SELECT `id_user`, `login`, `role`, `email`, `password`, `path_to_image` FROM `users` WHERE `login` = ?');
    $stmt->bind_param('s', $this->login);
    $stmt->execute();

    $result = $stmt->get_result();
    
    while ($row = $result->fetch_assoc()) {
      $this->id = $row['id_user'];
      $this->login = $row['login'];
      $this->role = $row['role'];
      $this->email = $row['email'];
      $this->password = $row['password'];
      $this->path_to_image = $row['path_to_image'];
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

  public static function get_users(): array {
    $connection = get_connection_database();
    $stmt = $connection->prepare('SELECT `login`, `path_to_image` FROM `users`');
    $stmt->execute();

    $result = $stmt->get_result();

    $users = [];

    while ($row = $result->fetch_assoc()) {
      $users[] = $row;
    }

    $stmt->close();
    $connection->close();

    return $users;
  }

  public static function get_id_user_by_login(string $login): string {
    $connection = get_connection_database();
    $stmt = $connection->prepare('SELECT `id_user` FROM `users` WHERE `login` = ?');
    $stmt->bind_param('s', $login);
    $stmt->execute();

    $result = $stmt->get_result();

    $id_user = '';

    while ($row = $result->fetch_assoc()) {
      $id_user = $row['id_user'];
    }

    $stmt->close();
    $connection->close();

    return $id_user;
  }

  public static function search_user(string $login): array {
    $connection = get_connection_database();
    $stmt = $connection->prepare('SELECT `login`, `path_to_image` FROM `users` WHERE `login` LIKE ?');
    
    $searchTerm = "%{$login}%";
    $stmt->bind_param('s', $searchTerm);
    
    $stmt->execute();

    $result = $stmt->get_result();

    $users = [];

    while ($row = $result->fetch_assoc()) {
      $users[] = $row;
    }

    $stmt->close();
    $connection->close();

    return $users;
  }

  public static function get_login_by_id(string $id): string {
    $connection = get_connection_database();
    $stmt = $connection->prepare('SELECT `login` FROM `users` WHERE `id_user` = ?');
    $stmt->bind_param('s', $id);
    $stmt->execute();

    $result = $stmt->get_result();

    $login = '';

    while ($row = $result->fetch_assoc()) {
      $login = $row['login'];
    }

    $stmt->close();
    $connection->close();

    return $login;
  }
}
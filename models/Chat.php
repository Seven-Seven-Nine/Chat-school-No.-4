<?php

require_once $_SERVER['DOCUMENT_ROOT'] . '/config/database.php';

class Chat {
  private string | null $id_chat;
  private int | null $id_user;
  private string | null $title;
  private string | null $path_to_image;

  public function __construct(string | null $id_chat, int | null $id_user, string | null $title, string | null $path_to_image) {
    $this->id_chat = $id_chat;
    $this->id_user = $id_user;
    $this->title = $title;
    $this->path_to_image = $path_to_image;
  }

  public function save(): void {
    $connection = get_connection_database();
    $stmt = $connection->prepare('INSERT INTO `chats` (`id_user`, `title`, `path_to_image`) VALUES (?, ?, ?)');
    $stmt->bind_param('iss', $this->id_user, $this->title, $this->path_to_image);
    $stmt->execute();
    $stmt->close();
    $connection->close();
  }

  public static function get_id_chat_by_title(string $title): string {
    $connection = get_connection_database();
    $stmt = $connection->prepare('SELECT `id_chat` FROM `chats` WHERE `title` = ?');
    $stmt->bind_param('s', $title);
    $stmt->execute();

    $result = $stmt->get_result();

    $id_chat = '';

    while ($row = $result->fetch_assoc()) {
      $id_chat = $row['id_chat'];
    }

    $stmt->close();
    $connection->close();

    return $id_chat;
  }

  public static function add_chat_participants(string $id_user, string $id_chat): void {
    $connection = get_connection_database();
    $stmt = $connection->prepare('SELECT `id_chat`, `id_user` FROM `chat_participants` WHERE `id_user` = ? AND `id_chat` = ?');
    $stmt->bind_param('ss', $id_user, $id_chat);
    $stmt->execute();
    
    $result = $stmt->get_result();

    if ($result->num_rows == 0) {
      $stmt = $connection->prepare('INSERT INTO `chat_participants` (`id_chat`, `id_user`, `joined_at`) VALUES (?, ?, ?)');
      
      $date = date('Y-m-d H:i:s');
      $stmt->bind_param('sss', $id_chat, $id_user, $date);
  
      $stmt->execute();
  
      $stmt->close();
      $connection->close();
    }
  } 

  public function save_image(): void {
    $file_name = $_FILES['image']['name'];
    $file_tmp_name = $_FILES['image']['tmp_name'];

    if (!move_uploaded_file($file_tmp_name, $_SERVER['DOCUMENT_ROOT'] . $this->path_to_image)) {
      header('Location: /?module=account&error=error_saving_the_image');
    }
  }

  public function delete(): void {
    $connection = get_connection_database();
    $stmt = $connection->prepare('DELETE FROM `chats` WHERE `id_chat` = ?');
    $stmt->bind_param('i', $this->id_chat);
    $stmt->execute();
  }

  public function edit(): void {

  }

  public function get_data_from_db(): void {
    $connection = get_connection_database();
    $stmt = $connection->prepare('SELECT `id_chat`, `id_user`, `title`, `path_to_image` FROM `chats` WHERE `id_chat` = ?');
    $stmt->bind_param('i', $this->id_chat);
    $stmt->execute();

    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc()) {
      $this->id_user = $row['id_user'];
      $this->title = $row['title'];
      $this->path_to_image = $row['path_to_image'];
    }

    $stmt->close();
    $connection->close();
  }

  public static function display_merged_chats(int $id_user): void {
    $connection = get_connection_database();

    $sql = "
        SELECT c.`id_chat`, c.`title`, c.`path_to_image` 
        FROM `chats` c 
        WHERE c.`id_user` = ? 
        
        UNION DISTINCT 
        
        SELECT c.`id_chat`, c.`title`, c.`path_to_image` 
        FROM `chat_participants` cp
        JOIN `chats` c ON cp.`id_chat` = c.`id_chat`
        WHERE cp.`id_user` = ?
    ";

    $stmt = $connection->prepare($sql);
    $stmt->bind_param('ii', $id_user, $id_user);
    $stmt->execute();
    
    $result = $stmt->get_result();
    $hasChats = $result->num_rows > 0;

    if (!$hasChats) {
        echo '
            <a href="/?module=add_chat">
                <div id="list-btn-add-chat" class="flex flex-row flex-center block-chat">
                    <img class="icon-plus" src="./static/svg/icon-create-chat.svg" alt="Добавить чат">
                </div>
            </a>
        ';
    }

    while ($row = $result->fetch_assoc()) {
        echo '
            <div id="chat-'.$row['id_chat'].'" class="flex flex-row flex-start block-chat">
                <div class="flex flex-row flex-center block-icon-chat">
                    <img src="'.$row['path_to_image'].'" alt="Иконка чата" class="icon-chat">
                </div>
                <div class="flex flex-column flex-center block-title-chat">
                    <h3>'.$row['title'].'</h3>
                </div>
            </div>
        ';
    }

    $stmt->close();
    $connection->close();
  }

  public static function get_array_users_chat(string $id_chat): array {
    $connection = get_connection_database();
    $stmt = $connection->prepare('
    SELECT 
      `chat_participants`.`id_chat`, 
      `chat_participants`.`id_user`,
      `chat_participants`.`joined_at`,
      `users`.`login`,
      `users`.`path_to_image`
    FROM 
      `chat_participants`
    INNER JOIN
      `users` ON `chat_participants`.`id_user` = `users`.`id_user`
    WHERE `id_chat` = ?
    ');
    $stmt->bind_param('s', $id_chat);
    $stmt->execute();

    $result = $stmt->get_result();

    $array_users = [];

    while ($row = $result->fetch_assoc()) {
      $array_users[] = $row;
    }

    $stmt->close();
    $connection->close();

    return $array_users;
  }

  public function get_title(): string | null {
    return $this->title;  
  }

  public function get_id_user(): int | null {
    return $this->id_user;
  }

  public function get_path_to_image(): string | null {
    return $this->path_to_image;
  }
}

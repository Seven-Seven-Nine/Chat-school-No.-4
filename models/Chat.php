<?php

require_once $_SERVER['DOCUMENT_ROOT'] . '/config/database.php';

class Chat {
  private int | null $id_chat;
  private int | null $id_user;
  private string | null $title;
  private string | null $path_to_image;

  public function __construct(int | null $id_chat, int | null $id_user, string | null $title, string | null $path_to_image) {
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

  public function save_image(): void {
    $file_name = $_FILES['image']['name'];
    $file_tmp_name = $_FILES['image']['tmp_name'];

    if (!move_uploaded_file($file_tmp_name, $_SERVER['DOCUMENT_ROOT'] . $this->path_to_image)) {
      header('Location: /?module=account&error=error_saving_the_image');
    }
  }

  public function delete(): void {

  }

  public function edit(): void {

  }

  public static function display_list_chat(int | null $id_user): void {
    $connection = get_connection_database();
    $stmt = $connection->prepare('SELECT `id_chat`, `id_user`, `title`, `path_to_image` FROM `chats` WHERE `id_user` = ?');
    $stmt->bind_param('i', $id_user);
    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows == 0) {
      echo '
        <div id="list-btn-add-chat" title="Добавить чат" class="flex flex-row flex-center block-chat">
          <img class="icon-plus" src="./static/svg/icon-create-chat.svg" alt="Иконка добавить">
        </div>
      ';
    } else {
      while ($row = $result->fetch_assoc()) {
        echo '
          <div class="flex flex-row flex-start block-chat">
            <div class="flex flex-row flex-center block-icon-chat">
              <img src="'. $row['path_to_image'] .'" alt="icon" class="icon-chat">
            </div>
            <div class="flex flex-column flex-center block-title-chat">
              <h3>'. $row['title'] .'</h3>
            </div>
          </div>
        ';
      }
    }

    $stmt->close();
    $connection->close();
  }
}

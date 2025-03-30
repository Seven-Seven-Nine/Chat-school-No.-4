<?php

require_once $_SERVER['DOCUMENT_ROOT'] . '/config/database.php';

class Update {
  private int | null $id;
  private int | null $id_user;
  private string | null $title;
  private string | null $date;
  private string | null $text;

  public function __construct(int | null $id, int | null $id_user, string | null $title, string | null $date, string | null $text) {
    $this->id = $id;
    $this->id_user = $id_user;
    $this->title = $title;
    $this->date = $date;
    $this->text = $text;
  }

  public function save(): void {
    $connection = get_connection_database();

    if ($this->title == '') {
      $stmt = $connection->prepare('INSERT INTO `updates` (`id_user`, `date`, `text`) VALUES (?, ?, ?)');
      $stmt->bind_param('iss', $this->id_user, $this->date, $this->text);
    } else {
      $stmt = $connection->prepare('INSERT INTO `updates` (`id_user`, `title`, `date`, `text`) VALUES (?, ?, ?, ?)');
      $stmt->bind_param('isss', $this->id_user, $this->title, $this->date, $this->text);
    }
    $stmt->execute();
    $stmt->close();
    $connection->close();
  }

  public function delete(): void {
    $connection = get_connection_database();
    $stmt = $connection->prepare('DELETE FROM `updates` WHERE `id_update` = ?');
    $stmt->bind_param('i', $this->id);
    $stmt->execute();
    $stmt->close();
    $connection->close();
  }

  public function update(): void {
    $connection = get_connection_database();
    if ($this->date == '') {
      $stmt = $connection->prepare('UPDATE `updates` SET `title` = ?, `text` = ? WHERE `id_update` = ?');
      $stmt->bind_param('ssi', $this->title, $this->text, $this->id);
    } else {
      $stmt = $connection->prepare('UPDATE `updates` SET `title` = ?, `date` = ?, `text` = ? WHERE `id_update` = ?');
      $stmt->bind_param('sssi', $this->title, $this->date, $this->text, $this->id);
    }
    $stmt->execute();
    $stmt->close();
    $connection->close();
  }

  public function get_update_by_id(): array {
    $connection = get_connection_database();
    $stmt = $connection->prepare('SELECT * FROM `updates` WHERE `id_update` = ?');
    $stmt->bind_param('i', $this->id);
    $stmt->execute();
    
    $result = $stmt->get_result();
    
    $stmt->close();
    $connection->close();
    
    return $result->fetch_all(MYSQLI_ASSOC) ?? [];
  }

  public static function display_all_updates_card(): void {
    $connection = get_connection_database();
    $stmt = $connection->prepare('SELECT `id_update`, `title`, `date`, `text` FROM `updates`');
    $stmt->execute();
    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc()) {
      echo '
        <a href="/?module=edit_update&id_update='. $row['id_update'] .'">
          <div class="card flex flex-column flex-center">
            <h3>'. $row['title'] .' | '. $row['date'] .'</h3>
            <p class="flex flex-column flex-center">'. nl2br($row['text']) .'</p>
          </div>
        </a>
      ';
    }

    $stmt->close();
    $connection->close();
  }

  public static function display_all_update_list(): void {
    $connection = get_connection_database();
    $stmt = $connection->prepare('SELECT `title`, `date`, `text` FROM `updates`');
    $stmt->execute();
    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc()) {
      echo '
        <div class="flex flex-column flex-center block-content block-update">
          <h3>'. $row['title'] .' | '. $row['date'] .'</h3>
          <p>'. nl2br($row['text']) .'</p>
        </div>
      ';
    }

    $stmt->close();
    $connection->close();
  }
}
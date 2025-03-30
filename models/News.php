<?php

require_once $_SERVER['DOCUMENT_ROOT'] . '/config/database.php';

class News {
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

  public function create(): void {
    $connection = get_connection_database();
    $stmt = $connection->prepare('INSERT INTO `news` (`id_user`, `title`, `date`,`text`) VALUES (?, ?, ?, ?)');
    $stmt->bind_param('ssss', $this->id_user, $this->title, $this->date, $this->text);
    $stmt->execute();
    $stmt->close();
    $connection->close();
  }

  public function get_news_by_id(): array {
    $connection = get_connection_database();
    $stmt = $connection->prepare('SELECT * FROM `news` WHERE `id_news` = ?');
    $stmt->bind_param('i', $this->id);
    $stmt->execute();
    $result = $stmt->get_result();

    $stmt->close();
    $connection->close();

    return $result->fetch_all(MYSQLI_ASSOC) ?? [];
  }

  public function edit(): void {
    $connection = get_connection_database();

    if ($this->date == null) {
      $stmt = $connection->prepare('UPDATE `news` SET `title` = ?, `text` = ? WHERE `id_news` = ?');
      $stmt->bind_param('ssi', $this->title, $this->text, $this->id);
    } else {
      $stmt = $connection->prepare('UPDATE `news` SET `title` = ?, `date` = ?, `text` = ? WHERE `id_news` = ?');
      $stmt->bind_param('sssi', $this->title, $this->date, $this->text, $this->id);
    }

    $stmt->execute();
    $stmt->close();
    $connection->close();
  }

  public function delete(): void {
    $connection = get_connection_database();
    $stmt = $connection->prepare('DELETE FROM `news` WHERE `id_news` = ?');
    $stmt->bind_param('i', $this->id);
    $stmt->execute();
  }

  public function display_all_news(): void {
    try {
      $connection = get_connection_database();
      $stmt = $connection->prepare('SELECT `id_news`, `id_user`, `title`, `date`, `text` FROM `news`');
      $stmt->execute();
      $result = $stmt->get_result();
  
      if ($result->num_rows == 0) {
        echo '
          <p>:(</p>
        ';
      } else {
        while($row = $result->fetch_assoc()) {
          echo '
            <a href="/?module=edit_news&id_news='. $row['id_news'] .'">
              <div class="card-news flex flex-column flex-center">
                <h3>'. $row['title'] .' | '. $row['date'] .'</h3>
                <p class="flex flex-column flex-center">'. $row['text'] .'</p>
              </div>
            </a>
          ';
        }
      }
  
      $stmt->close();
      $connection->close();
    } catch (\Throwable $th) {
      echo '<p class="text-error">Ошибка запроса: '. $th .'</p>';
    }
  }
}
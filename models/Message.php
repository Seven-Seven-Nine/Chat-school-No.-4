<?php

require_once $_SERVER['DOCUMENT_ROOT'] . '/config/database.php';

class Message {
  private string | null $id_message = null;
  private string | null $id_chat = null;
  private string | null $id_user = null;
  private string | null $text = null;
  private string | null $date = null;

  public function __construct(string | null $id_message, string | null $id_chat, string | null $id_user, string | null $text, string | null $date) {
    $this->id_message = $id_message;
    $this->id_chat = $id_chat;
    $this->id_user = $id_user;
    $this->text = $text;
    $this->date = $date;
  }

  public function save(): void {
    $connection = get_connection_database();
    $stmt = $connection->prepare('INSERT INTO `messages` (`id_chat`, `id_user`, `text`, `date`) VALUES (?, ?, ?, ?)');
    $stmt->bind_param('ssss', $this->id_chat, $this->id_user, $this->text, $this->date);
    $stmt->execute();
    $stmt->close();
    $connection->close();
  }

  public function edit(): void {

  }

  public function delete(): void {

  }

  public function get_data_from_db(): void {

  }

  public static function get_messages_chat(int $id_chat): array {
    $connection = get_connection_database();
    $stmt = $connection->prepare('
    SELECT 
      `messages`.`id_message`, 
      `messages`.`id_chat`, 
      `users`.`login`,
      `messages`.`text`, 
      `messages`.`date` 
    FROM 
      `messages`
    INNER JOIN 
      `users` ON `messages`.`id_user` = `users`.`id_user`
    WHERE 
      `messages`.`id_chat` = ?;
    ');
    $stmt->bind_param('s', $id_chat);
    $stmt->execute();
    
    $result = $stmt->get_result();
    $messages = [];

    while ($row = $result->fetch_assoc()) {
      $messages[] = $row;
    }

    $stmt->close();
    $connection->close();

    return $messages;
  }
}
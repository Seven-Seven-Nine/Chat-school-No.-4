<?php

require_once $_SERVER['DOCUMENT_ROOT'] . '/models/Message.php';

class MessageController {
  public static function send_message(): void {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $data_json = file_get_contents('php://input');
      $data = json_decode($data_json, true);

      $id_chat = $_GET['id_chat'];
      $text = $data['text'];

      $message = new Message(null, $id_chat, $_SESSION['id'], $text, date('Y-m-d H:i:s'));

      try {
        $message->save();
      } catch (\Throwable $th) {
        echo $th;
      }
    } else {
      echo json_encode([
        'error' => 'request method error'
      ]);
    }
  }

  public static function get_message(): void {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $data_json = file_get_contents('php://input');
      $data = json_decode($data_json, true);

      $id_chat = $_GET['id_chat'];
      $message_count = $data['messageCount'];

      try {
        $array_message = Message::get_messages_chat($id_chat);
        if (count($array_message) != $message_count) {
          echo json_encode($array_message);
        } else {
          echo json_encode([
            'status' => 'no update'
          ]);
        }
      } catch (\Throwable $th) {
        echo $th;
      }
    } else {
      echo json_encode([
        'error' => 'request method error'
      ]);
    }
  }
}
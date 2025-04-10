<?php

require_once $_SERVER['DOCUMENT_ROOT'] . '/models/Chat.php';

class ChatController {
  public static function add_chat(): void {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $title = $_POST['title'];
      $image = $_FILES['image']['name'];
      $path_to_image = '/chat_images/' . $image;

      $chat = new Chat(null, $_SESSION['id'], $title, $path_to_image);

      try {
        $chat->save();
        $chat->save_image();
        header('Location: /?module=account&result=successful_chat_addition');
      } catch (\Throwable $th) {
        echo $th;
        header('Location: /?module=account&error=error_adding_chat');
      }

      echo '
        <p>Создание чата!</p>
        <p>Полученный title: '. $title .'.</p>
        <p>Полученный image: '. $image .'.</p>
      ';
    } else {
      header('/?module=request_error');
    }
  }
}

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

  public static function delete_chat(): void {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $id_chat = $_GET['id_chat'];

      $chat = new Chat($id_chat, $_SESSION['id'], null, null);

      try {
        $chat->delete();
        
        echo json_encode([
          'result' => 'chat deleted',
        ]);
      } catch (\Throwable $th) {
        echo throw $th;
      }
    } else {
      echo json_encode([
        'error' => 'request method error'
      ]);
    }
  }

  public static function get_data_chat(): void {
    $id_chat = substr($_GET['id_chat'], 5);
    
    $chat = new Chat($id_chat, $_SESSION['id'], null, null);

    try {
      $chat->get_data_from_db();

      echo json_encode([
        'id_user' => $chat->get_id_user(),
        'title' => $chat->get_title(),
        'path_to_image' => $chat->get_path_to_image(),
      ]);
    } catch (\Throwable $th) {
      echo $th;
    }
  }
}

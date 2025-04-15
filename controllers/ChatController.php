<?php

require_once $_SERVER['DOCUMENT_ROOT'] . '/models/Chat.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/models/User.php';

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

        $id_chat = Chat::get_id_chat_by_title($title);
        Chat::add_chat_participants($_SESSION['id'], $id_chat);

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
        $chat->get_data_from_db();

        if ($chat->get_id_user() == $_SESSION['id'] || $_SESSION['role'] == 'administrator') {
          $chat->delete();
          echo json_encode([
            'result' => 'chat deleted',
          ]);
        } 
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

  public static function add_user_in_chat(): void {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $data_json = file_get_contents('php://input');
      $data = json_decode($data_json, true);

      $login = $data['login'];
      $id_chat = $data['id-chat'];
      $id_user = User::get_id_user_by_login($login);

      try {
        Chat::add_chat_participants($id_user, $id_chat);
      } catch (\Throwable $th) {
        echo $th;
      }
    } else {
      echo json_encode([
        'error' => 'request method error'
      ]);
    }
  }

  public static function get_info_chat(): void {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $data_json = file_get_contents('php://input');
      $data = json_decode($data_json, true);

      $id_chat = $data['id-chat'];

      $chat = new Chat($id_chat, null, null, null);

      try {
        $chat->get_data_from_db();
        
        echo json_encode([
          'title' => $chat->get_title(),
          'path_to_image' => $chat->get_path_to_image(),
          'creator' => User::get_login_by_id($chat->get_id_user()),
          'users' => Chat::get_array_users_chat($id_chat)
        ]);
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

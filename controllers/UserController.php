<?php

require_once $_SERVER['DOCUMENT_ROOT'] . '/models/User.php';

class UserController {
  public static function create(): void {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $login = $_POST['login'];
      $email = $_POST['email'];
      $password = $_POST['password'];

      $user = new User(null,$login, 'user', $email, $password, null);

      try {
        $user->save();
        header('Location: /?module=account');
      } catch (\Throwable $th) {
        header('Location: /?module=registration&error=user_is_registered');
      }
    } else {
      header('Location: /?module=registration&error=request_method_error');
    }
  }

  public static function login(): void {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $login = $_POST['login'];
      $password = $_POST['password'];

      $user = new User(null,$login, null, null, $password, null);

      $user->get_all_data();

      try {
        if ($user->check_password($password)) {
          $user->get_all_data();
          $user->create_session();

          header('Location: /?module=account');
        } else {
          header('Location: /?module=login&error=password_not_equal');
        }
      } catch (\Throwable $th) {
        header('Location: /?module=login&error=user_does_not_exist');
      }
    } else {
      header('Location: /?module=login&error=request_method_error');
    }
  }

  public static function logout(): void {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $user = new User(null, null, null, null, null, null);
      $user->delete_session();
      header('Location: /');
    } 
  }

  public static function edit_user(): void {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $id = $_GET['id_user'];
      $login = $_POST['login'];
      $role = $_POST['role'];
      $email = $_POST['email'];
      $file_error = $_FILES['image']['error'];

      if (!is_uploaded_file($_FILES['image']['tmp_name'])) {
        $user = new User($id, $login, $role, $email, null, null);
        try {
          $user->update();
          header('Location: /?module=admin_panel&result=successful_user_update');
        } catch (\Throwable $th) {
          echo $th;
          header('Location: /?module=admin_panel&error=error_updating_user');
        }
      } else {
        $file_name = $_FILES['image']['name'];
        $file_tmp_name = $_FILES['image']['tmp_name'];

        $path_to_save = '/user_images/' . $file_name;

        if (!move_uploaded_file($file_tmp_name, $_SERVER['DOCUMENT_ROOT'] . '/user_images/' . $file_name)) {
          die('<p>Ошибка сохранения файла!</p>');
        } else {
          $user = new User($id, $login, $role, $email, null, $path_to_save);

          try {
            $user->update();
            $user->create_session();
            header('Location: /?module=user&result=successful_user_update');
          } catch (\Throwable $th) {
            echo $th;
            header('Location: /?module=user&error=error_user_update');
          }
        }
      }
    } else {
      header('Location: /?module=error');
    }
  }

  public static function delete_user(): void {
    if ($_SESSION['role'] == 'administrator') {
      $id = $_GET['id_user'];

      $user = new User($id, null, null, null, null, null);

      try {
        $user->delete();
        header('Location: /?module=admin_panel&result=successful_user_deletion');
      } catch (\Throwable $th) {
        echo $th;
        header('Location: /?module=admin_panel&error=error_deletion_user');
      }
    } else {
      header('Location: /module=not_an_administrator');
    }
  }

  public static function get_users(): void {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      try {
        echo json_encode(User::get_users());
      } catch (\Throwable $th) {
        echo $th;
      }
    } else {
      echo json_encode([
        'error' => 'request method error'
      ]);
    }
  }

  public static function search_user(): void {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $data_json = file_get_contents('php://input');
      $data = json_decode($data_json, true);

      $login = $data['login'];
      
      try {
        echo json_encode(User::search_user($login));
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
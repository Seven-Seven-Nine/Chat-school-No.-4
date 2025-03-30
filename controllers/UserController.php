<?php

require_once $_SERVER['DOCUMENT_ROOT'] . '/models/User.php';

class UserController {
  public static function create(): void {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $login = $_POST['login'];
      $email = $_POST['email'];
      $password = $_POST['password'];

      $user = new User(null,$login, null, $email, $password);

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

      $user = new User(null,$login, null, null, $password);

      try {
        if ($user->check_password($password)) {
          $user->create_session($user->get_login(), $user->get_role());

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
      $user = new User(null, null, null, null, null);
      $user->delete_session();
      header('Location: /');
    } 
  }
}
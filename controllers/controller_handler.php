<?php

session_start();

if (isset($_GET['create_user'])) {
  require_once './UserController.php';
  $user_controller = new UserController();
  $user_controller->create();
}

if (isset($_GET['login_user'])) {
  require_once './UserController.php';
  $user_controller = new UserController();
  $user_controller->login();
}

if (isset($_GET['logout_user'])) {
  require_once './UserController.php';
  $user_controller = new UserController();
  $user_controller->logout();
}

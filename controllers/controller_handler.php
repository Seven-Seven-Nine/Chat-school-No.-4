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

if (isset($_GET['add_news'])) {
  require_once './NewsController.php';
  $news_controller = new NewsController();
  $news_controller->add_news();
}

if (isset($_GET['edit_news'])) {
  require_once './NewsController.php';
  $news_controller = new NewsController();
  $news_controller->edit_news();
}

if (isset($_GET['delete_news'])) {
  require_once './NewsController.php';
  $news_controller = new NewsController();
  $news_controller->delete_news();
}

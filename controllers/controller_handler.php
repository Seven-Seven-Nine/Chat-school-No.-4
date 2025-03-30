<?php

session_start();

require_once './UserController.php';
require_once './NewsController.php';
require_once './UpdateController.php';

if (isset($_GET['create_user'])) {
  UserController::create();
}

if (isset($_GET['login_user'])) {
  UserController::login();
}

if (isset($_GET['logout_user'])) {
  UserController::logout();
}

if (isset($_GET['add_news'])) {
  NewsController::add_news();
}

if (isset($_GET['edit_news'])) {
  NewsController::edit_news();
}

if (isset($_GET['delete_news'])) {
  NewsController::delete_news();
}

if (isset($_GET['add_update'])) {
  UpdateController::add_update();
}

if (isset($_GET['edit_update'])) {
  UpdateController::changing_update();
}

if (isset($_GET['delete_update'])) {
  UpdateController::delete_update();
} 

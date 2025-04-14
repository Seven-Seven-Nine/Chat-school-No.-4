<?php

session_start();

require_once './UserController.php';
require_once './NewsController.php';
require_once './UpdateController.php';
require_once './ChatController.php';
require_once './MessageController.php';

if (isset($_GET['create_user'])) {
  UserController::create();
}

if (isset($_GET['login_user'])) {
  UserController::login();
}

if (isset($_GET['logout_user'])) {
  UserController::logout();
}

if (isset($_GET['edit_user'])) {
  UserController::edit_user();
}

if (isset($_GET['delete_user'])) {
  UserController::delete_user();
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
  UpdateController::edit_update();
}

if (isset($_GET['delete_update'])) {
  UpdateController::delete_update();
} 

if (isset($_GET['add_chat'])) {
  ChatController::add_chat();
}

if (isset($_GET['get_data_chat'])) {
  ChatController::get_data_chat();
}

if (isset($_GET['delete_chat'])) {
  ChatController::delete_chat();
}

if (isset($_GET['send_message'])) {
  MessageController::send_message();
}

if (isset($_GET['get_messages'])) {
  MessageController::get_message();
}

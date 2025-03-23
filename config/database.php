<?php

function get_connection_database(): mysqli {
  $hostname = 'localhost';
  $user = 'root';
  $password = '';
  $database = 'chat-school-4';

  $connection = new mysqli($hostname, $user, $password, $database);

  if ($connection->connect_errno) {
    die('Ошибка подключения: '. $connection->connect_error);
  }

  return $connection;
}
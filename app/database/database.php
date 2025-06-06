<?php

/**
 * Функция подключения к базе данных.
 * @return mysqli
 */
function get_connection_database(): mysqli {
    $connection = new mysqli('localhost', 'root', '7803', 'chat-school4');
    return $connection;
}
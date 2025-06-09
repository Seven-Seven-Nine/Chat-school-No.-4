<?php

/**
 * Подключение к базе данных Chat school No. 4.
 * @return mysqli
 */
function get_connection_database(): mysqli {
    return new mysqli('localhost', 'root', '7803', 'chat-school4');
}
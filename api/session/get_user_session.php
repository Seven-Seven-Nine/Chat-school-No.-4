<?php

session_start();

header('Content-Type: application/json');

function get_user_session(): void {
    if (isset($_SESSION['login']) && isset($_SESSION['role']) && isset($_SESSION['email']) && isset($_SESSION['path_to_avatar'])) {
        echo json_encode([
            'result' => 'the session was successfully found in full',
            'login' => $_SESSION['login'],
            'role'=> $_SESSION['role'], 
            'email'=> $_SESSION['email'],   
            'path_to_avatar' => $_SESSION['path_to_avatar']
        ]);
    } else {
        echo json_encode([
            'error' => 'the user\'s session was not found or is incomplete to issue',
            'error message' => 'Сессия пользователя не найдена или сессия не полная!'
        ]);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    get_user_session();
} else {
     echo json_encode(['error' => 'incorrect request method']);
}
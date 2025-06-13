<?php

session_start();

header('Content-Type: application/json');

/**
 * Удаления всей сессии пользователя.
 * @return void
 */
function logout(): void {
    session_destroy();
    echo json_encode(['result' => 'the session is destroyed']);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    logout();
} else {
    echo json_encode(['error' => 'incorrect request method']);
}
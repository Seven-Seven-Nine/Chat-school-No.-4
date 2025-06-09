<?php

session_start();

header('Content-Type: application/json');

function checking_for_session_availability() {
    if (isset($_SESSION['login']) && isset($_SESSION['role']) && isset($_SESSION['email'])) {
        echo json_encode(['result' => 'the user\'s session was found']);
    } else {
        echo json_encode(['result'=> 'the user\'s session was not found']);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    checking_for_session_availability();
} else {
    echo json_encode(['error' => 'incorrect request method']);
}
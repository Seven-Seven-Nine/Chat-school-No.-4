<?php

session_start();

header('Content-Type: application/json');

require_once $_SERVER['DOCUMENT_ROOT'] . '/api/database/database.php';

/**
 * Функция создания сообщения.
 * @param string|int $id_chat id чата, к которому будет привязано сообщение.
 * @param string $text текст сообщения.
 * @return void
 */
function add_message(string | int $id_chat, string $text): void {
    try {
        $connection = get_connection_database();
        $stmt = $connection->prepare('SELECT `id_user` FROM `users` WHERE `login` = ?');
        $stmt->bind_param('s', $_SESSION['login']);
        $stmt->execute();

        $id_user = '';
        $result_user_id = $stmt->get_result();
        while ($row = $result_user_id->fetch_assoc()) {
            $id_user = $row['id_user'];
        }

        $date = date('Y-m-d H:i:s');
        $stmt2 = $connection->prepare('INSERT INTO `messages` (`id_chat`, `id_user`, `text`, `date`) VALUES (?, ?, ?, ?)');
        $stmt2->bind_param('ssss', $id_chat, $id_user, $text, $date);
        $stmt2->execute();

        echo json_encode(['result' => 'the message was successfully added']);
    } catch (\Throwable $th) {
        echo json_encode([
            'error' => 'error requesting the addition of a message',
            'error message' => 'Ошибка запроса добавления запроса!',
            'more information error' => $th->getMessage()
        ]);
    } finally {
        $connection->close();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = json_decode(file_get_contents('php://input'), true);
    add_message($json['id_chat'], $json['text']);
}
<?php

session_start();

header('Content-Type: application/json');

require_once $_SERVER['DOCUMENT_ROOT'] . '/api/database/database.php';

/**
 * Редактирования сообщения.
 * @param string|int $id_message id сообщения для редактирования текста.
 * @param string $new_text новый текст сообщения.
 * @return void
 */
function edit_message(string | int $id_message, string $new_text): void {
    try {
        $connection = get_connection_database();
        $stmt = $connection->prepare('SELECT `id_user` FROM `users` WHERE `login` = ?');
        $stmt->bind_param('s', $_SESSION['login']);
        $stmt->execute();

        $id_user = '';
        $result_search_id_user = $stmt->get_result();
        while ($row = $result_search_id_user->fetch_assoc()) {
            $id_user = $row['id_user'];
        }
        
        $stmt2 = $connection->prepare('SELECT `id_user` FROM `messages` WHERE `id_user` = ? AND `id_message` = ?');
        $stmt2->bind_param('ss', $id_user, $id_message);
        $stmt2->execute();

        $result_search = $stmt2->get_result();
        if ($result_search->num_rows > 0) {
            $stmt3 = $connection->prepare('UPDATE `messages` SET `text` = ? WHERE `id_message` = ?');
            $stmt3->bind_param('ss', $new_text, $id_message);
            $stmt3->execute();
    
            echo json_encode(['result' => 'the message has been successfully updated']);
        } else {
            echo json_encode([
                'error' => 'message editing errors, no access',
                'error message' => 'Ошибка, у пользователя нет прав для редактирования сообщения!',
            ]);
        }
    } catch (\Throwable $th) {
        echo json_encode([
            'error' => 'error in the message editing request',
            'error message' => 'Ошибка запроса редактирования сообщения!',
            'more information error' => $th->getMessage()
        ]);
    } finally {
        $connection->close();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = json_decode(file_get_contents('php://input'), true);
    edit_message($json['id_message'], $json['new_text']);
}
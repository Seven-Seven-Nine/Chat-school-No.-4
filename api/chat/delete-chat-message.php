<?php

session_start();

header('Content-Type: application/json');

require_once $_SERVER['DOCUMENT_ROOT'] . '/api/database/database.php';

/**
 * Удаление сообщения чата.
 * @param string|int $id_message id сообщения для удаления сообщения.
 * @return void
 */
function delete_chat_message(string | int $id_message): void {
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
        if ($result_search->num_rows > 0 || $_SESSION['role'] === 'administrator') {
            $stmt3 = $connection->prepare('DELETE FROM `messages` WHERE `id_message` = ?');
            $stmt3->bind_param('s', $id_message);
            $stmt3->execute();

            echo json_encode(['result' => 'the message was successfully deleted']);
        } else {
            echo json_encode([
                'error' => 'message editing errors, no access',
                'error message' => 'Ошибка, у пользователя нет прав для удаления сообщения!',
            ]);
        }
    } catch (\Throwable $th) {
        echo json_encode([
            'error' => 'message deletion request error',
            'error message' => 'Ошибка запроса удаления сообщения!',
            'more information error' => $th->getMessage()
        ]);
    } finally {
        $connection->close();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = json_decode(file_get_contents('php://input'), true);
    delete_chat_message($json['id_message']);
}
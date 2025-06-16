<?php

session_start();

header('Content-Type: application/json');

require_once $_SERVER['DOCUMENT_ROOT'] . '/api/database/database.php';

/**
 * Функция удаления чата из базы данных.
 * @param string|int $id_chat id чата, который требуется удалить.
 * @return void
 */
function delete_chat(string | int $id_chat): void {
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
        
        $stmt2 = $connection->prepare('SELECT `id_user` FROM `chats` WHERE `id_user` = ? AND `id_chat` = ?');
        $stmt2->bind_param('ss', $id_user, $id_chat);
        $stmt2->execute();

        $result_search = $stmt2->get_result();
        if ($result_search->num_rows > 0) {
            $stmt3 = $connection->prepare('DELETE FROM `chats` WHERE `id_chat` = ?');
            $stmt3->bind_param('s', $id_chat);
            $stmt3->execute();

            echo json_encode(['result' => 'the chat was successfully deleted']);
        } else {
            echo json_encode([
                'error' => 'error deleting the chat, the user does not have access',
                'error message' => 'Ошибка, у пользователя нет прав для удаления чата!',
            ]);
        }
    } catch (\Throwable $th) {
        echo json_encode([
            'error' => 'chat deletion request error',
            'error message' => 'Ошибка запроса удаления чата!',
            'more information error' => $th->getMessage()
        ]);
    } finally {
        $connection->close();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = json_decode(file_get_contents('php://input'), true);
    delete_chat($json['id_chat']);
}
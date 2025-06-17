<?php

session_start();

header('Content-Type: application/json');

require_once $_SERVER['DOCUMENT_ROOT'] . '/api/database/database.php';

/**
 * УДАЛИТЬ ПОЛЬЗОВАТЕЛЯ НАХУЙ ИЗ ЭТОГО МИРА.
 * @param string|int $id_user id чата.
 * @return void
 */
function user_delete(string | int $id_user): void {
    try {
        $connection = get_connection_database();
        $stmt = $connection->prepare('DELETE FROM `users` WHERE `id_user` = ?');
        $stmt->bind_param('s', $id_user);
        $stmt->execute();

        echo json_encode(['result' => 'the user has been successfully deleted']);
    } catch (\Throwable $th) {
        echo json_encode([
            'error' => 'user deletion request error',
            'error message' => 'Ошибка запроса удаления пользователя!',
            'more information error' => $th->getMessage()
        ]);
    } finally {
        $connection->close();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = json_decode(file_get_contents('php://input'), true);
    user_delete($json['id_user']);
}
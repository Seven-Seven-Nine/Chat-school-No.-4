<?php

session_start();

header('Content-Type: application/json');

require_once $_SERVER['DOCUMENT_ROOT'] . '/api/database/database.php';

/**
 * Добавление новости в базу данных.
 * @param string $login логин пользователя, добавляющего новость.
 * @param string $title название новости.
 * @param string $text текст новости. 
 * @return void
 */
function add_news(string $login, string $title, string $text): void {
    try {
        $connection = get_connection_database();
        $stmt = $connection->prepare('SELECT `id_user` FROM `users` WHERE `login` = ?');
        $stmt->bind_param('s', $login);
        $stmt->execute();

        $id_user = '';
        $result_search_id_user = $stmt->get_result();
        while ($row_user = $result_search_id_user->fetch_assoc()) {
            $id_user = $row_user['id_user'];
        }

        $date = date('Y-m-d H:i:s');
        $stmt2 = $connection->prepare('INSERT INTO `news` (`id_user`, `title`, `text`, `date`) VALUES (?, ?, ?, ?)');
        $stmt2->bind_param('ssss', $id_user, $title, $text, $date);
        $stmt2->execute();

        echo json_encode(['result' => 'the news was added successfully']);
    } catch (\Throwable $th) {
        echo json_encode([
            'error' => 'error requesting news addition',
            'error message' => 'Ошибка запроса добавления новости!',
            'more information error' => $th->getMessage()
        ]);
    } finally {
        $connection->close();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = json_decode(file_get_contents('php://input'), true);
    add_news($json['login'], $json['title'], $json['text']);
}
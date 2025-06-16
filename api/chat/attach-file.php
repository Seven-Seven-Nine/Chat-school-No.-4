<?php

session_start();

header('Content-Type: application/json');

require_once $_SERVER['DOCUMENT_ROOT'] . '/api/database/database.php';

/**
 * Прикрепление файла в чате.
 * @param string|int $id_chat id чата.
 * @param string|int $id_user id пользователя.
 * @param array $file файл для сохранения.
 * @return void
 */
function attach_file(string | int $id_chat, array $file): void {
    $save_dir = '/api/attached-files/';
    $upload_dir = $_SERVER['DOCUMENT_ROOT'] . $save_dir;
    if ($file['error'] !== UPLOAD_ERR_OK) {
        echo json_encode([
            'error' => 'file upload error',
            'error message' => 'Ошибка загрузки файла!'
        ]);
    } else {
        $file_name = uniqid() . '_' . basename(path: $file['name']);
        $target_path = $upload_dir . $file_name;
        if (move_uploaded_file($file['tmp_name'], $target_path)) {
            attach_file_in_database($id_chat, $save_dir, $file_name);
            echo json_encode(['result' => 'the file was saved successfully']);
        } else {
            echo json_encode([
                'error' => 'file movement error',
                'error message' => 'Ошибка перемещения файла!'
            ]);
        }
    }
}

function attach_file_in_database(string | int $id_chat, string $save_dir, string $file_name): void {
    try {
        $date = date('Y-m-d H:i:s');
        $path_to_file = $save_dir . $file_name;
        $connection = get_connection_database();

        $stmt = $connection->prepare('SELECT `id_user` FROM `users` WHERE `login` = ?');
        $stmt->bind_param('s', $_SESSION['login']);
        $stmt->execute();

        $id_user = '';
        $result_search_user = $stmt->get_result();
        while ($row = $result_search_user->fetch_assoc()) {
            $id_user = $row['id_user'];
        }

        $stmt2 = $connection->prepare('INSERT INTO `messages` (`id_chat`, `id_user`, `date`, `path_to_file`, `file_name`) VALUES (?, ?, ?, ?, ?)');
        $stmt2->bind_param('sssss', $id_chat, $id_user, $date, $path_to_file, $file_name);
        $stmt2->execute();
    } catch (\Throwable $th) {
        echo json_encode([
            'error' => 'file attachment request error',
            'error message' => 'Ошибка запроса прикрепления файла!',
            'more information error' => $th->getMessage()
        ]);
    } finally {
        $connection->close();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['file']) && isset($_POST['id_chat'])) {
        $id_chat = $_POST['id_chat'];
        $file = $_FILES['file'];
        attach_file($id_chat, $file);
    } else {
        echo json_encode([
            'error' => 'there is no necessary data to create a chat',
            'error message' => 'Не получено id чата или файл!'
        ]);
    }
}
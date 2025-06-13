<?php

session_start();

header('Content-Type: application/json');

require_once $_SERVER['DOCUMENT_ROOT'] . '/api/database/database.php';

function save_user_avatar(array $file): void {
    $save_dir = '/api/user-image/';
    $upload_dir = $_SERVER['DOCUMENT_ROOT'] . $save_dir;
    if ($file['error'] !== UPLOAD_ERR_OK) {
        echo json_encode([
            'error' => 'file upload error',
            'error message' => 'Ошибка загрузки файла!'
        ]);
    } else {
        $file_name = uniqid() . '_' . basename($file['name']);
        $target_path = $upload_dir . $file_name;
        if (move_uploaded_file($file['tmp_name'], $target_path)) {
            save_avatar_in_database($save_dir, $file_name);
            echo json_encode(['result' => 'the file was saved successfully']);
        } else {
            echo json_encode([
                'error' => 'file movement error',
                'error message' => 'Ошибка перемещения файла!'
            ]);
        }
    }
}

function save_avatar_in_database(string $save_dir, string $file_nam): void {
    $path_to_avatar = $save_dir . $file_nam;
    try {
        $connection = get_connection_database();
        $stmt = $connection->prepare('UPDATE `users` SET `path_to_avatar` = ? WHERE `login` = ?');
        $stmt->bind_param('ss', $path_to_avatar, $_SESSION['login']);
        $stmt->execute();

        $_SESSION['path_to_avatar'] = $path_to_avatar;
    } catch (\Throwable $th) {
        echo json_encode([
            'error' => 'save user avatar request error',
            'error message' => 'Ошибка запроса сохранения пользовательского аватара!',
            'more information errors' => $th->getMessage()
        ]);
    } finally {
        $connection->close();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['image'])) {
        $file = $_FILES['image'];
        save_user_avatar($file);
    } else {
        echo json_encode([
            'error' => 'the image file was not received',
            'error message' => 'Файл изображения не получен!'
        ]);
    }
}
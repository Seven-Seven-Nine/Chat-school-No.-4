<?php

session_start();

header('Content-Type: application/json');

require_once $_SERVER['DOCUMENT_ROOT'] . '/api/database/database.php';

/**
 * Изменить изображение чата.
 * @param string|int $id_chat id чата, для которого нужно изменить изображение.
 * @param array $file новое изображение чата.
 * @return void
 */
function change_chat_image(string | int $id_chat, array $file): void {
    $save_dir = '/api/chat-image/';
    $upload_dir = $_SERVER['DOCUMENT_ROOT'] . $save_dir;
    if ($file['error'] !== UPLOAD_ERR_OK) {
        echo json_encode([
            'error' => 'file upload error',
            'error message' => 'Ошибка загрузки изображения чата!'
        ]);
    } else {
        $file_name = uniqid() . '_' . basename($file['name']);
        $target_path = $upload_dir . $file_name;
        if (move_uploaded_file($file['tmp_name'], $target_path)) {
            change_chat_image_in_database($id_chat, $save_dir, $file_name);
            echo json_encode(['result' => 'the chat image has been successfully changed']);
        } else {
            echo json_encode([
                'error' => 'file movement error',
                'error message' => 'Ошибка перемещения изображения чата!'
            ]);
        }
    }
}

function change_chat_image_in_database(string | int $id_chat, string $save_dir, string $file_name): void {
    try {
        $path_to_image = $save_dir . $file_name;
        $connection = get_connection_database();
        $stmt = $connection->prepare('UPDATE `chats` SET `path_to_image` = ? WHERE `id_chat` = ?');
        $stmt->bind_param('ss', $path_to_image, $id_chat);
        $stmt->execute();
    } catch (\Throwable $th) {
        echo json_encode([
            'error' => 'error requesting to change the chat image',
            'error message' => 'Ошибка запроса изменения изображения чата!',
            'more information error' => $th->getMessage()
        ]);
    } finally {
        $connection->close();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['image']) && isset($_POST['id_chat'])) {
        $id_chat = $_POST['id_chat'];
        $file = $_FILES['image'];
        change_chat_image($id_chat, $file);
    } else {
        echo json_encode([
            'error' => 'there is no necessary data to create a chat',
            'error message' => 'Не получено id чата или изображение!'
        ]);
    }
}
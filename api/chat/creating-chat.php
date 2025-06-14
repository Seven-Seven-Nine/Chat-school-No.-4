<?php

session_start();

header('Content-Type: application/json');

require_once $_SERVER['DOCUMENT_ROOT'] . '/api/database/database.php';


/**
 * Создание чата пользователя.
 * @param string $title название чата.
 * @param array $file файл изображения для чата.
 * @return void
 */
function creating_chat(string $title, array $file): void {
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
            creating_chat_in_database($title, $save_dir, $file_name);
            echo json_encode(['result' => 'the chat was created successfully']);
        } else {
            echo json_encode([
                'error' => 'file movement error',
                'error message' => 'Ошибка перемещения изображения чата!'
            ]);
        }
    }
}

function creating_chat_in_database(string $title, string $save_dir, string $file_name): void {
    try {
        $connection = get_connection_database();
        $stmt = $connection->prepare('SELECT `id_user` FROM `users` WHERE `login` = ?');
        $stmt->bind_param('s', $_SESSION['login']);
        $stmt->execute();

        $id_user = '';
        $path_to_image = $save_dir . $file_name;
        $result_search_id_user = $stmt->get_result();
        while ($row = $result_search_id_user->fetch_assoc()) {
            $id_user = $row['id_user'];
        }

        $stmt->prepare('INSERT INTO `chats` (`id_user`, `title`, `path_to_image`) VALUES (?, ?, ?)');
        $stmt->bind_param('sss', $id_user, $title, $path_to_image);
        $stmt->execute();

        $new_chat_id = $stmt->insert_id;
        $joined_at = date('Y-m-d H:i:s');

        $stmt->prepare('INSERT INTO `chat_participants` (`id_chat`, `id_user`, `joined_at`) VALUES (?, ?, ?)');
        $stmt->bind_param('sss', $new_chat_id, $id_user, $joined_at);
        $stmt->execute();
    } catch (\Throwable $th) {
        echo json_encode([
            'error' => 'error requesting chats to be uploaded',
            'error message' => 'Ошибка запроса загрузки чатов пользователя!',
            'more information error' => $th->getMessage()
        ]);
    } finally {
        $connection->close();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['image']) && isset($_POST['title'])) {
        $title = $_POST['title'];
        $file = $_FILES['image'];
        creating_chat($title, $file);
    } else {
        echo json_encode([
            'error' => 'there is no necessary data to create a chat',
            'error message' => 'Не получено название или изображение чата!'
        ]);
    }
}
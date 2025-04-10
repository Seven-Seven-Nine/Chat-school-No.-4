<?php
if (!isset($_SESSION['login']) && !isset($_SESSION['role']) && !isset($_SESSION['token'])) {
  header('Location: /?module=error');
}
?>
<link rel="stylesheet" href="./modules/add_chat/add_chat.css">
<main id="module" class="module open-module flex flex-column flex-start">
  <div class="flex flex-row flex-start block-arrow-back">
    <p id="btn-return" class="icon-button">←</p>
  </div>
  <h2>Добавить чат</h2>
  <form class="form flex flex-column flex-center" action="/controllers/controller_handler.php?add_chat" method="post" enctype="multipart/form-data">
    <input type="text" name="title" placeholder="Название чата" required>
    <input title="Изображение для чата" type="file" name="image" required>
    <button class="button-default" type="submit">Создать</button>
  </form>
</main>
<script type="module" src="./modules/add_chat/add_chat.js" defer></script>
<?php
if (!isset($_SESSION['login']) && !isset($_SESSION['role']) && !isset($_SESSION['token'])) {
  header('Location: /?module=error');
} else {
  if ($_SESSION['role'] != 'administrator') {
    header('Location: /?module=error');
  }
}
?>
<link rel="stylesheet" href="/modules/admin_panel/admin_panel.css">
<main id="module" class="module open-module flex flex-column flex-start">
  <div class="flex flex-row flex-start block-arrow-back">
    <p id="btn-return" class="icon-button">←</p>
  </div>

  <!-- Меню админ панели -->
  <div id="block-menu-admin-panel" class="flex flex-column flex-center block-admin-panels">
    <h2>Модуль админ-панели.</h2>
    <p>Данные администратора: <span class="green-text"><?php echo $_SESSION['login'] ?></span> | <span
        class="red-text"><?php echo $_SESSION['role'] ?></span> | <span
        class="yellow-text"><?php echo $_SESSION['token'] ?></span></p>
    <div class="flex flex-row flex-center block-menu-panel">
      <div id="btn-working-with-news" title="Добавление | редактирование | удаление новостей"
        class="flex flex-column flex-center button-admin-panel">
        <img src="./static/svg/icon-news-dark.svg" alt="Иконка новостей">
      </div>
      <div id="btn-working-with-update" title="Добавление | редактирование | удаление записей обновлений"
        class="flex flex-column flex-center button-admin-panel">
        <img src="./static/svg/icon-fix-dark.svg" alt="Иконка обновления">
      </div>
      <div id="btn-working-with-users" title="Просмотр | редактирование | бан пользователей"
        class="flex flex-column flex-center button-admin-panel">
        <img src="./static/svg/icon-user-dark.svg" alt="Иконка пользователей">
      </div>
    </div>
  </div>

  <!-- Навигация -->
  <div id="block-navigation" class="display-none flex flex-row flex-center block-navigation">
    <img id="icon-working-with-news" class="icon-button" src="./static/svg/icon-news-dark.svg" alt="Иконка новостей">
    <img id="icon-working-with-updates" class="icon-button" src="./static/svg/icon-fix-dark.svg" alt="Иконка обновления">
    <img id="icon-working-with-users" class="icon-button" src="./static/svg/icon-user-dark.svg" alt="Иконка пользователей">
  </div>

  <!-- Новости -->
  <div id="block-news" class="display-none flex flex-column flex-start block-news">
    <h2>Новости</h2>
    <div class="block-list-cards-news flex flex-row flex-start flex-wrap">
      <div class="card-news flex flex-column flex-center" id="card-add-news">
        <img src="./static/svg/icon-plus-dark.svg" alt="icon">
      </div>
    </div>
  </div>

  <!-- Обновления -->
  <div id="block-updates" class="display-none flex flex-column flex-start">
    <h2>Записи обновлений</h2>
  </div>

  <!-- Пользователи -->
  <div id="block-users" class="display-none flex flex-column flex-start">
    <h2>Пользователи</h2>
  </div>
</main>
<script type="module" src="/modules/admin_panel/admin_panel.js" defer></script>
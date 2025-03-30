<?php
if (!isset($_SESSION['login']) && !isset($_SESSION['role']) && !isset($_SESSION['token'])) {
  header('Location: /?module=error');
}
?>
<link rel="stylesheet" href="./modules/account/account.css">
<main id="module" id="module" class="module open-module flex flex-row flex-center">
  <!-- Основная вёрстка -->
  <div class="flex flex-column flex-center block-list-chats">
    <div class="flex flex-row flex-start block-icon-menu">
      <img title="Открыть левое меню" src="./static/svg/icon-menu-dark.svg" alt="icon-menu" class="icon-button" id="icon-btn-left-menu">
    </div>
    <div class="flex flex-column flex-start block-chats">
      <!-- Шаблон чата -->
      <div class="flex flex-row flex-start block-chat">
        <div class="flex flex-row flex-center block-icon-chat">
          <img src="" alt="icon" class="icon-chat">
        </div>
        <div class="flex flex-column flex-center block-title-chat">
          <h3>Название чата</h3>
          <p>Последнее сообщение...</p>
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-column flex-center block-data-chat">
    <div class="flex flex-row flex-center block-header-chat">
      <div class="flex flex-row flex-start block-title-chat">
        <h2>Название чата</h2>
      </div>
      <div class="flex flex-row flex-end block-menu-chat">
        <img src="./static/svg/icon-menu-points-dark.svg" alt="icon-menu" class="icon-button" id="icon-btn-right-menu">
      </div>
    </div>
    <div class="block-main-body-chat"></div>
  </div>

  <!-- Второй слой вёрстки для левого меню -->
  <div id="block-left-menu-layer" class="flex flex-row flex-start block-left-menu-layer">
    <!-- Левое меню -->
    <div id="block-left-menu" class="flex flex-column flex-start block-left-menu">
      <div id="block-menu" class="block-menu">
      <div class="flex flex-row flex-center menu-button menu-button-close" id="btn-close">
          <div class="flex flex-row flex-center block-icon-menu-button">
            <img src="./static/svg/icon-close-dark.svg" alt="icon-button">
          </div>
          <div class="flex flex-row flex-start block-text-menu-button">
            <p>Закрыть</p>
          </div>
        </div>
        <?php
          if ($_SESSION['role'] == 'administrator') {
            echo '
              <div class="flex flex-row flex-center menu-button" id="btn-admin-panel">
                <div class="flex flex-row flex-center block-icon-menu-button">
                  <img src="./static/svg/icon-message-dark.svg" alt="icon-button">
                </div>
                <div class="flex flex-row flex-start block-text-menu-button">
                  <p>Админ-панель</p>
                </div>
              </div>
            ';
          }
        ?>
        <div class="flex flex-row flex-center menu-button" id="btn-user">
          <div class="flex flex-row flex-center block-icon-menu-button">
            <img src="./static/svg/human-dark.svg" alt="icon-button">
          </div>
          <div class="flex flex-row flex-start block-text-menu-button">
            <p>Пользователь</p>
          </div>
        </div>
        <div class="flex flex-row flex-center menu-button" id="btn-settings">
          <div class="flex flex-row flex-center block-icon-menu-button">
            <img src="./static/svg/icon-gear-dark.svg" alt="icon-button">
          </div>
          <div class="flex flex-row flex-start block-text-menu-button">
            <p>Настройки</p>
          </div>
        </div>
        <div class="flex flex-row flex-center menu-button" id="btn-exit">
          <div class="flex flex-row flex-center block-icon-menu-button">
            <img src="./static/svg/icon-exit-dark.svg" alt="icon-button">
          </div>
          <div class="flex flex-row flex-start block-text-menu-button">
            <p>Выйти</p>
          </div>
        </div>
      </div>
      <div class="flex flex-column flex-center block-copyright">
        <p>©Умбеталиев Данила</p>
      </div>
    </div>
    <!-- Область затемнения -->
    <div id="block-darkening-area" class="block-darkening-area"></div>
    <!-- Информационная область -->
    <div id="block-information-data" class="block-information-data">
      <div class="top-block-information-data">
        <div class="flex flex-row flex-center block-content block-icons">
          <div class="flex flex-row flex-center block-main-icons">
            <img id="btn-icon-notification-left-menu" title="Уведомления" src="./static/svg/icon-notification-dark.svg" alt="icon" class="icon-button">
          </div>
          <div class="flex flex-row flex-center block-close-icon">
            <img id="btn-icon-close-left-menu" title="Закрыть" src="./static/svg/icon-close-dark.svg" alt="icon" class="icon-button">
          </div>
        </div>
      </div>
      <div class="flex flex-row flex-center flex-wrap bottom-block-information-data">
        <div class="flex flex-column flex-start left-block-information-data">
          <div class="flex flex-column flex-center block-content block-user">
            <img src="./static/svg/human-dark.svg" alt="icon-user">
            <p id="paragraph-login"><?php echo $_SESSION['login'] ?></p>
            <p id="paragraph-role"><?php if ($_SESSION['role'] == 'administrator') { echo 'Администратор'; } else { echo 'Пользователь'; } ?></p>
          </div>
          <?php
          require_once $_SERVER['DOCUMENT_ROOT'] . '/models/Update.php';
          Update::display_all_update_list();
          ?>
        </div>
        <div class="flex flex-column flex-start right-block-information-data">
          <?php
          require_once $_SERVER['DOCUMENT_ROOT'] . '/models/News.php';
          News::display_all_news_list();
          ?>
        </div>
      </div>
    </div>
  </div>
</main>
<script type="module" src="./modules/account/account.js" defer></script>
<?php
if (!isset($_SESSION['login']) && !isset($_SESSION['role']) && !isset($_SESSION['token'])) {
  header('Location: /?module=error');
}

require_once $_SERVER['DOCUMENT_ROOT'] . '/models/Chat.php';

if (isset(($_GET['result']))) {
  switch ($_GET['result']) {
    case 'successful_chat_addition':
      echo '<p class="notification notification-green">Чат создан!</p>';
      break;
    default:
      echo '<p class="notification notification-red">Неизвестный результат!</p>';
      break;
  }
}

if (isset($_GET['error'])) {
  switch ($_GET['error']) {
    case 'error_adding_chat':
      echo '<p class="notification notification-red">Ошибка при создания чата!</p>';
      break;
    case 'error_saving_the_image':
      echo '<p class="notification notification-red">Ошибка сохранения изображения!</p>';
      break;
    default:
      echo '<p class="notification notification-red">Неизвестная ошибка!</p>';
      break;
  }
}
?>
<link rel="stylesheet" href="./modules/account/account.css">
<main id="module" id="module" class="module open-module flex flex-row flex-center">
  <!-- Основная вёрстка -->
  <div class="flex flex-column flex-center block-list-chats">
    <div class="flex flex-row flex-start block-icon-menu">
      <img title="Открыть левое меню" src="./static/svg/icon-menu-dark.svg" alt="icon-menu" class="icon-button" id="icon-btn-left-menu">
      <img title="Добавить чат" class="icon-plus icon-button" src="./static/svg/icon-create-chat.svg" alt="Иконка добавить" id="icon-btn-add-chat">
    </div>
    <div class="flex flex-column flex-start block-chats">
      <?php
        Chat::display_list_chat($_SESSION['id']);
      ?>
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
            <?php
            if (isset($_SESSION['path_to_image'])) {
              echo '<img class="image-user" src="'. $_SESSION['path_to_image'] .'" alt="Пользователь">';
            } else {
              echo '<img src="./static/svg/human-dark.svg" alt="icon-user">';
            }
            ?>
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
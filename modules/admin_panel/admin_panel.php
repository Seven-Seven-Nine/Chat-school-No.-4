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

  <?php
  if (isset($_GET['result'])) {
    switch ($_GET['result']) {
      case 'successful_addition_news':
        echo '<p class="notification notification-green">Успешное добавление новости!</p>';
        break;
      case 'successful_news_editing':
        echo '<p class="notification notification-green">Успешное редактирование новости!</p>';
        break;
      case 'successful_news_deletion':
        echo '<p class="notification notification-green">Успешное удаление новости!</p>';
        break;
      default:
        echo '<p class="notification notification-red">Неизвестный результат!</p>';
        break;
    }
  }

  if (isset($_GET['error'])) {
    switch ($_GET['error']) {
      case 'error_adding_news':
        echo '<p class="notification notification-red">Ошибка добавления новости!</p>';
        break;
      case 'error_editing_news':
        echo '<p class="notification notification-red">Ошибка редактирования новости!</p>';
        break;
      case 'news_deletion_error':
        echo '<p class="notification notification-red">Ошибка редактирования новости!</p>';
        break;
      default:
        echo '<p class="notification notification-red">Неизвестная ошибка!</p>';
        break;
    }
  }
  ?>

  <!-- Меню админ панели -->
  <div id="block-menu-admin-panel" class="flex flex-column flex-center block-admin-panels">
    <h2>Модуль админ-панели.</h2>
    <p>Данные администратора: <span class="green-text"><?php echo $_SESSION['id'] ?></span> | <span class="green-text"><?php echo $_SESSION['login'] ?></span> | <span
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
    <img id="icon-working-with-updates" class="icon-button" src="./static/svg/icon-fix-dark.svg"
      alt="Иконка обновления">
    <img id="icon-working-with-users" class="icon-button" src="./static/svg/icon-user-dark.svg"
      alt="Иконка пользователей">
  </div>

  <!-- Новости -->
  <div id="block-news" class="display-none flex flex-column flex-start block-news">
    <h2>Новости</h2>
    <div class="block-list-cards-news flex flex-row flex-center flex-wrap">
      <div class="card-news image-plus flex flex-column flex-center" id="card-add-news">
        <svg width="90" height="90" viewBox="0 0 23.8125 23.8125" version="1.1" id="svg1" xml:space="preserve"
          inkscape:version="1.3.2 (091e20e, 2023-11-25, custom)" sodipodi:docname="icon-plus-dark.svg"
          xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
          xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns="http://www.w3.org/2000/svg"
          xmlns:svg="http://www.w3.org/2000/svg">
          <style>
            @media (prefers-color-scheme: dark) {
              path {
                stroke: white !important;
              }
            }
          </style>
          <sodipodi:namedview id="namedview1" pagecolor="#212121" bordercolor="#000000" borderopacity="0.25"
            inkscape:showpageshadow="2" inkscape:pageopacity="0.0" inkscape:pagecheckerboard="0"
            inkscape:deskcolor="#d1d1d1" inkscape:document-units="mm" inkscape:zoom="5.7941076" inkscape:cx="29.85792"
            inkscape:cy="47.807189" inkscape:window-width="1403" inkscape:window-height="876" inkscape:window-x="237"
            inkscape:window-y="62" inkscape:window-maximized="0" inkscape:current-layer="layer1" />
          <defs id="defs1" />
          <g inkscape:label="Слой 1" inkscape:groupmode="layer" id="layer1">
            <path
              d="m 23.00508,13.615299 h -9.099567 v 9.446877 H 9.9230059 V 13.615299 H 0.82343917 V 10.095874 H 9.9230059 V 0.71845897 H 13.905513 V 10.095874 h 9.099567 z"
              id="text19"
              style="font-size:44.0239px;font-family:Consolas;-inkscape-font-specification:Consolas;fill:none;stroke:#000000;stroke-width:0.854975;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
              aria-label="+" />
          </g>
        </svg>
      </div>
      <?php
      require_once $_SERVER['DOCUMENT_ROOT'] . '/models/News.php';
      $news = new News(null, null, null, null, null);
      $news->display_all_news();
      ?>
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

  <!-- Форма добавления новости -->
  <div id="block-add-news" class="display-none flex flex-column flex-start block-add-news">
    <h2>Добавить новость</h2>
    <form class="form flex flex-column flex-center" action="/controllers/controller_handler.php?add_news" method="post">
      <input type="text" name="title" placeholder="Заголовок" required>
      <input type="date" name="date" required>
      <textarea name="text" placeholder="Текст" required></textarea>
      <button class="button-default" type="submit">Добавить</button>
    </form>
  </div>
</main>
<script type="module" src="/modules/admin_panel/admin_panel.js" defer></script>
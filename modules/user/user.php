<?php
if (!isset($_SESSION['login']) && !isset($_SESSION['role']) && !isset($_SESSION['token'])) {
  header('Location: /?module=error');
}
?>
<link rel="stylesheet" href="./modules/user/user.css">
<main id="module" class="module open-module flex flex-column flex-start">
  <?php
    if (isset($_GET['result'])) {
      switch ($_GET['result']) {
        case 'successful_user_update':
          echo '<p class="notification notification-green">Успешное обновление данных пользователя!</p>';
          break;
        default:
          echo '<p class="notification notification-red">Неизвестный результат!</p>';
          break;
      }
    }

    if (isset($_GET['error'])) {
      switch ($_GET['error']) {
        case 'error_user_update':
          echo '<p class="notification notification-red">Ошибка обновления данных пользователя!</p>';
          break;
        default:
          echo '<p class="notification notification-red">Неизвестная ошибка!</p>';
          break;
      }
    }
  ?>
  <div class="flex flex-row flex-start block-arrow-back">
    <p id="btn-return" class="icon-button">←</p>
  </div>
  <h2>Настройки пользователя</h2>
  <p class="role-user"><?php echo $_SESSION['role'] ?></p>
  <div class="user-data flex flex-row flex-center">
    <?php
    if (isset($_SESSION['path_to_image']) && $_SESSION['path_to_image'] != 'null') {
      echo '<img class="image_user" src="'. $_SESSION['path_to_image'] .'" alt="Пользователь">';
    } else {
      echo '<img src="./static/svg/human-dark.svg" alt="Пользователь">';
    }
    ?>
    <form class="form flex flex-column flex-start" action="/controllers/controller_handler.php?edit_user&id_user=<?php echo $_SESSION['id'] ?>" method="post" enctype="multipart/form-data">
      <input type="text" placeholder="Логин" id="login" name="login" value="<?php echo $_SESSION['login'] ?>" required>
      <input type="hidden" name="role" value="<?php echo $_SESSION['role'] ?>">
      <input type="text" placeholder="Почта" id="email" name="email" value="<?php echo $_SESSION['email'] ?>" required>
      <input type="file" name="image" accept="image/*" title="Автар пользователя" required>
      <div class="flex flex-row">
        <button class="button-default" type="submit" id="btn-confirm">Сохранить</button>
        <button class="button-default" type="button" id="btn-change-password">Изменить пароль</button>
      </div>
    </form>
  </div>
</main>
<script type="module" src="./modules/user/user.js" defer></script>
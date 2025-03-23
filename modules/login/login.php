<?php
if (isset($_SESSION['login']) && isset($_SESSION['role']) && isset($_SESSION['token'])) {
  header('Location: /?module=account');
}
?>
<main id="module" class="module open-module">
  <div class="flex flex-column flex-center">
    <a href="/"><img src="./static/svg/logo-dark.svg" alt="logo" class="logo" id="logo"></a>
  </div>
  <div class="flex flex-column flex-center">
    <?php
    if (isset($_GET['error'])) {
      switch ($_GET['error']) {
        case 'user_does_not_exist':
          echo '<p class="text-error">Пользователь не зарегистрирован!</p>';
          break;
        default:
          echo '<p class="text-error">Неизвестная ошибка!</p>';
          break;
      }
    }
    ?>
    <form class="flex flex-column flex-start form" action="/controllers/controller_handler.php?login_user" method="post" id="form">
      <input type="text" placeholder="Логин" name="login" id="input-login" required>
      <input type="password" placeholder="Пароль" name="password" id="input-password" required>
      <button class="button-default" type="button" id="btn-confirm">Войти</button>
    </form>
    <p id="link-registration" class="link">Зарегистрироваться</p>
    <p id="link-password-recovery" class="link">Восстановление пароля</p>
  </div>
</main>
<script type="module" src="./modules/login/login.js" defer></script>
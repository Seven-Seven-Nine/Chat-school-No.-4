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
        case 'user_is_registered':
          echo '<p class="text-error">Пользователь уже зарегистрирован!</p>';
          break;
        default:
          echo '<p class="text-error">Неизвестная ошибка!</p>';
          break;
      }
    }
    ?>
    <form class="flex flex-column flex-start form" action="/controllers/controller_handler.php?create_user" method="post" id="form">
      <input type="text" placeholder="Логин" name="login" id="input-login" required>
      <input type="email" placeholder="Почта" name="email" id="input-email" required>
      <input type="password" placeholder="Пароль" name="password" id="input-password" required>
      <input type="password" placeholder="Повторите пароль" id="input-re-password" required>
      <button class="button-default" type="button" id="btn-confirm">Создать аккаунт</button>
    </form>
    <p class="link" id="link-login">Авторизация</p>
  </div>
</main>
<script type="module" src="./modules/registration/registration.js" defer></script>
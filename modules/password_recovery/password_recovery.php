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
    <form class="flex flex-column flex-center form" action="" method="post" id="form">
      <input type="email" name="email" placeholder="Почта" id="input-email" required>
      <button class="button-default" type="button" id="btn-confirm">Восстановить</button>
    </form>
    <p class="link" id="link-login">Авторизация</p>
  </div>
</main>
<script type="module" src="./modules/password_recovery/password_recovery.js" defer></script>
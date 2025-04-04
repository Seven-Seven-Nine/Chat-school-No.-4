<?php
if (!isset($_SESSION['login']) && !isset($_SESSION['role']) && !isset($_SESSION['token'])) {
  header('Location: /?module=error');
}
?>
<main class="module open-module">
  <h3>Модуль настроек</h3>
</main>
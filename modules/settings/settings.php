<?php
if (!isset($_SESSION['login']) && !isset($_SESSION['role']) && !isset($_SESSION['token'])) {
  header('Location: /?module=error');
}
?>
<link rel="stylesheet" href="./modules/settings/settings.css">
<main id="module" class="module open-module flex flex-column flex-start">
  <div class="flex flex-row flex-start block-arrow-back">
    <p id="btn-return" class="icon-button">←</p>
  </div>
  <h2>Настройки</h2>
  <div class="flex flex-row flex-start menu">
    <div class="block-icons flex flex-column flex-center">
      <div id="btn-open-block-color" class="icon-button btn flex flex-row flex-center">
        <p>Цвета</p>
      </div>
      <div id="btn-open-block-background" class="icon-button btn flex flex-row flex-center">
        <p>Задний фон</p>
      </div>
      <div id="btn-open-block-speed-animations" class="icon-button btn flex flex-row flex-center">
        <p>Скорость анимации</p>
      </div>
      <div id="btn-open-block-recovery" class="icon-button btn flex flex-row flex-center">
        <p>Восстановление</p>
      </div>
    </div>
    <div class="block-settings">
      <!-- Цвета -->
      <div class="open-block block flex flex-column flex-start" id="block-settings-color">
        <h3>Цвета</h3>
      </div>

      <!-- Задний фон -->
      <div class="display-none block flex flex-column flex-start" id="block-settings-background">
        <h3>Задний фон</h3>
      </div>

      <!-- Скорость анимации -->
      <div class="display-none block flex flex-column flex-start" id="block-settings-speed-animations">
        <h3>Скорость анимации</h3>
      </div>

      <!-- Восстановление настроек по умолчанию -->
      <div class="display-none block flex flex-column flex-start" id="block-settings-recovery">
        <h3>Восстановление по умолчанию</h3>
      </div>
    </div>
  </div>
</main>
<script type="module" src="./modules/settings/settings.js" defer></script>
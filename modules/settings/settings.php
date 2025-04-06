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
    <div class="block-icons flex flex-column flex-start">
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
        <div class="flex flex-row flex-start setting-point">
          <p>Акцент: </p>
          <input class="input-color" type="color" value="#0E78F1" id="input-accent-color">
        </div>
        <div class="flex flex-row flex-start setting-point">
          <p>Границы: </p>
          <input class="input-color" type="color" value="#000000" id="input-border-color">
        </div>
        <div class="flex flex-row flex-start setting-point">
          <p>Текст: </p>
          <input class="input-color" type="color" value="#000000" id="input-text-color">
        </div>
        <div class="flex flex-row flex-start setting-point">
          <p>Ссылки: </p>
          <input class="input-color" type="color" value="#E13CF7" id="input-link-color">
        </div>
      </div>

      <!-- Задний фон -->
      <div class="display-none block flex flex-column flex-start block-background" id="block-settings-background">
        <h3>Задний фон</h3>
        <div class="block-background-selection flex flex-row flex-wrap flex-center">
          <img src="./static/images/wallpaper_1.webp" alt="Фоновое изображение" id="img-wallpaper-one">
          <img src="./static/images/wallpaper_2.webp" alt="Фоновое изображение" id="img-wallpaper-second">
          <img src="./static/images/wallpaper_3.webp" alt="Фоновое изображение" id="img-wallpaper-third">
          <img src="./static/images/wallpaper_4.webp" alt="Фоновое изображение" id="img-wallpaper-fourth">
          <img src="./static/images/wallpaper_5.webp" alt="Фоновое изображение" id="img-wallpaper-fifth">
          <img src="./static/images/wallpaper_6.webp" alt="Фоновое изображение" id="img-wallpaper-sixth">
        </div>
      </div>

      <!-- Скорость анимации -->
      <div class="display-none block flex flex-column flex-start" id="block-settings-speed-animations">
        <h3>Скорость анимации</h3>
      </div>

      <!-- Восстановление настроек по умолчанию -->
      <div class="display-none block flex flex-column flex-start block-recovery" id="block-settings-recovery">
        <h3>Восстановление по умолчанию</h3>
        <div class="block-for-icon-reset flex flex-row flex-center">
          <img class="icon-button icon-reset" title="Восстановить" src="./static/svg/icon-reset-dark.svg" alt="Сбросить" id="btn-recovery">
        </div>
      </div>

    </div>
  </div>
</main>
<script type="module" src="./modules/settings/settings.js" defer></script>
<script type="module" src="./modules/settings/settings_color.js" defer></script>
<script type="module" src="./modules/settings/settings_background.js" defer></script>
<script type="module" src="./modules/settings/settings_recovery.js" defer></script>

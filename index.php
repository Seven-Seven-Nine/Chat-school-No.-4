<?php session_start() ?>
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="shortcut icon" href="./static/svg/favicon.svg" type="image/x-icon">
  <link rel="stylesheet" href="./static/styles/style.css">
  <script type="module" src="./static/scripts/applyingSavedValues.js" defer></script>
  <title>Chat school No. 4</title>
</head>
<body>
  <?php
    if (isset($_GET['module'])) {
      match ($_GET['module']) {
        'login' => require_once './modules/login/login.php',
        'registration' => require_once './modules/registration/registration.php',
        'password_recovery' => require_once './modules/password_recovery/password_recovery.php',
        'account' => require_once './modules/account/account.php',
        'admin_panel' => require_once './modules/admin_panel/admin_panel.php',
        'edit_news' => require_once './modules/edit_news/edit_news.php',
        'edit_update' => require_once './modules/edit_update/edit_update.php',
        'edit_user' => require_once './modules/edit_user/edit_user.php',
        'user' => require_once './modules/user/user.php',
        'settings' => require_once './modules/settings/settings.php',
        default => require_once './modules/module_error/module_error.php',
      };
    } else {
      require_once './modules/screensaver/screensaver.php';
    }
  ?>
</body>
</html>
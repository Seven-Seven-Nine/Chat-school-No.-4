<?php
if (!isset($_SESSION['login']) && !isset($_SESSION['role']) && !isset($_SESSION['token'])) {
  header('Location: /?module=error');
} else {
  if ($_SESSION['role'] != 'administrator') {
    header('Location: /?module=error');
  }
}

require_once $_SERVER['DOCUMENT_ROOT'] . '/models/User.php';

$user = new User($_GET['id_user'], null, null, null, null, null);
$data_user = $user->get_user_by_id();

$login_user = '';
$role_user = '';
$email_user = '';

if (!empty($data_user)) {
  foreach ($data_user as $item) {
    $login_user = $item['login'];
    $role_user = $item['role'];
    $email_user = $item['email'];
  }
} else {
  echo '<p class="notification notification-red">Обновление не найдено!</p>';
}
?>
<link rel="stylesheet" href="/modules/edit_user/edit_user.css">
<main id="module" class="module open-module flex flex-column flex-start">
  <div class="flex flex-row flex-start block-arrow-back">
    <p id="btn-return" class="icon-button">←</p>
  </div>
  <h2>Редактирование пользователя</h2>
  <form class="form flex flex-column flex-center" action="/controllers/controller_handler.php?edit_user&id_user=<?php echo $_GET['id_user'] ?>" method="post">
    <input type="text" name="login"  placeholder="Логин" value="<?php echo $login_user?>" required>
    <input type="text" name="role" placeholder="Роль" value="<?php echo $role_user ?>" required>
    <input type="text" name="email" placeholder="Почта" value="<?php echo $email_user ?>" required>
    <div class="flex flex-row flex-center">
      <button class="button-default" type="submit">Изменить</button>
      <button id="btn-delete" class="button-default button-delete" type="button">Удалить</button>
    </div>
  </form>
</main>
<script type="module" src="/modules/edit_user/edit_user.js" defer></script>
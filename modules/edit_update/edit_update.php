<?php
if (!isset($_SESSION['login']) && !isset($_SESSION['role']) && !isset($_SESSION['token'])) {
  header('Location: /?module=error');
} else {
  if ($_SESSION['role'] != 'administrator') {
    header('Location: /?module=error');
  }
}

require_once $_SERVER['DOCUMENT_ROOT'] . '/models/Update.php';

$update = new Update($_GET['id_update'], null, null, null, null);
$data_update = $update->get_update_by_id();

$title_update = '';
$date_update = '';
$text_update = '';

if (!empty($data_update)) {
  foreach ($data_update as $item) {
    $title_update = $item['title'];
    $date_update = $item['date'];
    $text_update = $item['text'];
  }
} else {
  echo '<p class="notification notification-red">Обновление не найдено!</p>';
}
?>
<link rel="stylesheet" href="/modules/edit_update/edit_update.css">
<main id="module" class="module open-module flex flex-column flex-start">
  <div class="flex flex-row flex-start block-arrow-back">
    <p id="btn-return" class="icon-button">←</p>
  </div>
  <h2>Редактирование записей обновлений</h2>
  <form class="form flex flex-column flex-center" action="/controllers/controller_handler.php?edit_update&id_update=<?php echo $_GET['id_update'] ?>" method="post">
    <input type="text" name="title"  placeholder="Заголовок" value="<?php echo $title_update?>">
    <div class="double-field flex flex-row flex-center">
      <input type="text" placeholder="Дата" value="<?php echo $date_update ?>">
      <input type="date" name="date">
    </div>
    <textarea name="text" placeholder="Текст"><?php echo $text_update ?></textarea>
    <div class="flex flex-row flex-center">
      <button class="button-default" type="submit">Изменить</button>
      <button id="btn-delete" class="button-default button-delete" type="button">Удалить</button>
    </div>
  </form>
</main>
<script type="module" src="/modules/edit_update/edit_update.js" defer></script>
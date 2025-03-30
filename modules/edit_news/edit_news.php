<?php
if (!isset($_SESSION['login']) && !isset($_SESSION['role']) && !isset($_SESSION['token'])) {
  header('Location: /?module=error');
} else {
  if ($_SESSION['role'] != 'administrator') {
    header('Location: /?module=error');
  }
}

require_once $_SERVER['DOCUMENT_ROOT'] . '/models/News.php';

$news = new News($_GET['id_news'], null, null, null, null);
$data_news = $news->get_news_by_id();

$title_news = '';
$date_news = '';
$text_news = '';

if (!empty($data_news)) {
  foreach ($data_news as $item) {
    $title_news = $item['title'];
    $date_news = $item['date'];
    $text_news = $item['text'];
  }
} else {
  echo '<p class="notification notification-red">Новость не найдена!</p>';
}
?>
<link rel="stylesheet" href="/modules/edit_news/edit_news.css">
<main id="module" class="module open-module flex flex-column flex-start">
  <div class="flex flex-row flex-start block-arrow-back">
    <p id="btn-return" class="icon-button">←</p>
  </div>
  <h2>Редактирование новости</h2>
  <form class="form flex flex-column flex-center" action="/controllers/controller_handler.php?edit_news&id_news=<?php echo $_GET['id_news'] ?>" method="post">
    <input type="text" name="title"  placeholder="Заголовок" value="<?php echo $title_news ?>">
    <div class="double-field flex flex-row flex-center">
      <input type="text" placeholder="Дата" value="<?php echo $date_news ?>">
      <input type="date" name="date">
    </div>
    <textarea name="text"><?php echo $text_news ?></textarea>
    <div class="flex flex-row flex-center">
      <button class="button-default" type="submit">Изменить</button>
      <button id="btn-delete" class="button-default button-delete" type="button">Удалить</button>
    </div>
  </form>
</main>
<script type="module" src="/modules/edit_news/edit_news.js" defer></script>
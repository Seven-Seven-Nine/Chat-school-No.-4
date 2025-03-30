<?php

require_once $_SERVER['DOCUMENT_ROOT'] . '/models/News.php';

class NewsController {
  public static function add_news(): void {
    $title = $_POST['title'];
    $date = $_POST['date'];
    $text = $_POST['text'];

    $news = new News(null, $_SESSION['id'], $title, $date, $text);
    
    try {
      $news->create();
      header('Location: /?module=admin_panel&result=successful_addition_news');
    } catch (\Throwable $th) {
      echo $th;
      header('Location: /?module=admin_panel&error=error_adding_news');
    }
  }

  public static function edit_news(): void {
    $id_news = $_GET['id_news'];
    $title = $_POST['title'];

    if (!isset($_POST['date'])) {
      $date = null;
    } else {
      $date = $_POST['date'];
    }
    $text = $_POST['text'];

    $news = new News($id_news, $_SESSION['id'], $title, $date, $text);

    try {
      $news->edit();

      header('Location: /?module=admin_panel&result=successful_news_editing');
    } catch (\Throwable $th) {
      echo $th;
      header('Location: /?module=admin_panel&error=error_editing_news');
    }
  }

  public static function delete_news(): void {
    $id_news = $_GET['id_news'];

    try {
      $news = new News($id_news, $_SESSION['id'], null, null, null);
      $news->delete();
      header('Location: /?module=admin_panel&result=successful_news_deletion');
    } catch (\Throwable $th) {
      echo $th;
      header('Location: /?module=admin_panel&error=news_deletion_error');
    }

    echo '
      <p>Удаление новостей!</p>
      <p>id_news: '. $id_news.'</p>
    ';
  }
}
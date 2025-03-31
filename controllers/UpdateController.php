<?php

require_once $_SERVER['DOCUMENT_ROOT'] . '/models/Update.php';

class UpdateController {
  public static function add_update(): void {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $title = $_POST['title'];
      $date = $_POST['date'];
      $text = $_POST['text'];
  
      $update = new Update(null, $_SESSION['id'], $title, $date, $text);
  
      try {
        $update->save();
        header('Location: /?module=admin_panel&result=successful_addition_updates');
      } catch (\Throwable $th) {
        echo $th;
        header('Location: /?module=admin_panel&result=error_adding_updates');
      }
    }
  }

  public static function edit_update(): void {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $id_update = $_GET['id_update'];
      $title = $_POST['title'];
      $date = $_POST['date'];
      $text = $_POST['text'];
  
      $update = new Update($id_update, $_SESSION['id'], $title, $date, $text);
  
      try {
        $update->update();
        header('Location: /?module=admin_panel&result=successful_update_update');
      } catch (\Throwable $th) {
        echo $th;
        header('Location: /?module=admin_panel&error=error_update_update');
      }
    }
  }

  public static function delete_update(): void {
    if ($_SESSION['role'] == 'administrator') {
      $id_update = $_GET['id_update'];

      $update = new Update($id_update, null, null, null, null);

      try {
        $update->delete();
        header('Location: /?module=admin_panel&result=successful_update_deletion');
      } catch (\Throwable $th) {
        echo $th;
        header('Location: /?module=admin_panel&error=error_deletion_updates');
      }
    } else {
      header('Location: /?module=not_an_administrator');
    }
  }
}
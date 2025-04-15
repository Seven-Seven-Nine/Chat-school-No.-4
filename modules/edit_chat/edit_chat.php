<?php
if (!isset($_SESSION['login']) && !isset($_SESSION['role']) && !isset($_SESSION['token'])) {
  header('Location: /?module=error');
} else {
  if ($_SESSION['role'] != 'administrator') {
    header('Location: /?module=error');
  }
}
?>
<link rel="stylesheet" href="/modules/edit_chat/edit_chat.css">
<main id="module" class="module open-module flex flex-column flex-start">
  <div class="flex flex-row flex-start block-arrow-back">
    <p id="btn-return" class="icon-button">←</p>
  </div>
  <h2>Редактирование чата</h2>
  <form class="form flex flex-column flex-center" action="" method="post" enctype="multipart/form-data">

  </form>
</main>
<script type="module" src="/modules/edit_chat/edit_chat.js" defer></script>
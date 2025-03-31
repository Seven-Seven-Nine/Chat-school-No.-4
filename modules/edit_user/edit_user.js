'use strict';

import moduleTransition from '../../static/scripts/moduleTransition.js';

function editUser() {
  bindEvent();
}

function bindEvent() {
  document.getElementById('btn-return').onclick = () => handlerBtnReturn();
  document.getElementById('btn-delete').onclick = () => handlerBtnDelete();
}

function handlerBtnReturn() {
  moduleTransition(document.getElementById('module'), 'admin_panel');
}

function handlerBtnDelete() {
  const urlParams = new URLSearchParams(window.location.href);
  const idUser = urlParams.get('id_user');
  window.location = `/controllers/controller_handler.php?delete_user&id_user=${idUser}`;
}

editUser();
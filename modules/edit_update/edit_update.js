'use strict';

import moduleTransition from '../../static/scripts/moduleTransition.js';

function editUpdate() {
  bindEvent();
}

function bindEvent() {
  document.getElementById('btn-delete').onclick = () => handlerBtnDelete();
  document.getElementById('btn-return').onclick = () => handlerBtnReturn();
}

function handlerBtnReturn() {
  moduleTransition(document.getElementById('module'), 'admin_panel');
}

function handlerBtnDelete() {
  const urlParams = new URLSearchParams(window.location.href);
  const idUpdate = urlParams.get('id_update');
  window.location = `/controllers/controller_handler.php?delete_update&id_update=${idUpdate}`;
}

editUpdate();
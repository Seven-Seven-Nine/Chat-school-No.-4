'use strict';

import moduleTransition from '../../static/scripts/moduleTransition.js';

const module = document.getElementById('module');

function editNews() {
  bindEvent();
}

function bindEvent() {
  document.getElementById('btn-return').onclick = () => handlerBtnReturn();
  document.getElementById('btn-delete').onclick = () => handlerBtnDelete();
}

function handlerBtnReturn() {
  moduleTransition(module, 'admin_panel');
}

function handlerBtnDelete() {
  window.location = '/controllers/controller_handler.php?delete_news';
}

editNews();
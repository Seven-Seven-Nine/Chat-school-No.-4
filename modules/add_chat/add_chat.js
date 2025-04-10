import moduleTransition from '../../static/scripts/moduleTransition.js';

function add_chat() {
  bindEvent();
}

function bindEvent() {
  document.getElementById('btn-return').onclick = () => handlerBtnReturn();
}

function handlerBtnReturn() {
  moduleTransition(document.getElementById('module'), 'account');
}


add_chat();
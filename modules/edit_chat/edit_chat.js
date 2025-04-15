'use strict';

import moduleTransition from '../../static/scripts/moduleTransition.js';

function editChat() {
  bindEvent();
}

function bindEvent() {
  document.getElementById('btn-return').onclick = () => handlerBtnReturn();
}
  
function handlerBtnReturn() {
  moduleTransition(document.getElementById('module'), 'account');
}

editChat();
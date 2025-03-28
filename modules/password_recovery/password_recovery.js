'use strict';

import moduleTransition from "../../static/scripts/moduleTransition.js";

function passwordRecovery() {
  bindEvent();
}

function bindEvent() {
  document.getElementById('link-login').onclick = () => moduleTransition(document.getElementById('module'), 'login');
}

passwordRecovery();
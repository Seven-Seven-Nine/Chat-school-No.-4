'use strict';

import moduleTransition from "../../static/scripts/moduleTransition.js";

function screensaver() {
  setTimeout(() => {
    moduleTransition(document.getElementById('module'), 'login');
  }, 1500);
}

screensaver();
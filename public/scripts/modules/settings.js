'use strict';

import { applyColorTheme } from "../colorTheme.js";
import { applyModule } from "../module.js";
import { showNotification } from "../notifications.js";

function eventBinding() {
    document.getElementById('btn-return').onclick = () => applyModule('account');
    document.getElementById('light-theme').onclick = () => applyColorTheme('light-theme');
    document.getElementById('dark-theme').onclick = () => applyColorTheme('dark-theme');
}

eventBinding();
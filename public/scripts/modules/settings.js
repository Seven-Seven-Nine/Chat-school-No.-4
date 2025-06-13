'use strict';

import { applyModule } from "../module.js";
import { showNotification } from "../notifications.js";

function eventBinding() {
    document.getElementById('btn-return').onclick = () => applyModule('account');
}

showNotification('Данный модуль находится в разработке!', 'red');

eventBinding();
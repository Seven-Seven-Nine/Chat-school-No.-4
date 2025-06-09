'use strict';

import { changeColorTheme } from "../colorTheme.js";
import { applyModule } from "../module.js";

function eventBinding() {
    document.getElementById('logo').onclick = () => window.location.href = '/';
    document.getElementById('icon-change-theme').onclick = () => changeColorTheme();
    document.getElementById('btn-confirm').onclick = () => alert('Валидация формы.');
    document.getElementById('link-authorization').onclick = () => applyModule('authorization');
}

eventBinding();
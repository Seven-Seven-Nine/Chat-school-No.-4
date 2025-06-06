'use strict';

import { changeModule } from "./scripts/module.js";
import { changeColorTheme } from "./scripts/colorTheme.js";

function eventBinding() {
    document.getElementById('logo').onclick = () => window.location.href = '/';
    document.getElementById('icon-change-theme').onclick = () => changeColorTheme();
    document.getElementById('link-authorization').onclick = () => changeModule('authorization');
}

eventBinding();
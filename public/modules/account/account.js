'use strict';

import { changeModule, loadTemplate } from "./scripts/module.js";

function eventBinding() {
    document.getElementById('icon-side-menu').onclick = () => loadTemplate(document.getElementById('container-side-menu'), 'side-menu');
}

eventBinding();
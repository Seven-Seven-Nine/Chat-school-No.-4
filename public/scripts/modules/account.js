'use strict';

import { applySubmodule } from "../module.js";

function eventBinding() {
    document.getElementById('icon-side-menu').onclick = () => applySubmodule('side-menu', 'container-side-menu');
}

eventBinding();
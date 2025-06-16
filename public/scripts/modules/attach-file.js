'use strict';

import { deleteSpecificModuleScript } from "../module.js";
import { attachFile } from "../requests.js";
import { changeStyleAnimationElement } from "../template-element.js";

/** @type {HTMLInputElement} */ const inputFile = document.getElementById('input-attach-file');

function eventBinding() {
    document.getElementById('black-space').onclick = () => closeAttachFile();
    document.getElementById('btn-confirm-attach-file').onclick = async () => await saveFile();
}

async function closeAttachFile() {
    changeStyleAnimationElement('black-space', 'snow-black-space', 'hide-black-space');
    changeStyleAnimationElement('attach-file-submodule', 'show-submodule', 'hide-submodule');
    setTimeout(() => document.getElementById('container-attach-file').textContent = '', 400);
    await deleteSpecificModuleScript('/public/scripts/modules/attach-file.js');
}

async function saveFile() {
    const file = inputFile.files[0];

    if (!file) {
        showNotification('Файл не выбран!', 'red');
    } else {
        const formData = new FormData();
        formData.append('id_chat', window.localStorage.getItem('id_chat'));
        formData.append('file', file);
        if (await attachFile(formData)) {
            closeAttachFile();
        }
    }
}

eventBinding();
'use strict';

import { applyModule, deleteSpecificModuleScript } from "../module.js";
import { showNotification } from "../notifications.js";
import { saveUserAvatar } from "../requests.js";
import { changeStyleAnimationElement } from "../template-element.js";

/** @type {HTMLInputElement} */ const inputFile = document.getElementById('input-file');

function eventBinding() {
    document.getElementById('btn-return-choosing-user-avatar').onclick = () => closeChoosingUserAvatar();
    document.getElementById('btn-confirm-choosing-user-avatar').onclick = () => saveAvatar();
}

async function closeChoosingUserAvatar() {
    changeStyleAnimationElement('black-space', 'snow-black-space', 'hide-black-space');
    changeStyleAnimationElement('choosing-user-avatar', 'show-choosing-user-avatar', 'hide-choosing-user-avatar');
    setTimeout(() => document.getElementById('container-choosing-user-avatar').textContent = '', 400);
    await deleteSpecificModuleScript('/public/scripts/modules/choosing-user-avatar.js');
}

async function saveAvatar() {
    const file = inputFile.files[0];

    if (!file) {
        showNotification('Изображение не выбрано!', 'red');
    } else {
        const formData = new FormData();
        formData.append('image', file);
        if (await saveUserAvatar(formData)) {
            closeChoosingUserAvatar();
            showNotification('Изображение сохранено.', 'green');   
            applyModule('user');
        }
    }
}

eventBinding();
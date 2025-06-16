'use strict';

import { applySubmodule, deleteSpecificModuleScript } from "../module.js";
import { changeStyleAnimationElement } from "../template-element.js";
import { showModalConfirmationWindow } from "../modalWindow.js";
import { deleteMessage } from "../requests.js";
import { showNotification } from "../notifications.js";
import { receiveChatMessages } from "./account.js";

function eventBinding() {
    document.getElementById('black-space').onclick = async () => await closeChatMenu();
    document.getElementById('option-edit-message').onclick = async () => await editMessage();
    document.getElementById('option-delete-message').onclick = () => showModalConfirmationWindow('Удалить сообщение?', 'Да', 'Нет', async () => await requestDeleteMessage());
}

async function closeChatMenu() {
    changeStyleAnimationElement('black-space', 'snow-black-space', 'hide-black-space');
    changeStyleAnimationElement('chat-menu-submodule', 'show-submodule', 'hide-submodule');
    setTimeout(() => document.getElementById('container-message-menu').textContent = '', 400);
    await deleteSpecificModuleScript('/public/scripts/modules/message-menu.js');
}

async function editMessage() {
    await closeChatMenu();
    setTimeout(async () => await applySubmodule('edit-message', 'container-edit-message'), 400);
}

async function requestDeleteMessage() {
    if (await deleteMessage({'id_message': window.localStorage.getItem('id_message')})) {
        showNotification('Сообщение удалено.', 'green');
        await receiveChatMessages();
        await closeChatMenu();
    }
}

eventBinding();
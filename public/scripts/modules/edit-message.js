'use strict';

import { deleteSpecificModuleScript } from "../module.js";
import { showNotification } from "../notifications.js";
import { editMessage, getMessageData } from "../requests.js";
import { changeStyleAnimationElement } from "../template-element.js";
import { updateMessageChat } from "./account.js";

function eventBinding() {
    document.getElementById('submodule-return-edit-message-button').onclick = async () => await closeEditMessage();
    document.getElementById('black-space').onclick = async () => await closeEditMessage();
    document.getElementById('btn-confirm-edit-message').onclick = async () => await requestToEditMessage();
}

async function closeEditMessage() {
    changeStyleAnimationElement('black-space', 'snow-black-space', 'hide-black-space');
    changeStyleAnimationElement('edit-message-submodule', 'show-submodule', 'hide-submodule');
    setTimeout(() => document.getElementById('container-edit-message').textContent = '', 400);
    await deleteSpecificModuleScript('/public/scripts/modules/edit-message.js.js');
}

async function requestReceiveChatData() {
    const messageData = await getMessageData({'id_message': window.localStorage.getItem('id_message')});
    document.getElementById('title-message').innerHTML = `Редактирование сообщения №${messageData.id_message}`;
    document.getElementById('edit-message').value = messageData.text;
}

async function requestToEditMessage() {
    const requestData = {
        'id_message': window.localStorage.getItem('id_message'),
        'new_text': document.getElementById('edit-message').value
    };

    if (await editMessage(requestData)) {
        showNotification('Сообщение изменено.', 'green');
        await updateMessageChat();
        await closeEditMessage();
    }
}

requestReceiveChatData();
eventBinding();
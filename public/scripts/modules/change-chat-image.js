'use strict';

import { deleteSpecificModuleScript } from "../module.js";
import { showNotification } from "../notifications.js";
import { changeChatImage, loadingChat } from "../requests.js";
import { changeStyleAnimationElement } from "../template-element.js";

/** @type {HTMLInputElement} */ const inputFile = document.getElementById('input-file');

function eventBinding() {
    document.getElementById('submodule-return-change-chat-image-button').onclick = async () => await closeChangeChatImage();
    document.getElementById('black-space').onclick = async () => await closeChangeChatImage();
    document.getElementById('btn-confirm-change-chat-image').onclick = () => validatorChangeChatImageForm();
}

async function closeChangeChatImage() {
    changeStyleAnimationElement('black-space', 'snow-black-space', 'hide-black-space');
    changeStyleAnimationElement('change-chat-image-submodule', 'show-submodule', 'hide-submodule');
    setTimeout(() => document.getElementById('container-change-chat-image').textContent = '', 400);
    await deleteSpecificModuleScript('/public/scripts/modules/change-chat-image.js');
}

function validatorChangeChatImageForm() {
    let formValidationResult = [];
    const file = inputFile.files[0];

    if (!file) {
        showNotification('Изображение не выбрано!', 'red');
    } else {
        formValidationResult.push(true);   
    }

    if (formValidationResult.length === 1) requestToChangeChatImage(file);
}

async function requestToChangeChatImage(file) {
    const formData = new FormData();
    formData.append('id_chat', window.localStorage.getItem('id_chat'));
    formData.append('image', file);
    if (await changeChatImage(formData)) {
        showNotification('Изображение чата изменено.', 'green');
        await closeChangeChatImage();
        await updatingChatList();
        await closeChangeChatImage();
    }
}

async function updatingChatList() {
    const chatData = await loadingChat();
    if (chatData !== 'none') {
        const listChat = document.getElementById('list-chats');
        while (listChat.children.length > 1) {
            listChat.removeChild(listChat.lastChild);
        }
        for (const key in chatData) {
            if (key === 'result' || isNaN(Number(key))) continue;
            const chat = chatData[key];
            const containerChat = document.createElement('div');
            containerChat.innerHTML = `
                <img class="chat-image" src="${chat.path_to_image}" alt="Иконка">
                <p>${chat.title}</p>
            `;
            containerChat.classList.add('flex');
            containerChat.classList.add('flex-row');
            containerChat.classList.add('flex-start');
            containerChat.classList.add('chat');
            containerChat.onclick = () => openChat(chat.id_chat);
            listChat.appendChild(containerChat);
        }
    }
}

eventBinding();
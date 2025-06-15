'use strict';

import { deleteSpecificModuleScript } from "../module.js";
import { showNotification } from "../notifications.js";
import { creatingChat, loadingChat } from "../requests.js";
import { changeStyleAnimationElement } from "../template-element.js";
import { correctInput, incorrectInput } from "../validationForms.js";
import { openChat } from "./account.js";

/** @type {HTMLInputElement} */ const inputTitle = document.getElementById('input-title');
/** @type {HTMLInputElement} */ const inputFile = document.getElementById('input-file');

function eventBinding() {
    document.getElementById('black-space').onclick = () => closeCreatingChat();
    document.getElementById('submodule-return-chat-creation-button').onclick = () => closeCreatingChat();
    document.getElementById('btn-confirm-creation-chat').onclick = () => validatorCreatingChatForm();
}

async function closeCreatingChat() {
    changeStyleAnimationElement('black-space', 'snow-black-space', 'hide-black-space');
    changeStyleAnimationElement('chat-creation-submodule', 'show-submodule', 'hide-submodule');
    setTimeout(() => document.getElementById('container-chat-creation').textContent = '', 400);
    await deleteSpecificModuleScript('/public/scripts/modules/creating-chat.js');
}

function validatorCreatingChatForm() {
    let formValidationResult = [];
    const file = inputFile.files[0];

    if (inputTitle.value.length < 3) {
        incorrectInput(inputTitle, 'Короткий логин!');
    } else if (inputTitle.value.length > 49) {
        incorrectInput(inputTitle, 'Большой логин!');
    } else {
        correctInput(inputTitle, 'Логин');
        formValidationResult.push(true);
    }

    if (!file) {
        showNotification('Изображение не выбрано!', 'red');
    } else {
        formValidationResult.push(true);   
    }

    if (formValidationResult.length === 2) requestCreateChat(file);
}

async function requestCreateChat(file) {
    const formData = new FormData();
    formData.append('title', inputTitle.value);
    formData.append('image', file);
    if (await creatingChat(formData)) {
        await updatingChatList();
        closeCreatingChat();
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
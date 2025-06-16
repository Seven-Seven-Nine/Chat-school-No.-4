'use strict';

import { applySubmodule, deleteSpecificModuleScript } from "../module.js";
import { showNotification } from "../notifications.js";
import { changeChatTitle, getChatData, loadingChat } from "../requests.js";
import { changeStyleAnimationElement } from "../template-element.js";
import { correctInput, incorrectInput } from "../validationForms.js";
import { openChat } from "./account.js";

/** @type {HTMLInputElement} */ const inputChatTitle = document.getElementById('input-title-chat-settings');

function eventBinding() {
    document.getElementById('submodule-return-chat-settings-button').onclick = async () => await closeChatSettings();
    document.getElementById('black-space').onclick = async () => await closeChatSettings();
    document.getElementById('btn-confirm-chat-settings').onclick = () => validatorChatSettingsForm();
    document.getElementById('button-change-chat-image').onclick = async () => await changeChatImage();
}

function validatorChatSettingsForm() {
    let formValidationResult = [];

    if (inputChatTitle.value.length < 3) {
        incorrectInput(inputChatTitle, 'Короткое название чата!');
    } else if (inputChatTitle.value.length > 49) {
        incorrectInput(inputChatTitle, 'Большое название чата!');
    } else {
        correctInput(inputChatTitle, 'Название чата');
        formValidationResult.push(true);
    }

    if (formValidationResult.length === 1) requestToChangeChatTitle();
}

async function closeChatSettings() {
    changeStyleAnimationElement('black-space', 'snow-black-space', 'hide-black-space');
    changeStyleAnimationElement('chat-settings-submodule', 'show-submodule', 'hide-submodule');
    setTimeout(() => document.getElementById('container-chat-settings').textContent = '', 400);
    await deleteSpecificModuleScript('/public/scripts/modules/chat-settings.js');
}

async function requestToReceiveChatData() {
    const chatData = await getChatData({'id_chat': window.localStorage.getItem('id_chat')});
    document.getElementById('chat-title-settings-chat').innerHTML = chatData.title;
    document.getElementById('chat-image').src = chatData.path_to_image;
    document.getElementById('chat-creator').innerHTML = `Создатель чата: ${chatData.user_login}`;
    document.getElementById('input-title-chat-settings').value = chatData.title;
}

async function requestToChangeChatTitle() {
    const requestData = {
        'id_chat': window.localStorage.getItem('id_chat'),
        'new_title': document.getElementById('input-title-chat-settings').value
    };

    if (await changeChatTitle(requestData)) {
        showNotification('Название чата изменено.', 'green');
        await requestToReceiveChatData();
        await updatingChatList();
        await openChat(window.localStorage.getItem('id_chat'));
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

async function changeChatImage() {
    await closeChatSettings();
    setTimeout(async () => await applySubmodule('change-chat-image', 'container-change-chat-image'), 400);
}

requestToReceiveChatData();
eventBinding();
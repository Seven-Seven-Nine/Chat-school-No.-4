'use strict';

import { applySubmodule, deleteSpecificModuleScript } from "../module.js";
import { deleteChat, excludingUserFromChat, getChatData, getUserSession, loadingChat } from "../requests.js";
import { changeStyleAnimationElement } from "../template-element.js";
import { openChat } from "./account.js";
import { showModalConfirmationWindow } from "../modalWindow.js";

function eventBinding() {
    document.getElementById('black-space').onclick = async () => await closeChatMenu();
    document.getElementById('option-chat-settings').onclick = async () => await chatSettings();
    document.getElementById('option-add-user').onclick = async () => await addUser();
}

async function closeChatMenu() {
    changeStyleAnimationElement('black-space', 'snow-black-space', 'hide-black-space');
    changeStyleAnimationElement('chat-menu-submodule', 'show-submodule', 'hide-submodule');
    setTimeout(() => document.getElementById('container-chat-menu').textContent = '', 400);
    await deleteSpecificModuleScript('/public/scripts/modules/chat-menu.js');
}

async function addUser() {
    await closeChatMenu();
    setTimeout(async () => await applySubmodule('add-users', 'container-add-user'), 400);
}

async function addOptionExcludeUser() {
    const chatData = await getChatData({'id_chat': window.localStorage.getItem('id_chat')});
    const userSession = await getUserSession();
    if (chatData.user_login === userSession.login || userSession.role === 'administrator') {
        const option = document.createElement('div');
        option.classList.add('option');
        option.classList.add('width-100');
        option.classList.add('flex');
        option.classList.add('flex-row');
        option.classList.add('flex-center');
        option.innerHTML = '<p>Исключить пользователя</p>';
        option.onclick = async () => await excludeUser();
        document.getElementById('chat-menu-submodule').insertBefore(option, document.getElementById('chat-menu-submodule').children[1]);
    }
}

async function excludeUser() {
    await closeChatMenu();
    setTimeout(async () => await applySubmodule('exclude-user', 'container-exclude-user'), 400);
}

async function addOptionDeleteChat() {
    const chatData = await getChatData({'id_chat': window.localStorage.getItem('id_chat')});
    const userSession = await getUserSession();
    if (chatData.user_login === userSession.login || userSession.role === 'administrator') {
        const option = document.createElement('div');
        option.classList.add('option');
        option.classList.add('width-100');
        option.classList.add('flex');
        option.classList.add('flex-row');
        option.classList.add('flex-center');
        option.innerHTML = '<p>Удалить чат</p>';
        option.onclick = async () => showModalConfirmationWindow('Удалить чат?', 'Да', 'Нет', async () => await requestDeleteChat());
        document.getElementById('chat-menu-submodule').insertBefore(option, document.getElementById('chat-menu-submodule').children[3]);
    }
}

async function addOptionExitOfChat() {
    const chatData = await getChatData({'id_chat': window.localStorage.getItem('id_chat')});
    const userSession = await getUserSession();
    if (chatData.user_login !== userSession.login) {
        const option = document.createElement('div');
        option.classList.add('option');
        option.classList.add('width-100');
        option.classList.add('flex');
        option.classList.add('flex-row');
        option.classList.add('flex-center');
        option.innerHTML = '<p>Выйти из чата</p>';
        option.onclick = async () => showModalConfirmationWindow('Выйти из чата?', 'Да', 'Нет', async () => await requestExitOfChat());
        document.getElementById('chat-menu-submodule').insertBefore(option, document.getElementById('chat-menu-submodule').children[4]);
    }
}

async function chatSettings() {
    await closeChatMenu();
    setTimeout(async () => await applySubmodule('chat-settings', 'container-chat-settings'), 400);
}

async function requestDeleteChat() {
    if (await deleteChat({'id_chat': window.localStorage.getItem('id_chat')}))  {
        document.getElementById('chat-workspace').style.display = 'none';
        await updatingChatList();
        await closeChatMenu();
    }
}

async function requestExitOfChat() {
    const userSession = await getUserSession();
    const requestData = {
        'id_chat': window.localStorage.getItem('id_chat'),
        'login': userSession.login
    };
    
    if (excludingUserFromChat(requestData)) {
        await closeChatMenu();
        await updatingChatList();
        document.getElementById('chat-workspace').style.display = 'none';
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
    } else {
        const listChat = document.getElementById('list-chats');
        while (listChat.children.length > 1) {
            listChat.removeChild(listChat.lastChild);
        }
        const containerChatCreationBtn = document.createElement('div');
        containerChatCreationBtn.innerHTML = `
            <img src="/public/assets/icon-create.svg" alt="Иконка">
            <p>Создать чат</p>
        `;
        containerChatCreationBtn.classList.add('flex');
        containerChatCreationBtn.classList.add('flex-row');
        containerChatCreationBtn.classList.add('flex-center');
        containerChatCreationBtn.classList.add('chat');
        containerChatCreationBtn.onclick = () => applySubmodule('creating-chat', 'container-chat-creation');
        listChat.appendChild(containerChatCreationBtn);
    }
}

addOptionExcludeUser();
addOptionDeleteChat();
addOptionExitOfChat();
eventBinding();
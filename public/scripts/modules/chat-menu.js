'use strict';

import { applySubmodule, deleteSpecificModuleScript } from "../module.js";
import { deleteChat, loadingChat } from "../requests.js";
import { changeStyleAnimationElement } from "../template-element.js";
import { openChat } from "./account.js";
import { showModalConfirmationWindow } from "../modalWindow.js";

function eventBinding() {
    document.getElementById('black-space').onclick = () => closeChatMenu();
    document.getElementById('option-delete').onclick = () => showModalConfirmationWindow('Удалить чат?', 'Да', 'Нет', async () => await requestDeleteChat());
}

async function closeChatMenu() {
    changeStyleAnimationElement('black-space', 'snow-black-space', 'hide-black-space');
    changeStyleAnimationElement('chat-menu-submodule', 'show-submodule', 'hide-submodule');
    setTimeout(() => document.getElementById('container-chat-menu').textContent = '', 400);
    await deleteSpecificModuleScript('/public/scripts/modules/chat-menu.js');
}

async function requestDeleteChat() {
    if (await deleteChat({'id_chat': window.localStorage.getItem('id_chat')}))  {
        document.getElementById('chat-workspace').style.display = 'none';
        await updatingChatList();
        await closeChatMenu();
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

eventBinding();
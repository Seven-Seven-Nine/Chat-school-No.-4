'use strict';

import { applySubmodule } from "../module.js";
import { showNotification } from "../notifications.js";
import { loadingChat } from "../requests.js";

function eventBinding() {
    document.getElementById('icon-side-menu').onclick = () => applySubmodule('side-menu', 'container-side-menu');
    document.getElementById('icon-create-chat').onclick = async () => await applySubmodule('creating-chat', 'container-chat-creation');
}

async function getChats() {
    const chatData = await loadingChat();
    if (chatData !== 'none') {
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
            document.getElementById('list-chats').appendChild(containerChat);
        }
    } else {
        const containerChatCreationBtn = document.createElement('div');
        containerChatCreationBtn.innerHTML = `
            <img src="/public/assets/icon-create.svg" alt="Иконка">
            <p>Создать чат</p>
        `;
        containerChatCreationBtn.classList.add('flex');
        containerChatCreationBtn.classList.add('flex-row');
        containerChatCreationBtn.classList.add('flex-center');
        containerChatCreationBtn.classList.add('chat');
        containerChatCreationBtn.onclick = async () => await applySubmodule('creating-chat', 'container-chat-creation');
        document.getElementById('list-chats').appendChild(containerChatCreationBtn);
    }
}

function openChat(idChat) {
    showNotification(`Открыть чат ${idChat}`, 'blue');
}

getChats();
eventBinding();

export { openChat };
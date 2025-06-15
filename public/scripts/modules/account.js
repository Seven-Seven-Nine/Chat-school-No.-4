'use strict';

import { applySubmodule } from "../module.js";
import { showNotification } from "../notifications.js";
import { getAllChatMessages, getChatData, getNumberChatMessages, loadingChat, sendMessage } from "../requests.js";

const chatMessages = document.getElementById('chat-messages');

function eventBinding() {
    document.getElementById('icon-side-menu').onclick = () => applySubmodule('side-menu', 'container-side-menu');
    document.getElementById('icon-chat-menu').onclick = () => applySubmodule('chat-menu', 'container-chat-menu');
    document.getElementById('icon-create-chat').onclick = () => applySubmodule('creating-chat', 'container-chat-creation');
    document.getElementById('icon-push').onclick = () => requestToSendMessage();
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

async function openChat(idChat) {
    chatMessages.textContent = '';
    const chatData = await getChatData({ 'id_chat': idChat });
    document.getElementById('chat-workspace').style.display = 'block';
    document.getElementById('chat-title').innerHTML = `<h2>${chatData.title}</h2>`;
    window.localStorage.setItem('id_chat', idChat);
    await requestToReceiveChatMessages();
}

async function requestToReceiveChatMessages() {
    if (chatMessages.childElementCount !== await getNumberChatMessages({'id_chat': window.localStorage.getItem('id_chat')})) {
        chatMessages.textContent = '';
        const messageData = await getAllChatMessages({'id_chat': window.localStorage.getItem('id_chat')});
        for (const key in messageData) {
            if (key === 'result' || isNaN(Number(key))) continue;
            const message = messageData[key];
            const messageContainer = document.createElement('div');
            messageContainer.innerHTML = `
                <div class="user-avatar-block flex flex-row flex-center">
                    <img class="user-avatar-in-message" src="${message.path_to_avatar}" alt="Аватар пользователя">
                </div>
                <div class="message-data-block flex flex-column flex-center">
                    <p class="user-login-message">${message.login} | ${message.date}</p>
                    <p>${message.text}</p>
                </div>
            `;
            messageContainer.classList.add('message');
            messageContainer.classList.add('flex');
            messageContainer.classList.add('flex-row');
            messageContainer.classList.add('flex-start');
            chatMessages.appendChild(messageContainer);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }
}

async function requestToSendMessage() {
    const mainInput = document.getElementById('main-chat-input');
    if (mainInput.value !== '') {
        mainInput.placeholder = '...';
        if (await sendMessage({'id_chat': window.localStorage.getItem('id_chat'), 'text': mainInput.value})) {
            mainInput.value = '';
            await requestToReceiveChatMessages();
        }
    } else {
        mainInput.placeholder = 'Введите сообщение!';
    }
}

if (document.getElementById('list-chats').children.length < 2) {
    getChats();
}

eventBinding();

export { openChat };
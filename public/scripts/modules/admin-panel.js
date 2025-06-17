'use strict';

import { showModalConfirmationWindow } from "../modalWindow.js";
import { applyModule, applySubmodule } from "../module.js";
import { showNotification } from "../notifications.js";
import { deleteChat, getDataAllUsers, getUserSession, sendJSONRequest } from "../requests.js";
import { changeStyleAnimationElement } from "../template-element.js";

function eventBinding() {
    document.getElementById('btn-return').onclick = async () => await applyModule('account');
    document.getElementById('icon-news').onclick = async () => await openNews();
    document.getElementById('icon-chats').onclick = async () => await openChats();
    document.getElementById('icon-users').onclick = async () => await openUsers();
    document.getElementById('add-news').onclick = async () => await applySubmodule('add-news', 'container-submodule-admin-panel');
}

async function openNews() {
    changeStyleAnimationElement('block-news', 'hide-element', 'show-element', true);
    changeStyleAnimationElement('block-chats', 'show-element', 'hide-element', false);
    changeStyleAnimationElement('block-users', 'show-element', 'hide-element', false);
    await getNews();
}

async function openChats() {
    changeStyleAnimationElement('block-news', 'show-element', 'hide-element', false);
    changeStyleAnimationElement('block-chats', 'hide-element', 'show-element', true);
    changeStyleAnimationElement('block-users', 'show-element', 'hide-element', false);
    await getChats();
}

async function openUsers() {
    changeStyleAnimationElement('block-news', 'show-element', 'hide-element', false);
    changeStyleAnimationElement('block-chats', 'show-element', 'hide-element', false);
    changeStyleAnimationElement('block-users', 'hide-element', 'show-element', true);
    await getUsers();
}

async function requestForNews() {
    const response = await sendJSONRequest({}, '/api/news/get-news.php');
    if (response.result && response.result === 'news found successfully') return response;
    if (response.error) showNotification(response['error message'], 'red');
    return false;
}

async function getNews() {
    document.getElementById('list-news-cards').textContent = '';
    const newsData = await requestForNews();
    
    if (newsData) {
        for (const key in newsData) {
            if (key === 'result' || isNaN(Number(key))) continue;
            const news = newsData[key];
            const newsCard = document.createElement('div');
            newsCard.classList.add('card-news');
            newsCard.classList.add('flex');
            newsCard.classList.add('flex-column');
            newsCard.classList.add('flex-start');

            newsCard.innerHTML = `
                <h4>${news.title}</h4>
                <p>${news.text}</p>
            `;

            newsCard.onclick = async () => {
                window.localStorage.setItem('id_news', news.id_news);
                await applySubmodule('edit-news', 'container-submodule-admin-panel')
            };

            document.getElementById('list-news-cards').appendChild(newsCard);
        }
    }
}

async function getChats() {
    document.getElementById('list-all-chats').textContent = '';
    const chatsData = await requestGetChats();
    
    if (chatsData) {  
        for (const key in chatsData) {
            if (key === 'result' || isNaN(Number(key))) continue;
            const chat = chatsData[key];
            
            const chatContainer = document.createElement('div');
            chatContainer.classList.add('container-admin-chat');
            chatContainer.classList.add('flex');
            chatContainer.classList.add('flex-row');
            chatContainer.classList.add('flex-start');

            chatContainer.innerHTML = `
                <p>Чат: ${chat.title} | ID: ${chat.id_chat} | ID user: ${chat.id_user}</p> 
            `;

            chatContainer.onclick = () => showModalConfirmationWindow('Удалить чат?', 'Да', 'Нет', async () => await requestDeleteChat(chat.id_chat));

            document.getElementById('list-all-chats').appendChild(chatContainer);
        }
    }
}

async function requestGetChats() {
    const response = await sendJSONRequest({}, '/api/chat/get-all-chats.php');
    if (response.result && response.result === 'chats found successfully') return response;
    if (response.error) showNotification(response['error message'], 'red');
    return false;
}

async function requestDeleteChat(idChat) {
    if (await deleteChat({'id_chat': idChat}))  {
        await applyModule('admin-panel');
    }
}

async function getUsers() {
    document.getElementById('list-all-users').textContent = '';
    const usersData = await getDataAllUsers();

    if (usersData) {  
        for (const key in usersData) {
            if (key === 'result' || isNaN(Number(key))) continue;
            const user = usersData[key];
            
            const userContainer = document.createElement('div');
            userContainer.classList.add('container-admin-user');
            userContainer.classList.add('flex');
            userContainer.classList.add('flex-row');
            userContainer.classList.add('flex-start');

            userContainer.innerHTML = `
                <p>Логин пользователя: ${user.login} | ID: ${user.id_user} | Почта: ${user.email}</p> 
            `;

            userContainer.onclick = () => showModalConfirmationWindow('Удалить пользователя?', 'Да', 'Нет', async () => deleteUser(user.id_user));

            document.getElementById('list-all-users').appendChild(userContainer);
        }
    }
}

async function deleteUser(idUser) {
    if (await requestDeleteUser(idUser)) {
        await applyModule('admin-panel');
    }
}

async function requestDeleteUser(id_user) {
    const response = await sendJSONRequest({'id_user': id_user}, '/api/user/user-delete.php');
    if (response.result && response.result === 'the user has been successfully deleted') return true;
    if (response.error) showNotification(response['error message'], 'red');
    return false;
}

eventBinding();
getNews();
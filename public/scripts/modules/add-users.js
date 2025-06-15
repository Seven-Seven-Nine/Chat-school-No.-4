'use strict';

import { showModalConfirmationWindow } from "../modalWindow.js";
import { deleteSpecificModuleScript } from "../module.js";
import { showNotification } from "../notifications.js";
import { addUserChat, getDataAllUsers, getUserSession, userSearch } from "../requests.js";
import { changeStyleAnimationElement } from "../template-element.js";

function eventBinding() {
    document.getElementById('black-space').onclick = async () => await closeAddUsers();
    document.getElementById('icon-search').onclick = async () => await userSearchQuery();
}

async function closeAddUsers() {
    changeStyleAnimationElement('black-space', 'snow-black-space', 'hide-black-space');
    changeStyleAnimationElement('add-user-submodule', 'show-submodule', 'hide-submodule');
    setTimeout(() => document.getElementById('container-add-user').textContent = '', 400);
    await deleteSpecificModuleScript('/public/scripts/modules/add-users.js');
}

async function getListOfUsers() {
    const listUsers = document.getElementById('list-users');
    listUsers.textContent = '';
    const usersData = await getDataAllUsers();
    const userSession = await getUserSession();
    for (const key in usersData) {
        if (key === 'result' || isNaN(Number(key))) continue;
        const user = usersData[key];

        if (user.login === userSession.login) continue;
  
        const userContainer = document.createElement('div');

        let pathToAvatar = '/public/assets/icon-user.svg';
        let listClasses = '';

        if (user.path_to_avatar !== 'none') {
            pathToAvatar = user.path_to_avatar;
            listClasses = 'avatar';
        } else {
            listClasses = 'none-avatar';
        }

        userContainer.innerHTML = `
            <img class="${listClasses}" src="${pathToAvatar}" alt="Аватар пользователя">
            <p>${user.login}</p>
        `;
        userContainer.classList.add('user');
        userContainer.classList.add('flex');
        userContainer.classList.add('flex-row');
        userContainer.classList.add('flex-start');
        userContainer.onclick = () => showModalConfirmationWindow(`Добавить пользователя ${user.login} в чат?`, 'Да', 'Нет', async () => await addUserToChat(user.login));
        listUsers.appendChild(userContainer);
    }
}

async function addUserToChat(login) {
    const requestData = {
        'login': login,
        'id_chat': window.localStorage.getItem('id_chat')
    };

    if (await addUserChat(requestData)) {
        showNotification(`Пользователь ${login} добавлен в чат!`, 'green');
    }
} 

async function userSearchQuery() {
    const listUsers = document.getElementById('list-users');
    listUsers.textContent = '';
    /** @type {HTMLInputElement} */ const inputSearchUser = document.getElementById('input-search-user');
    const foundUser = await userSearch({'login': inputSearchUser.value});
    const userSession = await getUserSession();
    for (const key in foundUser) {
        if (key === 'result' || isNaN(Number(key))) continue;
        const user = foundUser[key];

        if (user.login === userSession.login) continue;
  
        const userContainer = document.createElement('div');

        let pathToAvatar = '/public/assets/icon-user.svg';
        let listClasses = '';

        if (user.path_to_avatar !== 'none') {
            pathToAvatar = user.path_to_avatar;
            listClasses = 'avatar';
        } else {
            listClasses = 'none-avatar';
        }

        userContainer.innerHTML = `
            <img class="${listClasses}" src="${pathToAvatar}" alt="Аватар пользователя">
            <p>${user.login}</p>
        `;
        userContainer.classList.add('user');
        userContainer.classList.add('flex');
        userContainer.classList.add('flex-row');
        userContainer.classList.add('flex-start');
        userContainer.onclick = () => showModalConfirmationWindow(`Добавить пользователя ${user.login} в чат?`, 'Да', 'Нет', async () => await addUserToChat(user.login));
        listUsers.appendChild(userContainer);
    }
}

getListOfUsers();
eventBinding();
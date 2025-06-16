'use strict';

import { showModalConfirmationWindow } from "../modalWindow.js";
import { deleteSpecificModuleScript } from "../module.js";
import { showNotification } from "../notifications.js";
import { excludingUserFromChat, getChatData, getChatUsers } from "../requests.js";
import { changeStyleAnimationElement } from "../template-element.js";

function eventBinding() {
    document.getElementById('black-space').onclick = async () => await closeExcludeUser();
}

async function closeExcludeUser() {
    changeStyleAnimationElement('black-space', 'snow-black-space', 'hide-black-space');
    changeStyleAnimationElement('exclude-user-submodule', 'show-submodule', 'hide-submodule');
    setTimeout(() => document.getElementById('container-exclude-user').textContent = '', 400);
    await deleteSpecificModuleScript('/public/scripts/modules/exclude-user.js');
}

async function getListChatUsers() {
    const chatData = await getChatData({'id_chat': window.localStorage.getItem('id_chat')});
    const chatUserData = await getChatUsers({'id_chat': window.localStorage.getItem('id_chat')});
    const listUsers = document.getElementById('list-users-to-exclude');
    listUsers.textContent = '';
    for (const key in chatUserData) {
        if (key === 'result' || isNaN(Number(key))) continue;
        const user = chatUserData[key];

        if (user.login === chatData.user_login) continue;
  
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
        userContainer.onclick = () => showModalConfirmationWindow(`Исключить пользователя ${user.login} из чата?`, 'Да', 'Нет', async () => await requestToExcludeUserFromChat(user.login));
        listUsers.appendChild(userContainer);
    }
}

async function requestToExcludeUserFromChat(login) {
    const requestData = {
        'id_chat': window.localStorage.getItem('id_chat'),
        'login': login
    };
    
    if (await excludingUserFromChat(requestData)) {
        showNotification(`Пользователь ${login} удалён.`, 'green');
        await getListChatUsers();
    }
}

getListChatUsers();
eventBinding();
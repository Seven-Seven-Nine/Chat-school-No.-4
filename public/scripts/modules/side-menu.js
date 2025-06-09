'use strict';

import { showModalConfirmationWindow } from "../modalWindow.js";
import { applyModule, deleteSpecificModuleScript } from "../module.js";
import { showNotification } from "../notifications.js";
import { getUserSession, logout } from "../requests.js";

function eventBinding() {
    document.getElementById('icon-close').onclick = () => closeSideMenu();
    document.getElementById('btn-exit').onclick = () => exit();
}

async function closeSideMenu() {
    changeStyleAnimationElement('black-space', 'snow-black-space', 'hide-black-space');
    changeStyleAnimationElement('side-menu', 'open-side-menu', 'close-side-menu');
    changeStyleAnimationElement('information-panel', 'snow-information-panel', 'hide-information-panel');
    setTimeout(() => document.getElementById('container-side-menu').textContent = '', 600);
    await deleteSpecificModuleScript('/public/scripts/modules/side-menu.js');
}

function changeStyleAnimationElement(idElement, oldStyleAnimation, newStyleAnimation) {
    let element = document.getElementById(idElement);
    element.classList.remove(oldStyleAnimation);
    element.classList.add(newStyleAnimation);
}

function exit() {
    showModalConfirmationWindow('Выйти из аккаунта?', 'Да', 'Нет', async () => {
        await logout();
        showNotification('Сессия удалена!', 'blue');
        applyModule('authorization');
    });
}

async function showUserData() {
    const userSession = await getUserSession();
    let userRole = '';

    if (userSession.role === 'user') {
        userRole = 'Пользователь';
    } else {
        userRole = 'Администратор';
        addAdminPanelBtn(userSession.role);
    }

    if (userSession['path_to_avatar'] !== 'none') {
        document.getElementById('avatar-user').src = userSession['path_to_avatar'];
    }

    document.getElementById('user-login').innerHTML = `${userRole} ${userSession.login}`;
    document.getElementById('user-email').innerHTML = userSession.email;
}

function addAdminPanelBtn(userRole) {
    if (userRole === 'administrator') {
        const adminPanelBtn = document.createElement('button');
        adminPanelBtn.classList.add('button-side-menu');

        adminPanelBtn.innerHTML = '<img src="/public/assets/icon-administrator.svg" alt="Иконка">Админ-панель';

        const sideMenu = document.getElementById('side-menu');
        const firstBtn = sideMenu.firstChild;
        sideMenu.insertBefore(adminPanelBtn, firstBtn)
    }
}

eventBinding();
showUserData();
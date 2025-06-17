'use strict';

import { showModalConfirmationWindow } from "../modalWindow.js";
import { applyModule, deleteSpecificModuleScript } from "../module.js";
import { showNotification } from "../notifications.js";
import { getUserSession, logout, sendJSONRequest } from "../requests.js";
import { changeStyleAnimationElement } from "../template-element.js";

function eventBinding() {
    document.getElementById('icon-close').onclick = () => closeSideMenu();
    document.getElementById('btn-user').onclick = () => applyModule('user');
    document.getElementById('btn-settings').onclick = () => applyModule('settings');
    document.getElementById('btn-exit').onclick = () => exit();
}

async function closeSideMenu() {
    changeStyleAnimationElement('black-space', 'snow-black-space', 'hide-black-space');
    changeStyleAnimationElement('side-menu', 'open-side-menu', 'close-side-menu');
    changeStyleAnimationElement('information-panel', 'snow-information-panel', 'hide-information-panel');
    setTimeout(() => document.getElementById('container-side-menu').textContent = '', 600);
    await deleteSpecificModuleScript('/public/scripts/modules/side-menu.js');
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
    const userRole = userSession.role === 'user' ? 'Пользователь' : 'Администратор';
    
    document.getElementById('user-login').innerHTML = `${userRole} ${userSession.login}`;
    document.getElementById('user-email').innerHTML = userSession.email;

    if (userSession['path_to_avatar'] !== 'none') {
        /** @type {HTMLImageElement} */ const avatar = document.getElementById('user-avatar');
        avatar.src = userSession['path_to_avatar'];
        avatar.classList.add('avatar-src');
    };
    if (userSession.role === 'administrator') addAdminPanelBtn(userSession.role);
}

function addAdminPanelBtn(userRole) {
    if (userRole === 'administrator') {
        const adminPanelBtn = document.createElement('button');
        adminPanelBtn.classList.add('button-side-menu');

        adminPanelBtn.innerHTML = '<img src="/public/assets/icon-administrator.svg" alt="Иконка">Админ-панель';

        const sideMenu = document.getElementById('side-menu');
        const firstBtn = sideMenu.firstChild;
        sideMenu.insertBefore(adminPanelBtn, firstBtn);

        adminPanelBtn.onclick = () => applyModule('admin-panel');
    }
}

function addCloseButtonForSmartphones() {
    if (screen.width < 720) {
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '<img class="button-close-side-menu" src="/public/assets/icon-close.svg" alt="Иконка">Закрыть';
        closeBtn.classList.add('button-side-menu');
        closeBtn.onclick = async () => await closeSideMenu();
        document.getElementById('side-menu').appendChild(closeBtn);
    }
}

async function getNewsForInformationPanel() {
    const newsData = await requestGetNewsForInformationPanel();
    
    if (newsData) {
        for (const key in newsData) {
            if (key === 'result' || isNaN(Number(key))) continue;
            const news = newsData[key];
            const newsUnit = document.createElement('div');
            newsUnit.classList.add('news-unit');
            newsUnit.classList.add('panel');
            newsUnit.classList.add('bottom-panel');
            newsUnit.classList.add('accent-border');
            newsUnit.classList.add('flex');
            newsUnit.classList.add('flex-column');
            newsUnit.classList.add('flex-start');

            newsUnit.innerHTML = `
                <h4>${news.title}</h4>
                <p>${news.text}</p>
            `;

            document.getElementById('news-for-information-panel').appendChild(newsUnit);
        }
    }
}

async function requestGetNewsForInformationPanel() {
    const response = await sendJSONRequest({}, '/api/news/get-news.php');
    if (response.result && response.result === 'news found successfully') return response;
    if (response.error) showNotification(response['error message'], 'red');
    return false;
}

getNewsForInformationPanel();
addCloseButtonForSmartphones();
eventBinding();
showUserData();
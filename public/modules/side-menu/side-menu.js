'use strict';

import { sendJSONRequest, getSession } from "./scripts/requests.js";
import { changeModule } from "./scripts/module.js";
import { snowModalConfirmationWindow } from "./scripts/modalWindow.js";

function eventBinding() {
    document.getElementById('btn-exit').onclick = () => snowModalConfirmationWindow('Выйти из аккаунта?', 'Да', 'Нет', () => exitAccount());
    document.getElementById('icon-close').onclick = () => closeSideMenu();
}

function closeSideMenu() {
    changeStyleAnimationElement('black-space', 'snow-black-space', 'hide-black-space');
    changeStyleAnimationElement('side-menu', 'open-side-menu', 'close-side-menu');
    changeStyleAnimationElement('information-panel', 'snow-information-panel', 'hide-information-panel');
    setTimeout(() => clearContainerSideMenu(), 600);
}

function changeStyleAnimationElement(idElement, oldStyleAnimation, newStyleAnimation) {
    let element = document.getElementById(idElement);
    element.classList.remove(oldStyleAnimation);
    element.classList.add(newStyleAnimation);
}

function clearContainerSideMenu() {
    document.getElementById('container-side-menu').innerHTML = '';
}

async function exitAccount() {
    const response = await sendJSONRequest({}, '/app/sessions/Session.php?action=destroy');
    if (response['session result'] === 'the session is destroyed') {
        closeSideMenu();
        changeModule('authorization');
    } else {
        console.error('Ошибка удаление сессии пользователя!');
    }
}

async function getUserData() {
    const userData = await getSession();
    let userRole;

    if (userData.role === 'user') {
        userRole = 'Пользователь';
    } else {
        userData = 'Администратор';
    }

    document.getElementById('user-login').innerHTML = `${userRole} ${userData.login}`;
    document.getElementById('user-email').innerHTML = userData.email;
}

eventBinding();
getUserData();
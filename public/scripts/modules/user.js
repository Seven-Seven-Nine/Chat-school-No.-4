'use strict';

import { showModalConfirmationWindow } from "../modalWindow.js";
import { applyModule, applySubmodule } from "../module.js";
import { showNotification } from "../notifications.js";
import { getUserSession, updateUser } from "../requests.js";
import { incorrectInput, correctInput } from "../validationForms.js";

/** @type {HTMLInputElement} */ const inputLogin = document.getElementById('input-login');
/** @type {HTMLInputElement} */ const inputEmail = document.getElementById('input-email');

function eventBinding() {
    document.getElementById('btn-return').onclick = () => applyModule('account');
    document.getElementById('btn-save').onclick = () => validatorUserForm();
    document.getElementById('btn-choose-avatar').onclick = () => applySubmodule('choosing-user-avatar', 'container-choosing-user-avatar');
    document.getElementById('btn-reset-password').onclick = () => applySubmodule('reset-user-password', 'container-reset-user-password');
}

async function showUserData() {
    const userSession = await getUserSession();
    const userRole = userSession.role === 'user' ? 'Пользователь' : 'Администратор';

    document.getElementById('user-data').innerHTML = `${userRole} ${userSession.login}`;
    inputLogin.value = userSession.login;
    inputEmail.value = userSession.email;    

    if (userSession['path_to_avatar'] !== 'none') {
        /** @type {HTMLImageElement} */ const avatar = document.getElementById('user-avatar');
        avatar.src = userSession['path_to_avatar'];
        avatar.classList.add('avatar');
    };
}

async function validatorUserForm() {
    let formValidationResult = [];

    if (inputLogin.value.length < 3) {
        incorrectInput(inputLogin, 'Короткий логин!');
    } else if (inputLogin.value.length > 15) {
        incorrectInput(inputLogin, 'Большой логин!');
    } else {
        correctInput(inputLogin, 'Логин');
        formValidationResult.push(true);
    }

    if (inputEmail.value.length < 3) {
        incorrectInput(inputEmail, 'Короткая почта!');
    } else if (inputEmail.value.length > 35) {
        incorrectInput(inputEmail, 'Большая почта!');
    } else {
        correctInput(inputEmail, 'Почта');
        formValidationResult.push(true);
    }

    if (formValidationResult.length === 2) showModalConfirmationWindow('Сохранить изменения?', 'Да', 'Нет', () => saveChanges());
}

async function saveChanges() {
    const userSession = await getUserSession();
    const userDataObject = {
        'login': inputLogin.value,
        'role': userSession.role,
        'email': inputEmail.value,
        'path_to_avatar': userSession.path_to_avatar
    };

    if (await updateUser(userDataObject)) {
        showNotification('Данные пользователя обновлены.', 'green');
        showUserData();
    }
}

eventBinding();
showUserData();
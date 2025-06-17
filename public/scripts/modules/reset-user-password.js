'use strict';

import { deleteSpecificModuleScript } from "../module.js";
import { changeStyleAnimationElement } from "../template-element.js";
import { correctInput, incorrectInput } from "../validationForms.js";
import { showNotification } from "../notifications.js";
import { showModalConfirmationWindow } from "../modalWindow.js";
import { getUserSession, passwordUpdate } from "../requests.js";

/** @type {HTMLInputElement} */ const currentInputPassword = document.getElementById('input-current-password');
/** @type {HTMLInputElement} */ const newInputPassword = document.getElementById('input-new-password');
/** @type {HTMLInputElement} */ const newInputRePassword = document.getElementById('input-new-re-password');

function eventBinding() {
    document.getElementById('black-space').onclick = () => closeResetUserPassword();
    document.getElementById('btn-return-reset-user-password').onclick = () => closeResetUserPassword();
    document.getElementById('btn-confirm-reset-user-password').onclick = () => validatorResetUserPasswordForm();
}

async function closeResetUserPassword() {
    changeStyleAnimationElement('black-space', 'snow-black-space', 'hide-black-space');
    changeStyleAnimationElement('reset-user-password', 'show-reset-user-password', 'hide-reset-user-password');
    setTimeout(() => document.getElementById('container-reset-user-password').textContent = '', 400);
    await deleteSpecificModuleScript('/public/scripts/modules/reset-user-password.js');
}

function validatorResetUserPasswordForm() {
    let formValidationResult = [];

    if (currentInputPassword.value.length < 3) {
        incorrectInput(currentInputPassword, 'Короткий пароль!');
    } else {
        correctInput(currentInputPassword, 'Старый пароль');
        formValidationResult.push(true);
    }
    
    if (newInputPassword.value.length < 3) {
        incorrectInput(newInputPassword, 'Короткий пароль!');
    } else {
        correctInput(newInputPassword, 'Новый пароль');
        formValidationResult.push(true);
    }

    if (newInputRePassword.value !== newInputPassword.value) {
        incorrectInput(newInputRePassword, 'Пароли не совпадают!');
    } else {
        correctInput(newInputRePassword, 'Повторите новый пароль')
        formValidationResult.push(true);
    }

    if (formValidationResult.length === 3) showModalConfirmationWindow('Вы точно хотите сбросить пароль?', 'Да', 'Нет', () => resetPassword());
}

async function resetPassword() {
    const userSession = await getUserSession();
    const userDataObject = {
        'login': userSession.login,
        'current_password': currentInputPassword.value,
        'new_password': newInputPassword.value
    };
    if (await passwordUpdate(userDataObject)) {
        showNotification('Пароль обновлён.', 'green');
        closeResetUserPassword();
    }
}

eventBinding();
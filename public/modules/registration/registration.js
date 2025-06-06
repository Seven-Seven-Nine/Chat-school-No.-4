'use strict';

import { sendJSONRequest, saveSession } from "./scripts/requests.js";
import { changeModule } from "./scripts/module.js";
import { incorrectInput, correctInput } from "./scripts/validationForms.js";
import { showNotification } from "./scripts/notifications.js";
import { changeColorTheme } from "./scripts/colorTheme.js";

/** @type {HTMLInputElement} */ const inputLogin = document.getElementById('input-login');
/** @type {HTMLInputElement} */ const inputEmail = document.getElementById('input-email');
/** @type {HTMLInputElement} */ const inputPassword = document.getElementById('input-password');
/** @type {HTMLInputElement} */ const inputRePassword = document.getElementById('input-re-password');

function eventBinding() {
    document.getElementById('logo').onclick = () => window.location.href = '/';
    document.getElementById('icon-change-theme').onclick = () => changeColorTheme();
    document.getElementById('link-authorization').onclick = () => changeModule('authorization');
    document.getElementById('btn-confirm').onclick = () => validatorRegistrationForm();

    document.body.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            validatorRegistrationForm();
        }
    });
}

function validatorRegistrationForm() {
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

    if (inputPassword.value.length < 3) {
        incorrectInput(inputPassword, 'Короткий пароль!');
    } else {
        correctInput(inputPassword, 'Пароль');
        formValidationResult.push(true);
    }

    if (inputRePassword.value !== inputPassword.value) {
        incorrectInput(inputRePassword, 'Пароли не совпадают!');
    } else {
        correctInput(inputRePassword, 'Повторите пароль')
        formValidationResult.push(true);
    }

    if (formValidationResult.length === 4) {
        sendingRequest();
    }
}

async function sendingRequest() {
    const object = {
        'login': inputLogin.value,
        'email': inputEmail.value,
        'password': inputPassword.value
    };

    const response = await sendJSONRequest(object, '/app/controllers/UserController.php?action=add_user');

    if (response) {
        requestProcessing(response);
    } else {
        console.error('Ответ от сервера не получен!');
    }
}

function requestProcessing(response) {
    if (response['result'] && response['result'] === 'the user is registered') {
        const sessionObject = {
            'login': inputLogin.value,
            'role': 'user',
            'email': inputEmail.value,
        };
        saveSession(sessionObject);
        showNotification('Вход в аккаунт.', 'green');
        changeModule('account');
    }
    if (response['error message']) {
        showNotification(response['error message'], 'red');
    }
}

eventBinding();
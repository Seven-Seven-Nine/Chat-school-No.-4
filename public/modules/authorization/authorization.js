'use strict';

import { sendJSONRequest, saveSession } from "./scripts/requests.js";
import { changeModule } from "./scripts/module.js";
import { incorrectInput, correctInput } from "./scripts/validationForms.js";
import { showNotification } from "./scripts/notifications.js";
import { changeColorTheme } from "./scripts/colorTheme.js";

/** @type {HTMLInputElement} */ const inputLogin = document.getElementById('input-login');
/** @type {HTMLInputElement} */ const inputPassword = document.getElementById('input-password');

function eventBinding() {
    document.getElementById('logo').onclick = () => window.location.href = '/';
    document.getElementById('icon-change-theme').onclick = () => changeColorTheme();
    document.getElementById('link-registration').onclick = () => changeModule('registration');
    document.getElementById('link-password-recovery').onclick = () => changeModule('password-recovery');
    document.getElementById('btn-confirm').onclick = () => validatorAuthorizationForm();

    document.body.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            validatorAuthorizationForm();
        }
    });
}

function validatorAuthorizationForm() {
    let formValidationResult = [];
    
    if (inputLogin.value.length < 3) {
        incorrectInput(inputLogin, 'Короткий логин!');
    } else if (inputLogin.value.length > 15) {
        incorrectInput(inputLogin, 'Большой логин!');
    } else {
        correctInput(inputLogin, 'Логин');
        formValidationResult.push(true);
    }

    if (inputPassword.value.length < 3) {
        incorrectInput(inputPassword, 'Короткий пароль!');
    } else {
        correctInput(inputPassword, 'Пароль');
        formValidationResult.push(true);
    }

    if (formValidationResult.length === 2) {
        sendingRequest();
    }
}

async function sendingRequest() {
    const object = {
        'login': inputLogin.value,
        'password': inputPassword.value
    };

    const response = await sendJSONRequest(object, '/app/controllers/UserController.php?action=authorization');

    if (response) {
        requestProcessing(response);
    } else {
        console.error('Ответ от сервера не получен!');
    }
}

function requestProcessing(response) {
    if (response['result'] && response['result'] === 'authorization is allowed') {
        const sessionObject = {
            'login': inputLogin.value,
            'role': response['role'],
            'email': response['email'],
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
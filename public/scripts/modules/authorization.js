'use strict';

import { changeColorTheme } from "../colorTheme.js";
import { applyModule } from "../module.js";
import { incorrectInput, correctInput } from "../validationForms.js";
import { userAuthorization } from "../requests.js";
import { showNotification } from "../notifications.js";

/** @type {HTMLInputElement} */ const inputLogin = document.getElementById('input-login');
/** @type {HTMLInputElement} */ const inputPassword = document.getElementById('input-password');

function eventBinding() {
    document.getElementById('logo').onclick = () => window.location.href = '/';
    document.getElementById('icon-change-theme').onclick = () => changeColorTheme();
    document.getElementById('btn-confirm').onclick = () => validatorAuthorizationForm();
    document.getElementById('link-registration').onclick = () => applyModule('registration');
    document.getElementById('link-password-recovery').onclick = () => applyModule('password-recovery');

    document.body.addEventListener('keypress', (event) => {
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
        authorizationRequest();
    }
}

async function authorizationRequest() {
    const userData = {
        'login': inputLogin.value,
        'password': inputPassword.value
    };

    if (await userAuthorization(userData)) {
        showNotification('Вход в аккаунт!', 'green');
        applyModule('account');
    }
}

eventBinding();
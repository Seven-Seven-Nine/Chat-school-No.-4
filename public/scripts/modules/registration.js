'use strict';

import { changeColorTheme } from "../colorTheme.js";
import { applyModule } from "../module.js";
import { incorrectInput, correctInput } from "../validationForms.js";
import { userRegistration } from "../requests.js";
import { showNotification } from "../notifications.js";

/** @type {HTMLInputElement} */ const inputLogin = document.getElementById('input-login');
/** @type {HTMLInputElement} */ const inputEmail = document.getElementById('input-email');
/** @type {HTMLInputElement} */ const inputPassword = document.getElementById('input-password');
/** @type {HTMLInputElement} */ const inputRePassword = document.getElementById('input-re-password');

function eventBinding() {
    document.getElementById('logo').onclick = () => window.location.href = '/';
    document.getElementById('icon-change-theme').onclick = () => changeColorTheme();
    document.getElementById('btn-confirm').onclick = () => validatorRegistrationForm();
    document.getElementById('link-authorization').onclick = () => applyModule('authorization');

    document.getElementById('registration-module').addEventListener('keypress', (event) => {
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

    if (formValidationResult.length === 4) registrationRequest();
}

async function registrationRequest() {
    const userData = {
        'login': inputLogin.value,
        'email': inputEmail.value,
        'password': inputPassword.value
    };
    
    if (await userRegistration(userData)) {
        showNotification('Вход в аккаунт!', 'green');
        applyModule('account');
    }
}

eventBinding();
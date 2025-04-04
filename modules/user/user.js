'use strict';

import moduleTransition from '../../static/scripts/moduleTransition.js';

const module = document.getElementById('module');

function user() {
  bindEvent();
}

function bindEvent() {
  document.getElementById('btn-return').onclick = () => handlerBtnReturn();
  document.getElementById('btn-confirm').onclick = () => handlerBtnConfirm();
  document.getElementById('btn-change-password').onclick = () => handlerBtnChangePassword();
}

function handlerBtnReturn() {
  moduleTransition(module, 'account');
}

function handlerBtnConfirm() {
  validationForm();
}

function handlerBtnChangePassword() {
  moduleTransition(module, 'change_password');
}

function validationForm() {
  function incorrectInput(HTMLinput, placeholder) {
    HTMLinput.value = '';
    HTMLinput.placeholder = placeholder;
    HTMLinput.classList.add('error-input');
  }

  function correctInput(HTMLinput, placeholder) {
    HTMLinput.placeholder = placeholder;
    HTMLinput.classList.remove('error-input');
  }

  /** @type {HTMLInputElement} */
  const login = document.getElementById('login');
  /** @type {HTMLInputElement} */
  const email = document.getElementById('email');

  if (login.value.length < 3) {
    incorrectInput(login, 'Некорректный логин!');
  } else if (login.value.length > 20) {
    incorrectInput('login', 'Некорректный логин!');
  } else {
    correctInput(login, 'Логин');
  }

  if (email.value.length < 3) {
    incorrectInput(email, 'Некорректная почта!');
  } else if (email.value.length > 50) {
    incorrectInput(email, 'Некорректная почта!');
  } else {
    correctInput(email, 'Почта');
  }
}

user();
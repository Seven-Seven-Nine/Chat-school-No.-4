'use strict';

import moduleTransition from '../../static/scripts/moduleTransition.js';

function registration() {
  bindEvent();
}

function bindEvent() {
  document.getElementById('btn-confirm').onclick = () => handlerBtnConfirm();
  document.getElementById('link-login').onclick = () => moduleTransition(document.getElementById('module'), 'login');
}

function handlerBtnConfirm() {
  if (validateForm()) {
    document.getElementById('form').submit();
  }
}

function validateForm() {
  function incorrectInput(HTMLinput, placeholder) {
    HTMLinput.value = '';
    HTMLinput.placeholder = placeholder;
    HTMLinput.classList.add('error-input');
  }

  function correctInput(HTMLinput, placeholder) {
    HTMLinput.placeholder = placeholder;
    HTMLinput.classList.remove('error-input');
  }

  /**@type {HTMLInputElement} */
  const inputLogin = document.getElementById('input-login');
  /**@type {HTMLInputElement} */
  const inputEmail = document.getElementById('input-email');
  /**@type {HTMLInputElement} */
  const inputPassword = document.getElementById('input-password');
  /**@type {HTMLInputElement} */
  const inputRePassword = document.getElementById('input-re-password');

  let resultValidateForm = [];
  
  if (inputLogin.value.length < 3) {
    incorrectInput(inputLogin, 'Короткий логин!');
  } else if (inputLogin.value.length > 15) {
    incorrectInput(inputLogin, 'Большой логин!');
  } else {
    correctInput(inputLogin, 'Логин');
    resultValidateForm.push(true);
  }

  if (inputEmail.value.length < 3) {
    incorrectInput(inputEmail, 'Короткая почта!');
  } else if (inputEmail.value.length > 35) {
    incorrectInput(inputEmail, 'Большая почта!');
  } else {
    correctInput(inputEmail, 'Почта');
    resultValidateForm.push(true);
  }

  if (inputPassword.value.length < 3) {
    incorrectInput(inputPassword, 'Короткий пароль!');
  } else {
    correctInput(inputPassword, 'Пароль');
    resultValidateForm.push(true);
  }

  if (inputRePassword.value !== inputPassword.value) {
    incorrectInput(inputRePassword, 'Пароли не совпадают!');
  } else {
    correctInput(inputRePassword, 'Повторите пароль')
    resultValidateForm.push(true);
  }

  if (resultValidateForm.length === 4) {
    return true;
  } else {
    return false;
  }
}

registration();
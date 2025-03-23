import moduleTransition from "../../static/scripts/moduleTransition.js";

function login() {
  bindEvent();
}

function bindEvent() {
  const module = document.getElementById('module');
  document.getElementById('link-registration').onclick = () => moduleTransition(module, 'registration');
  document.getElementById('link-password-recovery').onclick = () => moduleTransition(module, 'password_recovery')
  document.getElementById('btn-confirm').onclick = () => handlerBtnConfirm();
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
  const inputPassword = document.getElementById('input-password');

  let resultValidateForm = [];
  
  if (inputLogin.value.length < 3) {
    incorrectInput(inputLogin, 'Короткий логин!');
  } else if (inputLogin.value.length > 15) {
    incorrectInput(inputLogin, 'Большой логин!');
  } else {
    correctInput(inputLogin, 'Логин');
    resultValidateForm.push(true);
  }

  if (inputPassword.value.length < 3) {
    incorrectInput(inputPassword, 'Короткий пароль!');
  } else {
    correctInput(inputPassword, 'Пароль');
    resultValidateForm.push(true);
  }

  if (resultValidateForm.length === 2) {
    return true;
  } else {
    return false;
  }
}


login();
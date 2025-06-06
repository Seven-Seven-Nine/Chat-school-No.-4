'use strict';

/**
 * Функция валидации формы для обозначения неправильно заполненного поля.
 * @param {HTMLInputElement} inputElement - <input> формы.
 * @param {string} placeholder - текст для обозначения ошибки.
 */
function incorrectInput(inputElement, placeholder) {
    inputElement.value = '';
    inputElement.placeholder = placeholder;
    inputElement.classList.add('error-input');
}

/**
 * Функция валидации формы для обозначения правильного заполненного поля.
 * @param {HTMLInputElement} inputElement - <input> формы.
 * @param {string} placeholder - изначальный текст <input>.
 */
function correctInput(inputElement, placeholder) {
    inputElement.placeholder = placeholder;
    inputElement.classList.remove('error-input');
}

export { incorrectInput, correctInput };
'use strict';

/** @type {HTMLInputElement} */
const inputAccentColor = document.getElementById('input-accent-color');
/** @type {HTMLInputElement} */
const inputBorderColor = document.getElementById('input-border-color');
/** @type {HTMLInputElement} */
const inputTextColor = document.getElementById('input-text-color');
/** @type {HTMLInputElement} */
const inputLinkColor = document.getElementById('input-link-color');

function settingsColor() {
  bindEvent();
  searchSavedValues();
}

function bindEvent() {
  inputAccentColor.oninput = () => handlerInputAccentColor();
  inputBorderColor.oninput = () => handlerInputBorderColor();
  inputTextColor.oninput = () => handlerInputTextColor();
  inputLinkColor.oninput = () => handlerInputLinkColor();
}

// Обработчики
function handlerInputAccentColor() {
  window.localStorage.setItem('valueAccentColor', inputAccentColor.value);
  changeCssVariable('--accent-color', inputAccentColor.value);
}

function handlerInputBorderColor() {
  window.localStorage.setItem('valueBorderColor', inputBorderColor.value);
  changeCssVariable('--border-color', inputBorderColor.value);
}

function handlerInputTextColor() {
  window.localStorage.setItem('valueTextColor', inputTextColor.value);
  changeCssVariable('--text-color', inputTextColor.value);
}

function handlerInputLinkColor() {
  window.localStorage.setItem('valueLinkColor', inputLinkColor.value);
  changeCssVariable('--link-hover-color', inputLinkColor.value);
}

// Поиск сохранённых значений
function searchSavedValues() {
  if (window.localStorage.getItem('valueAccentColor')) {
    inputAccentColor.value = window.localStorage.getItem('valueAccentColor');
    changeCssVariable('--accent-color', inputAccentColor.value);
  }

  if (window.localStorage.getItem('valueBorderColor')) {
    inputBorderColor.value = window.localStorage.getItem('valueBorderColor');
    changeCssVariable('--border-color', inputBorderColor.value);
  }

  if (window.localStorage.getItem('valueTextColor')) {
    inputTextColor.value = window.localStorage.getItem('valueTextColor');
    changeCssVariable('--text-color', inputTextColor.value);
  }

  if (window.localStorage.getItem('valueLinkColor')) {
    inputLinkColor.value = window.localStorage.getItem('valueLinkColor');
    changeCssVariable('--link-hover-color', inputLinkColor.value);
  }
}

/**
 * Изменить CSS переменную.
 * @param {string} variable 
 * @param {string} value 
 */
function changeCssVariable(variable, value) {
  document.documentElement.style.setProperty(variable, value);
}

settingsColor();

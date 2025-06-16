'use strict';

import { applyBackground, applyBrowserColorTheme, applyColorTheme, changeColorTheme } from "../colorTheme.js";
import { showModalConfirmationWindow } from "../modalWindow.js";
import { applyModule } from "../module.js";
import { changeStyleAnimationElement } from "../template-element.js";

const colorScheme = document.getElementById('color-scheme');
const background = document.getElementById('background');
const animationSpeed = document.getElementById('animation-speed');

const inputSpeedShowModalWindow = document.getElementById('input-speed-animation-show-modal-window');
const inputSpeedHideModalWindow = document.getElementById('input-speed-animation-hide-modal-window');
const inputSpeedModules = document.getElementById('input-speed-animation-modules');

function eventBinding() {
    document.getElementById('btn-return').onclick = () => applyModule('account');
    document.getElementById('light-theme').onclick = () => chooseColorTheme('light-theme');
    document.getElementById('dark-theme').onclick = () => chooseColorTheme('dark-theme');
    document.getElementById('option-color-scheme').onclick = () => openColorScheme();
    document.getElementById('option-background').onclick = () => openBackground();
    document.getElementById('option-animation-speed').onclick = () => openAnimationSpeed();
    document.getElementById('option-restoring-settings').onclick = () => showModalConfirmationWindow('Восстановить настройки!', 'Да', 'Нет', () => restoringSettings());
    document.getElementById('background-1').onclick = () => selectAnImage('background-1');
    document.getElementById('background-2').onclick = () => selectAnImage('background-2');
    document.getElementById('btn-save-speed-animation').onclick = () => saveAnimationSpeed();
}

function chooseColorTheme(theme) {
    applyColorTheme(theme);
    if (window.localStorage.getItem('background')) window.localStorage.removeItem('background');
    applyBackground();
}

function openColorScheme() {
    if (screen.width < 720) {
        document.getElementById('block-settings-options').style.display = 'none';
        document.getElementById('block-settings').style.display = 'flex';
    }
    changeStyleAnimationElement('color-scheme', 'hide-element', 'show-element', true);
    changeStyleAnimationElement('background', 'show-element', 'hide-element', false);
    changeStyleAnimationElement('animation-speed', 'show-element', 'hide-element', false);
}

function openBackground() {
    if (screen.width < 720) {
        document.getElementById('block-settings-options').style.display = 'none';
        document.getElementById('block-settings').style.display = 'flex';
    }
    changeStyleAnimationElement('color-scheme', 'show-element', 'hide-element', false);
    changeStyleAnimationElement('background', 'hide-element', 'show-element', true);
    changeStyleAnimationElement('animation-speed', 'show-element', 'hide-element', false);
}

function openAnimationSpeed() {
    if (screen.width < 720) {
        document.getElementById('block-settings-options').style.display = 'none';
        document.getElementById('block-settings').style.display = 'flex';
    }
    changeStyleAnimationElement('color-scheme', 'show-element', 'hide-element', false);
    changeStyleAnimationElement('background', 'show-element', 'hide-element', false);
    changeStyleAnimationElement('animation-speed', 'hide-element', 'show-element', true);
}

function selectAnImage(titleImage) {
    window.localStorage.setItem('background', titleImage);
    applyBackground();
}

function restoringSettings() {
    applyBrowserColorTheme();
    if (window.localStorage.getItem('background')) window.localStorage.removeItem('background');
    applyBackground();
    window.localStorage.removeItem('speedShowModalWindow');
    window.localStorage.removeItem('speedHideModalWindow');
    window.localStorage.removeItem('speedModules');
}

function fillAnimationSpeedInput() {
    if (window.localStorage.getItem('speedShowModalWindow') && window.localStorage.getItem('speedHideModalWindow') && window.localStorage.getItem('speedModules')) {
        inputSpeedShowModalWindow.value = window.localStorage.getItem('speedShowModalWindow');
        inputSpeedHideModalWindow.value = window.localStorage.getItem('speedHideModalWindow');
        inputSpeedModules.value = window.localStorage.getItem('speedModules');
    } else {
        const root = document.documentElement;
        const styles = getComputedStyle(root);
        const speedShowModalWindow = styles.getPropertyValue('--sped-animation-show').trim();
        const speedHideModalWindow = styles.getPropertyValue('--sped-animation-hide').trim();
        const speedModules = styles.getPropertyValue('--speed-animation-module').trim();

        inputSpeedShowModalWindow.value = speedShowModalWindow;
        inputSpeedHideModalWindow.value = speedHideModalWindow;
        inputSpeedModules.value = speedModules;
    }
}

function saveAnimationSpeed() {
    window.localStorage.setItem('speedShowModalWindow', inputSpeedShowModalWindow.value);
    window.localStorage.setItem('speedHideModalWindow', inputSpeedHideModalWindow.value);
    window.localStorage.setItem('speedModules', inputSpeedModules.value);
    fillAnimationSpeedInput();
}

function applyAnimationSpeed() {
    if (window.localStorage.getItem('speedShowModalWindow') && window.localStorage.getItem('speedHideModalWindow') && window.localStorage.getItem('speedModules')) {
        const rootElement = document.documentElement;
        rootElement.style.setProperty('--sped-animation-show', window.localStorage.getItem('speedShowModalWindow'));
        rootElement.style.setProperty('--sped-animation-hide', window.localStorage.getItem('speedHideModalWindow'));
        rootElement.style.setProperty('--speed-animation-module', window.localStorage.getItem('speedModules'));
    }
}

fillAnimationSpeedInput();
applyAnimationSpeed();
eventBinding();
'use strict';

/**
 * Функция для применения темы браузера.
 */
function applyBrowserColorTheme() {
    if (window.localStorage.getItem('color-theme') !== null) {
        applyColorTheme(window.localStorage.getItem('color-theme'));
    } else {
        const colorTheme = getBrowserColorTheme();
        switch (colorTheme) {
            case 'dark-theme':
                applyColorTheme(colorTheme);
                break;
            case 'light-theme':
                applyColorTheme(colorTheme);
                break;
            default:
                break;
        }
    }
}

/**
 * Функция для получения темы браузера.
 * @returns возвращает название темы в зависимости от темы браузера: 'dark-theme' или 'light-theme'.
 */
function getBrowserColorTheme() {
    const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDarkTheme) {
        return 'dark-theme';
    } else {
        return 'light-theme';
    }
}

/**
 * Функция для определения используемой цветовой темы. 
 * @returns возвращает название темы: 'dark-theme' или 'light-theme'.
 */
function defineColorTheme() {
    if (document.body.classList.contains('light-theme')) {
        return 'light-theme';
    } else {
        return 'dark-theme';
    }
}

/**
 * Функция применения цветовой темы.
 * @param {string} colorTheme - название темы ('dark-theme', 'light-theme')
 */
function applyColorTheme(colorTheme) {
    document.body.classList.remove('light-theme');
    document.body.classList.remove('dark-theme');
    document.body.classList.add(colorTheme);
    window.localStorage.setItem('color-theme', colorTheme);
}

/**
 * Функция для смены цветовой темы на противоположную.
 */
function changeColorTheme() {
    const previousColorTheme = defineColorTheme();
    if (previousColorTheme === 'dark-theme') {
        applyColorTheme('light-theme');
    } else {
        applyColorTheme('dark-theme');
    }
}

export { applyBrowserColorTheme, changeColorTheme, applyColorTheme };
'use strict';

/** @type {HTMLDivElement} */ const main = document.getElementById('main');

/**
 * Загрузка модуля в основной html-элемент (<main id="main">).
 * Модули должны находиться по пути "/public/modules/".
 * @param {string} moduleName - название модуля, например: authorization, registration. Название модуля должно совпадать с названием папки и иметь формат файла - html. 
 */
async function applyModule(moduleName) {
    try {
        const request = await fetch(`/public/modules/${moduleName}.html`);
        if (request.ok) {
            const response = await request.text();
            main.innerHTML = response;

            await applyScriptToModule(moduleName);
        } else {
            console.error('Ошибка запроса загрузки модуля!');
        }
    } catch (error) {
        throw new Error(`Ошибка загрузки модуля "${moduleName}": ${error}.`);
    }
}

/**
 * Загрузка подмодуля в определённое место в основном модуле.
 * Подмодули должны находиться в по пути "/public/modules/"
 * @param {string} submoduleName - название подмодуля, например: side-menu, right-bar. Название модуля должно совпадать с названием папки и иметь формат файла - html.
 * @param {string} idDownloadLocation - id элемента, в который будет загружен подмодуль. 
 */
async function applySubmodule(submoduleName, idDownloadLocation) {
    try {
        const request = await fetch(`/public/modules/${submoduleName}.html`);
        if (request.ok) {
            const response = await request.text();
            document.getElementById(idDownloadLocation).innerHTML = response;

            await applyScriptToModule(submoduleName, true);
        } else {
            console.error('Ошибка запроса загрузки подмодуля!');
        }
    } catch (error) {
        throw new Error(`Ошибка загрузки submodule "${submoduleName}": ${error}.`);
    }
}

/**
 * Загрузка контролирующего скрипта модуля в <head>.
 * Скрипты модуля должен находиться по пути: "/public/scripts/modules/".
 * @param {string} moduleName - название модуля, для которого требуется загрузить скрипт.
 * @param {string} submoduleMode - режим подмодуля, который не удаляет <script> родительского модуля (по умолчанию false).
 */
async function applyScriptToModule(moduleName, submoduleMode = false) {
    try {
        if (!submoduleMode) await deletingModuleScripts('/public/scripts/main.js');

        const script = document.createElement('script');
        script.src = `/public/scripts/modules/${moduleName}.js?version=${Date.now()}`;
        script.type = 'module';

        document.head.appendChild(script);

        return new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
        });
    } catch (error) {
        throw new Error(`Ошибка загрузки скрипта для модуля "${moduleName}": ${error}.`);
    }
}

/**
 * Удаление всех скриптов модулей, кроме исключённого скрипта.
 * @param {string} srcExcludedScript - путь скрипта, который является исключением для удаления.
 */
async function deletingModuleScripts(srcExcludedScript) {
    try {
        const scripts = document.querySelectorAll('script');

        for (const script of scripts) {
            if (script.src.endsWith(srcExcludedScript)) {
                continue;
            } else {
                script.remove();
            }
        }
    } catch (error) {
        throw new Error(`Ошибка удаления скриптов модулей: ${error}.`);
    }
}

/**
 * Удаление определённого скрипта по его пути.
 * @param {string} srcScriptForDeletion - путь скрипта, который нужно удалить.
 */
async function deleteSpecificModuleScript(srcScriptForDeletion) {
    try {
        const scripts = document.querySelectorAll('script');
        
        for (const script of scripts) {
            const baseScriptPath = script.src.split('?')[0];
            
            if (baseScriptPath.endsWith(srcScriptForDeletion)) {
                script.remove();
                break;
            }
        }
    } catch (error) {
        throw new Error(`Ошибка удаления скрипта "${srcScriptForDeletion}": ${error}`);
    }
}

export { applyModule, applySubmodule, deleteSpecificModuleScript }
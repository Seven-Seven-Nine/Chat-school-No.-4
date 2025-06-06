'use strict';

/**
 * Функция изменения отображаемого модуля в <main> на другой с применением анимации.
 * @param {string} moduleName - название модуля (html-шаблон должен находиться в папке и называться точно также, как и папка).
 */
function changeModule(moduleName) {
    const main = document.getElementById('main');
    const previousModule = main.firstElementChild;

    previousModule.classList.remove('open-module');
    previousModule.classList.add('close-module');

    let timer = setTimeout(async () => loadTemplate(main, moduleName), 200);
}

/**
 * 
 * @param {string} mainElement - основной элемент, куда вставляется шаблон.
 * @param {string} moduleName - название модуля (html-шаблон должен находиться в папке и называть точно также, как и папка).
 */
async function loadTemplate(mainElement, moduleName) {
    const main = mainElement;

    try {
        const request = await fetch(`/public/modules/${moduleName}/${moduleName}.html`);
        
        if (request.ok) {
            const html = await request.text();
            main.innerHTML = html;

            await processScripts(mainElement, moduleName);
        } else {
            console.error('Модуль не найден!');
        }
    } catch (error) {
        console.error(`Ошибка загрузки модуля: ${error}`);
    }
}

/**
 * Функция обработки скриптов из шаблона.
 */
async function processScripts() {
    const scripts = document.querySelectorAll('script');

    for (const script of scripts) {
        try {
            if (script.src) {
                const src = script.src.replace(window.location.origin, '');
                const response = await fetch(src);
                const code = await response.text();

                const newScript = document.createElement('script');
                if (script.type) newScript.type = script.type;
                newScript.textContent = code;

                script.parentNode.replaceChild(newScript, script);
            } else {
                const newScript = document.createElement('script');
                if (script.type) newScript.type = script.type;
                newScript.textContent = script.textContent;

                script.parentNode.replaceChild(newScript, script);
            }
        } catch (error) {
            console.error('Ошибка загрузки скриптов модуля!');
        }
    }
}

export { changeModule, loadTemplate };
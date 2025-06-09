'use strict';

/**
 * Функция создания модального окна подтверждения.
 * @param {string} mainText - основной текст модального окна. 
 * @param {string} textConfirmationBtn - текст кнопки подтверждения (по умолчанию 'Да').
 * @param {string} textRejectBtn - текст кнопки отклонения (по умолчанию 'Нет').
 * @param {any} callback - callback для кнопки подтверждения. 
 */
function showModalConfirmationWindow(mainText, textConfirmationBtn = 'Да', textRejectBtn = 'Нет', callback) {
    const blackSpaceModalWindow = document.createElement('div');
    blackSpaceModalWindow.classList.add('black-space-modal-window');
    blackSpaceModalWindow.classList.add('snow-black-space-modal-window');

    const modalWindow = document.createElement('div');
    modalWindow.classList.add('modal-window');
    modalWindow.classList.add('snow-modal-window');
    modalWindow.innerHTML = `
        <p>${mainText}</p>
        <div class="flex flex-row flex-center">
            <button id="btn-modal-window-confirm" type="button" class="button-default">${textConfirmationBtn}</button>
            <button id="btn-modal-window-reject" type="button" class="button-default button-red">${textRejectBtn}</button>
        </div>
    `;

    document.getElementById('modal-window-container').appendChild(blackSpaceModalWindow);
    document.getElementById('modal-window-container').appendChild(modalWindow);

    document.getElementById('btn-modal-window-confirm').onclick = () => {
        callback();
        hideModalWindow(modalWindow, blackSpaceModalWindow);
    };
    document.getElementById('btn-modal-window-reject').onclick = () => hideModalWindow(modalWindow, blackSpaceModalWindow);
}

/**
 * Функция удаления модального окна.
 * @param {HTMLDivElement} modalWindow - html-элемент модального окна.
 * @param {HTMLDivElement} blackSpaceModalWindow - html-элемент затемнения заднего фона.
 */
function hideModalWindow(modalWindow, blackSpaceModalWindow) {
    modalWindow.classList.remove('snow-modal-window');
    modalWindow.classList.add('hide-modal-window');

    blackSpaceModalWindow.classList.remove('snow-black-space-modal-window');
    blackSpaceModalWindow.classList.add('hide-black-space-modal-window');

    setTimeout(() => modalWindow.remove(), 200);
    setTimeout(() => blackSpaceModalWindow.remove(), 300);
}

export { showModalConfirmationWindow };
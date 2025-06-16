'use strict';

/**
 * Сменить анимацию для html-элемента, например, с анимации открытия, на анимацию закрытия.
 * @param {string} idElement - id-элемента, для которого меняется CSS анимация.
 * @param {string} oldStyleAnimation - название старой CSS анимации, для удаления.
 * @param {string} newStyleAnimation - новая CSS анимация для элемента.
 * @param {string} display - изменяет CSS свойство display (по умолчанию true);
 */
function changeStyleAnimationElement(idElement, oldStyleAnimation, newStyleAnimation, display = true) {
    let element = document.getElementById(idElement);
    element.classList.remove(oldStyleAnimation);
    element.classList.add(newStyleAnimation);
    if (display === true) {
        element.classList.add('display-flex');
        element.classList.remove('display-none');
    } else {
        element.classList.add('display-none');
        element.classList.remove('display-flex');
    }
}

export { changeStyleAnimationElement };
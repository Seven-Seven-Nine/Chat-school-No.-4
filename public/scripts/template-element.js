'use strict';

/**
 * Сменить анимацию для html-элемента, например, с анимации открытия, на анимацию закрытия.
 * @param {string} idElement - id-элемента, для которого меняется CSS анимация.
 * @param {string} oldStyleAnimation - название старой CSS анимации, для удаления.
 * @param {string} newStyleAnimation - новая CSS анимация для элемента.
 */
function changeStyleAnimationElement(idElement, oldStyleAnimation, newStyleAnimation) {
    let element = document.getElementById(idElement);
    element.classList.remove(oldStyleAnimation);
    element.classList.add(newStyleAnimation);
}

export { changeStyleAnimationElement };
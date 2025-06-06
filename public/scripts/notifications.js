'use strict';

/**
 * Функция для создания уведомления.
 * @param {string} text - текст уведомления.
 * @param {string} color - цвет уведомления: 'red', 'green', 'blue' (по умолчанию 'green').
 * @param {number} autoHideDelay - время, через которое уведомление автоматически закроется (по умолчанию 3500 миллисекунд). 
 */
function showNotification(text, color = 'green', autoHideDelay = 3500) {
    const notification = document.createElement('div');
    notification.innerHTML = text;
    const notificationStyle = `notification-${color}`;
    notification.classList.add('notification');
    notification.classList.add(notificationStyle);
    document.getElementById('notification-container').appendChild(notification);
    notification.onclick = () => hideNotification(notification);
    setTimeout(() => {
        if (document.body.contains(notification)) hideNotification(notification);
    }, autoHideDelay);
}

/**
 * Функция для сокрытия уведомления при нажатии.
 * @param {HTMLDivElement} notificationElement - html-элемент созданного уведомления.
 */
function hideNotification(notificationElement) {
    notificationElement.classList.remove('show-notification');
    notificationElement.classList.add('hide-notification');
    setTimeout(() => {
        notificationElement.remove();
    }, 1000);
}

export { showNotification };
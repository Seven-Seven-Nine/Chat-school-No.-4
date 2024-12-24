/**
 * Класс для контроля чатов.
 */
export default class ChatManager {
    user;
    constructor(user) {
        this.user = user;
        console.debug('Инициализирован объект ChatManager.');
    }
    checkingAvailabilityUserChats() {
        if (this.user.getListChats !== '' && this.user.getListChats !== null) {
            console.debug('У пользователя успешно найдены чаты.');
            console.debug(this.user.getListChats);
        }
        else if (this.user.getListChats === null) {
            throw new Error('Список чатов пользователя равен null!');
        }
        else {
            console.debug('У пользователя не найдены чаты.');
        }
    }
}

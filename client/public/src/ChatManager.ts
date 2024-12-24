import User from "./User.js";

/**
 * Класс для контроля чатов.
 */
export default class ChatManager {
    private user: User;
    
    constructor(user: User) {
        this.user = user;
        console.debug('Инициализирован объект ChatManager.');
    }

    public checkingAvailabilityUserChats(): void {
        if (this.user.getListChats !== '' && this.user.getListChats !== null) {
            console.debug('У пользователя успешно найдены чаты.');
            console.debug(this.user.getListChats);
        } else if (this.user.getListChats === null) {
            throw new Error('Список чатов пользователя равен null!');
        } else {
            console.debug('У пользователя не найдены чаты.');
        }
    }
}
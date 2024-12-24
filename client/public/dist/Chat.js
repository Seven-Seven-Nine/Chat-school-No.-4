/**
 * Класс для чата.
 */
export default class Chat {
    name;
    users;
    constructor() {
        this.name = null;
        this.users = null;
    }
    get getNameChat() {
        return this.name;
    }
    get getCreatorChat() {
        let creatorChat = this.users?.get('creator');
        if (creatorChat !== undefined) {
            return creatorChat;
        }
        else {
            throw new Error('Создатель чата не определён!');
        }
    }
    get getUser() {
        return this.users;
    }
}

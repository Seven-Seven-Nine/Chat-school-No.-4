/**
 * Класс для чата.
 */
export default class Chat {
    private name: string | null;
    private users: Map<string, string> | null;

    constructor() {
        this.name = null;
        this.users = null;
    }

    public get getNameChat(): string | null {
        return this.name;
    }

    public get getCreatorChat(): string {
        let creatorChat = this.users?.get('creator');
        if (creatorChat !== undefined) {
            return creatorChat;
        } else {
            throw new Error('Создатель чата не определён!');
        }
    }

    public get getUser(): Map<string, string> | null {
        return this.users;
    }
}
import ResourceRequestController from "./ResourceRequestController.js";

/**
 * Класс пользователя, хранится все данные пользователя и манипулирует ими.
 */
export default class User {
    private resourceRequestController: ResourceRequestController;
    private role: string | null;
    private login: string | null;
    private email: string | null;
    private avatar: string | null;
    private token: string | null;
    private status: string | null;
    private listChats: string | null;

    constructor(resourceRequestController: ResourceRequestController) {
        this.infoDebug();

        this.resourceRequestController = resourceRequestController;
        this.role = null;
        this.login = null;
        this.email = null;
        this.avatar = null;
        this.token = null;
        this.status = null;
        this.listChats = null;

        this.checkingTokenInMemory();
    }

    private infoDebug() {
        console.debug('Инициализирован объект User.');
    }

    /**
     * Проверка на токен в памяти, в случае наличия токена, добавляет его в поле пользователя.
     */
    private checkingTokenInMemory(): void {
        if (window.localStorage.getItem('userToken') !== null) {
            console.debug('В локальном хранилище обнаружен токен пользователя.');
            this.token = window.localStorage.getItem('userToken');
        }
    }

    /**
     * Метод для получения данных пользователя, имея в наличии только токен пользователя.
     */
    public async requestReceiveAllUserData(): Promise<void> {
        if (this.token !== null) {
            console.debug('Инициализация всех данных пользователя через токен по запросу.');
            
            let jsonData: object = {
                'request': 'get_all_user_data',
                'token': this.token
            }
    
            try {
                this.resourceRequestController.startDownloadLine();

                let response: Response = await fetch(this.resourceRequestController.getUrl, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(jsonData)
                });
    
                if (response.ok) {
                    let result = await response.json();
                    
                    if (result.status === '200') {
                        this.role = result.body.user.role;
                        this.login = result.body.user.login;
                        this.email = result.body.user.email;
                        this.avatar = result.body.user.avatar_src;
                        this.listChats = result.body.user.list_chats;
                        console.debug(`Результат по списку чатов от сервера: ${typeof(result.body.user.list_chats)} ${result.body.user.list_chats}.`);
                        console.debug(`Полученный результат в итоге: ${typeof(this.listChats)} ${this.listChats}.`);
                        if (this.role === 'user') {
                            this.status = 'Пользователь';
                        } else if (this.role === 'admin') {
                            this.status = 'Администратор';
                        } else {
                            console.error('Обнаружена неизвестная роль пользователя!');
                        }
                    } else if (result.status === '200 error') {
                        if (result.body.error === 'user no found') {
                            throw new Error('Пользователь не найден по токену при попытке получения данных из сервера!');
                        } else {
                            console.error('Неизвестный ответ ошибки при получении данных пользователя по токену.');
                        }
                    } else {
                        console.error('Неизвестная ошибка при получении данных пользователя.');
                    }
                } else {
                    throw new Error('Ошибка сети.');
                }
            } catch (error) {
                throw new Error('Ошибка fetch запроса.');
            } finally {
                this.resourceRequestController.finishDownloadLine();
            }
        } else {
            throw new Error('Для получения данных пользователя требуется токен!');
        }
    }

    /**
     * Удаление всех данных пользователя.
     */
    public deleteDataUser(): void {
        console.debug('Объект User инициализировал метод удаления всех данных пользователя.');
        this.deleteTokenInMemory();
        this.role = null;
        this.login = null;
        this.email = null;
        this.avatar = null;
        this.token = null;
        this.status = null;
    }

    /**
     * Сохраняет имеющийся токен пользователя в память браузера.
     */
    public saveTokenInMemory(): void {
        if (this.token !== null) {
            console.debug('Сохранён новый токен пользователя в локальном хранилище.');
            window.localStorage.setItem('userToken', this.token);
        } else {
            throw new Error('Ошибка сохранения пустого токена пользователя в памяти.');
        }
    }

    /**
     * Удаляет сохранённый токен пользователя из памяти браузера.
     */
    public deleteTokenInMemory(): void {
        if (window.localStorage.getItem('userToken') !== null) {
            window.localStorage.removeItem('userToken');
        } else {
            throw new Error('Ошибка удаления пустого токена пользователя в памяти.');
        }
    }

    /**
     * Возвращает токен пользователя из памяти браузера.
     * @returns 
     */
    public getTokenInMemory(): string | null {
        if (window.localStorage.getItem('userToken') !== null) {
            return window.localStorage.getItem('userToken');
        } else {
            throw new Error('Ошибка возвращения пустого токена пользователя из памяти.');
        }
    }

    public set setRole(role: string) {
        this.role = role;
    }

    public set setLogin(login: string) {
        this.login = login;
    }

    public set setEmail(email: string) {
        this.email = email;
    }

    public set setAvatar(avatar: string) {
        this.avatar = avatar;
    }

    public set setToken(token: string) {
        this.token = token;
    }

    public set setStatus(status: string) {
        this.status = status;
    }

    public get getRole(): string | null {
        return this.role;
    }

    public get getLogin(): string | null {
        return this.login;
    }

    public get getEmail(): string | null {
        return this.email;
    }

    public get getAvatar(): string | null {
        return this.avatar;
    }

    public get getToken(): string | null {
        return this.token;
    }

    public get getStatus(): string | null {
        return this.status;
    }

    public get getListChats(): string | null  {
        return this.listChats;
    }
}
/**
 * Класс пользователя, хранится все данные пользователя и манипулирует ими.
 */
export default class User {
    resourceRequestController;
    role;
    login;
    email;
    avatar;
    token;
    status;
    constructor(resourceRequestController) {
        this.infoDebug();
        this.resourceRequestController = resourceRequestController;
        this.role = null;
        this.login = null;
        this.email = null;
        this.avatar = null;
        this.token = null;
        this.status = null;
        this.checkingTokenInMemory();
    }
    infoDebug() {
        console.debug('Инициализирован объект User.');
    }
    /**
     * Проверка на токен в памяти, в случае наличия токена, добавляет его в поле пользователя.
     */
    checkingTokenInMemory() {
        if (window.localStorage.getItem('userToken') !== null) {
            console.debug('В локальном хранилище обнаружен токен пользователя.');
            this.token = window.localStorage.getItem('userToken');
        }
    }
    /**
     * Метод для получения данных пользователя, имея в наличии только токен пользователя.
     */
    async requestReceiveAllUserData() {
        if (this.token !== null) {
            console.debug('Инициализация всех данных пользователя через токен по запросу.');
            let jsonData = {
                'request': 'get_all_user_data',
                'token': this.token
            };
            try {
                let response = await fetch(this.resourceRequestController.getUrl, {
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
                        if (this.role === 'user') {
                            this.status = 'Пользователь';
                        }
                        else if (this.role === 'admin') {
                            this.status = 'Администратор';
                        }
                        else {
                            console.error('Обнаружена неизвестная роль пользователя!');
                        }
                    }
                    else if (result.status === '200 error') {
                        if (result.body.error === 'user no found') {
                            throw new Error('Пользователь не найден по токену при попытке получения данных из сервера!');
                        }
                        else {
                            console.error('Неизвестный ответ ошибки при получении данных пользователя по токену.');
                        }
                    }
                    else {
                        console.error('Неизвестная ошибка при получении данных пользователя.');
                    }
                }
                else {
                    throw new Error('Ошибка сети.');
                }
            }
            catch (error) {
                throw new Error('Ошибка fetch запроса.');
            }
        }
        else {
            throw new Error('Для получения данных пользователя требуется токен!');
        }
    }
    /**
     * Сохраняет имеющийся токен пользователя в память браузера.
     */
    saveTokenInMemory() {
        if (this.token !== null) {
            console.debug('Сохранён новый токен пользователя в локальном хранилище.');
            window.localStorage.setItem('userToken', this.token);
        }
        else {
            throw new Error('Ошибка сохранения пустого токена пользователя в памяти.');
        }
    }
    /**
     * Удаляет сохранённый токен пользователя из памяти браузера.
     */
    deleteTokenInMemory() {
        if (window.localStorage.getItem('userToken') !== null) {
            window.localStorage.removeItem('userToken');
        }
        else {
            throw new Error('Ошибка удаления пустого токена пользователя в памяти.');
        }
    }
    /**
     * Возвращает токен пользователя из памяти браузера.
     * @returns
     */
    getTokenInMemory() {
        if (window.localStorage.getItem('userToken') !== null) {
            return window.localStorage.getItem('userToken');
        }
        else {
            throw new Error('Ошибка возвращения пустого токена пользователя из памяти.');
        }
    }
    set setRole(role) {
        this.role = role;
    }
    set setLogin(login) {
        this.login = login;
    }
    set setEmail(email) {
        this.email = email;
    }
    set setAvatar(avatar) {
        this.avatar = avatar;
    }
    set setToken(token) {
        this.token = token;
    }
    set setStatus(status) {
        this.status = status;
    }
    get getRole() {
        return this.role;
    }
    get getLogin() {
        return this.login;
    }
    get getEmail() {
        return this.email;
    }
    get getAvatar() {
        return this.avatar;
    }
    get getToken() {
        return this.token;
    }
    get getStatus() {
        return this.status;
    }
}

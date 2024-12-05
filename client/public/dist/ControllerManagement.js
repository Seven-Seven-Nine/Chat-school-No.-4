import AccountController from "./controllers/AccountController.js";
import AuthorizationController from "./controllers/AuthorizationController.js";
import PasswordRecoveryController from "./controllers/PasswordRecoveryController.js";
import RegistrationController from "./controllers/RegistrationController.js";
/**
 * Класс управления контроллерами, хранит массив всех контроллеров.
 */
export default class ControllerManagement {
    resourceRequestController;
    user;
    controllersArray = [];
    constructor(resourceRequestController, user) {
        this.resourceRequestController = resourceRequestController;
        this.user = user;
        this.debugInfo();
    }
    debugInfo() {
        console.debug('Инициализирован объект ControllerManagement.');
    }
    /**
     * Инициализация контроллера авторизации после загрузки проекта.
     */
    initializerAuthorizationController() {
        let authorizationController = this.controllersArray.find(controller => controller.nameController === 'authorizationController');
        setTimeout(() => {
            authorizationController?.showLayout();
        }, 1000);
    }
    /**
     * Добавление контроллеров в массив менеджера контроллеров.
     */
    async initializerControllers() {
        await this.controllersArray.push(new AuthorizationController(this.resourceRequestController, this, 'authorizationController'));
        await this.controllersArray.push(new RegistrationController(this.resourceRequestController, this, 'registrationController'));
        await this.controllersArray.push(new PasswordRecoveryController(this.resourceRequestController, this, 'passwordRecoveryController'));
        await this.controllersArray.push(new AccountController(this.resourceRequestController, this, 'accountController'));
        this.initializerAuthorizationController();
    }
    /**
     * Инициализирует вёрстку и события определённого контроллера.
     * @param nameController имя контроллера.
     */
    initializerSpecificController(nameController) {
        let controller = this.controllersArray.find(controller => controller.nameController === nameController);
        controller?.showLayout();
    }
    /* Методы для работы с объектом User  */
    /**
     * Положить определённые данные в поля пользователя из контроллеров.
     * @param nameField название поля пользователя, в которое необходимо положить данные.
     * @param parameter содержимое, которое необходимо положить в поле пользователя.
     */
    setUserData(nameField, parameter) {
        switch (nameField) {
            case 'role':
                this.user.setRole = parameter;
                break;
            case 'login':
                this.user.setLogin = parameter;
                break;
            case 'email':
                this.user.setEmail = parameter;
                break;
            case 'avatar':
                this.user.setAvatar = parameter;
                break;
            case 'token':
                this.user.setToken = parameter;
                break;
            case 'status':
                this.user.setStatus = parameter;
                break;
            default:
                throw new Error('Неизвестное имя поля для вложения данных в объект пользователя!');
        }
    }
    /**
     * Возвращает данные из полей пользователя, доступно из контроллеров.
     * @param nameField название поля пользователя, из которого необходимо взять данные.
     */
    getUserData(nameField) {
        switch (nameField) {
            case 'role':
                return this.user.getRole;
            case 'login':
                return this.user.getLogin;
            case 'email':
                return this.user.getEmail;
            case 'avatar':
                return this.user.getAvatar;
            case 'token':
                return this.user.getToken;
            case 'status':
                return this.user.getStatus;
            default:
                throw new Error('Неизвестное имя поля для возврата данных из объекта пользователя!');
        }
    }
    /**
     * Сохраняет имеющийся токен пользователя в локальное хранилище.
     */
    saveUserTokenInMemory() {
        this.user.saveTokenInMemory();
    }
    /**
     * Удаляет имеющийся токен пользователя из локального хранилища.
     */
    deleteUserTokenInMemory() {
        this.user.deleteTokenInMemory();
    }
    /**
     * Получить все данные недостающие данные пользователя через токен.
     */
    getAllUserDataUsingToken() {
        if (this.user.getToken === null) {
            throw new Error('Пустой токен для получения недостающих данных пользователя!');
        }
        else {
            this.user.requestReceiveAllUserData();
        }
    }
}

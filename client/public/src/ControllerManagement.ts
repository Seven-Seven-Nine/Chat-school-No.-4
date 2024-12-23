import Controller from "./Controller.js";
import AccountController from "./controllers/AccountController.js";
import SettingsAccountController from "./controllers/SettingsAccountController.js";
import AuthorizationController from "./controllers/AuthorizationController.js";
import PasswordRecoveryController from "./controllers/PasswordRecoveryController.js";
import RegistrationController from "./controllers/RegistrationController.js";
import SettingsController from "./controllers/SettingsController.js";
import ResourceRequestController from "./ResourceRequestController.js";
import Settings from "./Settings.js";
import User from "./User.js";
import ChatManager from "./ChatManager.js";

/**
 * Класс управления контроллерами, хранит массив всех контроллеров.
 */
export default class ControllerManagement {
    private resourceRequestController: ResourceRequestController;
    private user: User;
    private settings: Settings;
    private chatManager: ChatManager;
    private controllersArray: Controller[] = [];

    constructor(resourceRequestController: ResourceRequestController, user: User, settings: Settings, chatManager: ChatManager) {
        this.resourceRequestController = resourceRequestController;
        this.user = user;
        this.settings = settings;
        this.chatManager = chatManager;

        this.debugInfo();
    }

    private debugInfo(): void {
        console.debug('Инициализирован объект ControllerManagement.');
    }

    /**
     * Инициализация контроллера авторизации после загрузки проекта.
     */
    private initializerAuthorizationController():void {
        let authorizationController: Controller | undefined = this.controllersArray.find(controller => controller.nameController === 'authorizationController');
        setTimeout(() => {
            authorizationController?.showLayout();
        }, 1000);
    }

    /**
     * Добавление контроллеров в массив менеджера контроллеров.
     */
    public initializerControllers(): void {
        this.controllersArray.push(new AuthorizationController(this.resourceRequestController, this, 'authorizationController'));
        this.controllersArray.push(new RegistrationController(this.resourceRequestController, this, 'registrationController'));
        this.controllersArray.push(new PasswordRecoveryController(this.resourceRequestController, this, 'passwordRecoveryController'));
        this.controllersArray.push(new AccountController(this.resourceRequestController, this, 'accountController'));
        this.controllersArray.push(new SettingsController(this.resourceRequestController, this, 'settingsController'));
        this.controllersArray.push(new SettingsAccountController(this.resourceRequestController, this, 'settingsAccountController'));

        this.initializerAuthorizationController();
    }

    /**
     * Инициализирует вёрстку и события определённого контроллера.
     * @param nameController имя контроллера.
     */
    public initializerSpecificController(nameController: string) {
        let controller: Controller | undefined = this.controllersArray.find(controller => controller.nameController === nameController);
        controller?.showLayout();
    }

    /* Методы для работы с объектом User  */

    /**
     * Положить определённые данные в поля пользователя из контроллеров.
     * @param nameField название поля пользователя, в которое необходимо положить данные.
     * @param parameter содержимое, которое необходимо положить в поле пользователя.
     */
    public setUserData(nameField: string, parameter: string): void {
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
    public getUserData(nameField: string): string | null {
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
    public saveUserTokenInMemory(): void {
        this.user.saveTokenInMemory();
    }

    /**
     * Удаляет имеющийся токен пользователя из локального хранилища.
     */
    public deleteUserTokenInMemory(): void {
        this.user.deleteTokenInMemory();
    }

    /**
     * Получить все данные недостающие данные пользователя через токен.
     */
    public async getAllUserDataUsingToken(): Promise<void> {
        if (this.user.getToken === null) {
            throw new Error('Пустой токен для получения недостающих данных пользователя!');
        } else {
            await this.user.requestReceiveAllUserData();
            await this.chatManager.checkingAvailabilityUserChats();
        }
    }

    /**
     * Выйти из аккаунта пользователя.
     */
    public logOutOfAccountUser(): void {
        this.user.deleteDataUser();
    }

    /**
     * Сохранить настройки приложения.
     */
    public saveSettings(): void {
        this.settings.saveSettings();
    }

    /**
     * Удаление всех настроек приложения из локального хранилища.
     */
    public deleteAllSettings(): void {
        this.settings.deleteAllSettings();
    }

    /**
     * Изменение определённой настройки.
     * @param setting - название настройки.
     * @param value - значение настройки.
     */
    public changeSetting(setting: string, value: string): void {
        this.settings.changeSettings(setting, value);
    }
}
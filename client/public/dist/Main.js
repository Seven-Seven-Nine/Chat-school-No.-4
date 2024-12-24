import ChatManager from "./ChatManager.js";
import ControllerManagement from "./ControllerManagement.js";
import ResourceRequestController from "./ResourceRequestController.js";
import Settings from "./Settings.js";
import User from "./User.js";
/**
 * Основной класс инициализации объектов.
 */
class Main {
    resourceRequestController;
    controllerManagement;
    user;
    settings;
    chatManager;
    constructor() {
        this.infoDebug();
        this.resourceRequestController = new ResourceRequestController();
        this.user = new User(this.resourceRequestController);
        this.chatManager = new ChatManager(this.user);
        this.settings = new Settings();
        this.controllerManagement = new ControllerManagement(this.resourceRequestController, this.user, this.settings, this.chatManager);
    }
    infoDebug() {
        console.debug('Инициализирован основной объект Main.');
    }
    init() {
        this.controllerManagement.initializerControllers(); // Инициализация контроллеров.
    }
}
let main = new Main();
main.init();

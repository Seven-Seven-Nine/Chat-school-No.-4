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
    constructor() {
        this.infoDebug();
        this.resourceRequestController = new ResourceRequestController();
        this.user = new User(this.resourceRequestController);
        this.settings = new Settings();
        this.controllerManagement = new ControllerManagement(this.resourceRequestController, this.user, this.settings);
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

import ControllerManagement from "./ControllerManagement.js";
import ResourceRequestController from "./ResourceRequestController.js";
import User from "./User.js";
/**
 * Основной класс инициализации объектов.
 */
class Main {
    resourceRequestController;
    controllerManagement;
    user;
    constructor() {
        this.infoDebug();
        this.resourceRequestController = new ResourceRequestController();
        this.user = new User(this.resourceRequestController);
        this.controllerManagement = new ControllerManagement(this.resourceRequestController, this.user);
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

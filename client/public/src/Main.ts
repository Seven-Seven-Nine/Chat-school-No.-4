import ChatManager from "./ChatManager.js";
import ControllerManagement from "./ControllerManagement.js";
import ResourceRequestController from "./ResourceRequestController.js";
import Settings from "./Settings.js";
import User from "./User.js";

/**
 * Основной класс инициализации объектов.
 */
class Main {
    private resourceRequestController: ResourceRequestController;
    private controllerManagement: ControllerManagement;
    private user: User;
    private settings: Settings;
    private chatManager: ChatManager;

    constructor() {
        this.infoDebug();

        this.resourceRequestController = new ResourceRequestController();
        this.user = new User(this.resourceRequestController);
        this.chatManager = new ChatManager(this.user);
        this.settings = new Settings();
        this.controllerManagement = new ControllerManagement(this.resourceRequestController, this.user, this.settings, this.chatManager);
    }

    private infoDebug(): void {
        console.debug('Инициализирован основной объект Main.');
    }

    public init(): void {
        this.controllerManagement.initializerControllers(); // Инициализация контроллеров.
    }
}

let main: Main = new Main();
main.init();
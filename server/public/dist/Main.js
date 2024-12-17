import ControllerManager from "./ControllerManager.js";
import ResourceRequestController from "./ResourceRequestController.js";
class Main {
    resourceRequestController;
    controllerManager;
    constructor() {
        this.resourceRequestController = new ResourceRequestController();
        this.controllerManager = new ControllerManager(this.resourceRequestController);
    }
    main() {
        console.debug('Призыв Сатаны...');
        console.debug('Стана успешно провёл инициализацию основного класса.');
        this.initializerControllerManager();
    }
    initializerControllerManager() {
        this.controllerManager.main();
        this.controllerManager.initializerLayoutController('authorizationController');
    }
}
let main = new Main();
main.main();

import ControllerManager from "./ControllerManager.js";
import ResourceRequestController from "./ResourceRequestController.js";

class Main {
    private resourceRequestController: ResourceRequestController;
    private controllerManager: ControllerManager;
    
    constructor() {
        this.resourceRequestController = new ResourceRequestController();
        this.controllerManager = new ControllerManager(this.resourceRequestController);
    }

    public main(): void {
        console.debug('Призыв Сатаны...');
        console.debug('Стана успешно провёл инициализацию основного класса.');
        this.initializerControllerManager();
    }

    private initializerControllerManager(): void {
        this.controllerManager.main();
        this.controllerManager.initializerLayoutController('authorizationController');
    }
}

let main = new Main();
main.main();
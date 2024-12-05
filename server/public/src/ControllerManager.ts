import ApiStructure from "./controllers/ApiStructure.js";
import Controller from "./Controller.js";
import ResourceRequestController from "./ResourceRequestController.js";

export default class ControllerManager {
    private resourceRequestController: ResourceRequestController;
    private arrayControllers: Controller[];

    constructor(resourceRequestController: ResourceRequestController) {
        this.resourceRequestController = resourceRequestController;
        this.arrayControllers = [];
    }
    
    public main(): void {
        console.debug('Вызов седьмого круга ада...');
        console.debug('Черти успешно пробудили от сна объект ControllerManager.');
        this.initializerControllers();
    }

    /**
     * Инициализация контроллеров и добавление их в массив контроллеров.
     */
    private initializerControllers(): void {
        this.arrayControllers.push(new ApiStructure(this.resourceRequestController, this, 'apiStructure', 'server/apiStructure.html'));
    }
}
import AuthorizationController from "./controllers/AuthorizationController.js";
import Controller from "./Controller.js";
import ResourceRequestController from "./ResourceRequestController.js";

/**
 * Класс для управления контроллерами и связи между другими объектами.
 */
export default class ControllerManager {
    private resourceRequestController: ResourceRequestController;
    private arrayControllers: Controller[];

    constructor(resourceRequestController: ResourceRequestController) {
        this.resourceRequestController = resourceRequestController;
        this.arrayControllers = [];
    }
    
    /**
     * Основной метод вызова седьмого курага ада...
     */
    public main(): void {
        console.debug('Вызов седьмого круга ада...');
        console.debug('Черти успешно пробудили от сна объект ControllerManager.');
        this.initializerControllers();
    }

    /**
     * Метод для инициализации вёрстки определённого контроллера.
     * @param nameController - имя контроллера для инициализации вёрстки.
     */
    public initializerLayoutController(nameController: string): void {
        try {
            let controller: Controller | undefined = this.arrayControllers.find(controller => controller.getName === nameController);
            controller?.initializerController();
        } catch (error) {
            throw new Error('Ошибка инициализации вёрстки контроллера, проверь правильность написания имени контроллера.');
        }
    }

    /**
     * Инициализация контроллеров и добавление их в массив контроллеров.
     */
    private initializerControllers(): void {
        this.arrayControllers.push(new AuthorizationController(this.resourceRequestController, this, 'authorizationController', 'server/authorization.html'));
    }
}
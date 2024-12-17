import AuthorizationController from "./controllers/AuthorizationController.js";
/**
 * Класс для управления контроллерами и связи между другими объектами.
 */
export default class ControllerManager {
    resourceRequestController;
    arrayControllers;
    constructor(resourceRequestController) {
        this.resourceRequestController = resourceRequestController;
        this.arrayControllers = [];
    }
    /**
     * Основной метод вызова седьмого курага ада...
     */
    main() {
        console.debug('Вызов седьмого круга ада...');
        console.debug('Черти успешно пробудили от сна объект ControllerManager.');
        this.initializerControllers();
    }
    /**
     * Метод для инициализации вёрстки определённого контроллера.
     * @param nameController - имя контроллера для инициализации вёрстки.
     */
    initializerLayoutController(nameController) {
        try {
            let controller = this.arrayControllers.find(controller => controller.getName === nameController);
            controller?.initializerController();
        }
        catch (error) {
            throw new Error('Ошибка инициализации вёрстки контроллера, проверь правильность написания имени контроллера.');
        }
    }
    /**
     * Инициализация контроллеров и добавление их в массив контроллеров.
     */
    initializerControllers() {
        this.arrayControllers.push(new AuthorizationController(this.resourceRequestController, this, 'authorizationController', 'server/authorization.html'));
    }
}

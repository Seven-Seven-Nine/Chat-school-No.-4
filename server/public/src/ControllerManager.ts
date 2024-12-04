import Controller from "./Controller.js";

export default class ControllerManager {
    private arrayControllers: Controller[];

    constructor() {
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
        this.arrayControllers.push();
    }
}
/**
 * Абстрактный класс для всех контроллеров.
 */
export default class Controller {
    resourceRequestController;
    controllerManagement;
    name;
    constructor(resourceRequestController, controllerManagement, name) {
        this.resourceRequestController = resourceRequestController;
        this.controllerManagement = controllerManagement;
        this.name = name;
        this.debugInfo();
    }
    debugInfo() {
        console.debug(`Инициализирован контроллер ${this.name}.`);
    }
    /**
     * Добавление в DOM-дерево элементов контроллера и добавление событий для них.
     */
    async showLayout() {
        await this.createHtmlLayout();
        this.capturingHtmlElements();
    }
    get nameController() {
        return this.name;
    }
}

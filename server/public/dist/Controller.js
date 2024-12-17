/**
 * Класс контроллера, инициализирует вёрстку и захватывает HTML элементы для последующих событий при работе.
 */
export default class Controller {
    resourceRequestController;
    controllerManager;
    name;
    pathHtmlFile;
    constructor(resourceRequestController, controllerManager, name, pathHtmlFile) {
        console.debug(`Контроллер ${name} добавлен в массив контроллеров.`);
        this.resourceRequestController = resourceRequestController;
        this.controllerManager = controllerManager;
        this.name = name;
        this.pathHtmlFile = pathHtmlFile;
    }
    /**
     * Асинхронная инициализации вёрстки и захвата HTML элементов.
     */
    async initializerController() {
        console.debug(`Призыв демона-контролёра ${this.name}`);
        await this.createHtmlLayout();
        await this.captureHtmlElements();
    }
    get getName() {
        return this.name;
    }
    /**
     * Добавление HTML вёрстки из сервера в окно браузера.
     */
    async createHtmlLayout() {
        let root = document.getElementById('root');
        root.innerHTML = await this.resourceRequestController.getHtml(this.pathHtmlFile);
    }
}

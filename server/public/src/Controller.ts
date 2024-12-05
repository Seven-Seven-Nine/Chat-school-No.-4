import ControllerManager from "./ControllerManager.js";
import ResourceRequestController from "./ResourceRequestController.js";

/**
 * Класс контроллера, инициализирует вёрстку и захватывает HTML элементы для последующих событий при работе.
 */
export default abstract class Controller {
    private resourceRequestController: ResourceRequestController;
    protected controllerManager: ControllerManager;
    protected name: string;
    protected pathHtmlFile: string;

    constructor(resourceRequestController: ResourceRequestController, controllerManager: ControllerManager, name: string, pathHtmlFile: string) {
        console.debug(`Контроллер ${name} добавлен в массив контроллеров.`);

        this.resourceRequestController = resourceRequestController;
        this.controllerManager = controllerManager;
        this.name = name;
        this.pathHtmlFile = pathHtmlFile;
    }

    /**
     * Асинхронная инициализации вёрстки и захвата HTML элементов.
     */
    public async initializerController(): Promise<void> {
        await this.createHtmlLayout();
        await this.captureHtmlElements();
    }

    /**
     * Добавление HTML вёрстки из сервера в окно браузера. 
     */
    private async createHtmlLayout(): Promise<void> {
        let root: HTMLDivElement = document.getElementById('root') as HTMLDivElement;
        root.innerHTML = await this.resourceRequestController.getHtml(this.pathHtmlFile);
    }

    /**
     * Захват HTML элементов для установление событий.
     */
    abstract captureHtmlElements(): void;
}
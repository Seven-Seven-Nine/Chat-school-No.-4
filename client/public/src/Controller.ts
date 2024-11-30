import ControllerManagement from "./ControllerManagement.js";
import ResourceRequestController from "./ResourceRequestController.js";

/**
 * Абстрактный класс для всех контроллеров.
 */
export default abstract class Controller {
    protected resourceRequestController: ResourceRequestController;
    protected controllerManagement: ControllerManagement;
    protected name: string;

    constructor(resourceRequestController: ResourceRequestController, controllerManagement: ControllerManagement, name: string) {
        this.resourceRequestController = resourceRequestController;
        this.controllerManagement = controllerManagement;
        this.name = name;
        
        this.debugInfo();
    }

    private debugInfo() {
        console.debug(`Инициализирован контроллер ${this.name}.`);
    }

    /**
     * Абстрактный метод создания html вёрстки.
     * Для загрузки html из сервера, необходимо сделать этот метод асинхронным и
     * прописать await this.resourceRequestController.getHtml('название-html-файла.html') в innerHTML.
     */
    abstract createHtmlLayout(): Promise<void>;

    /**
     * Абстрактный метод, в котором необходимо прописать события для html элементов.
     */
    abstract capturingHtmlElements(): void;

    /**
     * Добавление в DOM-дерево элементов контроллера и добавление событий для них.
     */
    public async showLayout(): Promise<void> {
        await this.createHtmlLayout();
        this.capturingHtmlElements();
    }

    public get nameController(): string {
        return this.name;
    }
}
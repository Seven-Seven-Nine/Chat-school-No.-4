import ControllerManager from "./ControllerManager.js";

export default abstract class Controller {
    protected controllerManager: ControllerManager;
    protected name: string;

    constructor(controllerManager: ControllerManager, name: string) {
        this.controllerManager = controllerManager;
        this.name = name;
    }
}
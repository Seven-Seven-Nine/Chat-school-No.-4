import ControllerManager from "./ControllerManager.js";
class Main {
    controllerManager;
    constructor() {
        this.controllerManager = new ControllerManager();
    }
    main() {
        console.debug('Призыв Сатаны.');
        console.debug('Стана успешно провёл инициализацию основного класса.');
        this.initializerControllerManager();
    }
    initializerControllerManager() {
        this.controllerManager.main();
    }
}
let main = new Main();
main.main();

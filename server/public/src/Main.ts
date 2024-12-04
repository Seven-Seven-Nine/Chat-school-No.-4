import ControllerManager from "./ControllerManager.js";

class Main {
    private controllerManager: ControllerManager;
    
    constructor() {
        this.controllerManager = new ControllerManager();
    }

    public main(): void {
        console.debug('Призыв Сатаны...');
        console.debug('Стана успешно провёл инициализацию основного класса.');
        this.initializerControllerManager();
    }

    private initializerControllerManager(): void {
        this.controllerManager.main();
    }
}

let main = new Main();
main.main();
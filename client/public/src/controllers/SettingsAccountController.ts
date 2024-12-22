import Controller from "../Controller.js";

/**
 * Контроллер настройки аккаунта.
 */
export default class SettingsAccountController extends Controller {
    override async createHtmlLayout(): Promise<void> {
        let main: HTMLDivElement = document.getElementById('main') as HTMLDivElement;
        main.innerHTML = await this.resourceRequestController.getHtml('settingsAccount.html');
    }

    override capturingHtmlElements(): void {
        // Нахуя!?
    }
}
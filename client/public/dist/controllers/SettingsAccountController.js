import Controller from "../Controller.js";
/**
 * Контроллер настройки аккаунта.
 */
export default class SettingsAccountController extends Controller {
    async createHtmlLayout() {
        let main = document.getElementById('main');
        main.innerHTML = await this.resourceRequestController.getHtml('settingsAccount.html');
    }
    capturingHtmlElements() {
    }
}

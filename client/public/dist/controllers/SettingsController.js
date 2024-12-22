import Controller from "../Controller.js";
/**
 * Контроллер настройки аккаунта.
 */
export default class SettingsController extends Controller {
    async createHtmlLayout() {
        let main = document.getElementById('main');
        main.innerHTML = await this.resourceRequestController.getHtml('settings.html');
    }
    capturingHtmlElements() {
        let backArrow = document.getElementById('back-arrow-settings');
        let logo = document.getElementById('logo-settings');
        let blueColor = document.getElementById('blue-color');
        let orangeColor = document.getElementById('orange-color');
        let violetColor = document.getElementById('violet-color');
        let redColor = document.getElementById('red-color');
        let blackColor = document.getElementById('black-color');
        let greenColor = document.getElementById('green-color');
        let yellowColor = document.getElementById('yellow-color');
        let linkAccountSettings = document.getElementById('link-account-settings');
        let resetIcon = document.getElementById('reset-icon');
        if (backArrow !== null) {
            backArrow.onclick = () => this.onclickBackArrow();
        }
        if (logo !== null) {
            logo.onclick = () => this.onclickLogo();
        }
        if (blueColor !== null) {
            blueColor.onclick = () => this.onclickFocusColor('blue');
        }
        if (orangeColor !== null) {
            orangeColor.onclick = () => this.onclickFocusColor('orange');
        }
        if (violetColor !== null) {
            violetColor.onclick = () => this.onclickFocusColor('violet');
        }
        if (redColor !== null) {
            redColor.onclick = () => this.onclickFocusColor('red');
        }
        if (blackColor !== null) {
            blackColor.onclick = () => this.onclickFocusColor('black');
        }
        if (greenColor !== null) {
            greenColor.onclick = () => this.onclickFocusColor('green');
        }
        if (yellowColor !== null) {
            yellowColor.onclick = () => this.onclickFocusColor('yellow');
        }
        if (linkAccountSettings !== null) {
            linkAccountSettings.onclick = () => this.onclickLinkAccountSettings();
        }
        if (resetIcon !== null) {
            resetIcon.onclick = () => this.onclickResetIcon();
        }
    }
    /**
     * Обработчик событий для стрелки назад.
     */
    onclickBackArrow() {
        this.controllerManagement.initializerSpecificController('accountController');
    }
    /**
     * Обработчик событий для лого.
     */
    onclickLogo() {
        this.controllerManagement.initializerSpecificController('accountController');
    }
    /**
     * Обработчик событий для акцентного цвета
     * @param color - название цвета.
     */
    onclickFocusColor(color) {
        switch (color) {
            case 'blue':
                document.documentElement.style.setProperty('--color-focus', 'blue');
                document.documentElement.style.setProperty('--color-focus-text', 'white');
                this.controllerManagement.changeSetting('focusColor', 'blue');
                break;
            case 'orange':
                document.documentElement.style.setProperty('--color-focus', 'orange');
                document.documentElement.style.setProperty('--color-focus-text', 'white');
                this.controllerManagement.changeSetting('focusColor', 'orange');
                break;
            case 'violet':
                document.documentElement.style.setProperty('--color-focus', 'violet');
                document.documentElement.style.setProperty('--color-focus-text', 'white');
                this.controllerManagement.changeSetting('focusColor', 'violet');
                break;
            case 'red':
                document.documentElement.style.setProperty('--color-focus', 'red');
                document.documentElement.style.setProperty('--color-focus-text', 'white');
                this.controllerManagement.changeSetting('focusColor', 'red');
                break;
            case 'black':
                document.documentElement.style.setProperty('--color-focus', 'black');
                document.documentElement.style.setProperty('--color-focus-text', 'white');
                this.controllerManagement.changeSetting('focusColor', 'white');
                break;
            case 'green':
                document.documentElement.style.setProperty('--color-focus', 'green');
                document.documentElement.style.setProperty('--color-focus-text', 'white');
                this.controllerManagement.changeSetting('focusColor', 'green');
                break;
            case 'yellow':
                document.documentElement.style.setProperty('--color-focus', 'yellow');
                document.documentElement.style.setProperty('--color-focus-text', 'black');
                this.controllerManagement.changeSetting('focusColor', 'black');
                break;
            default:
                throw new Error('Неизвестное название цвета!');
        }
    }
    /**
     * Обработчик события для ссылки на настройки аккаунта.
     */
    onclickLinkAccountSettings() {
        this.controllerManagement.initializerSpecificController('settingsAccountController');
    }
    /**
     * Обработчик события для иконки сброса настроек.
     */
    onclickResetIcon() {
        this.controllerManagement.deleteAllSettings();
    }
}

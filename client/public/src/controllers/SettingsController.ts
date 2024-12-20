import Controller from "../Controller.js";

/**
 * Контроллер настройки аккаунта.
 */
export default class SettingsController extends Controller {
    async createHtmlLayout(): Promise<void> {
        let main: HTMLDivElement = document.getElementById('main') as HTMLDivElement;
        main.innerHTML = await this.resourceRequestController.getHtml('setting.html');
    }

    capturingHtmlElements(): void {
        let backArrow: HTMLParagraphElement = document.getElementById('back-arrow-settings') as HTMLParagraphElement;
        let logo: HTMLElement = document.getElementById('logo-settings') as HTMLElement;
        let blueColor: HTMLDivElement = document.getElementById('blue-color') as HTMLDivElement;
        let orangeColor: HTMLDivElement = document.getElementById('orange-color') as HTMLDivElement;
        let violetColor: HTMLDivElement = document.getElementById('violet-color') as HTMLDivElement;
        let redColor: HTMLDivElement = document.getElementById('red-color') as HTMLDivElement;
        let blackColor: HTMLDivElement = document.getElementById('black-color') as HTMLDivElement;
        let greenColor: HTMLDivElement = document.getElementById('green-color') as HTMLDivElement;
        let yellowColor: HTMLDivElement = document.getElementById('yellow-color') as HTMLDivElement;
        let resetIcon: HTMLElement = document.getElementById('reset-icon') as HTMLElement;

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
        if (resetIcon !== null) {
            resetIcon.onclick = () => this.onclickResetIcon();
        }
    }

    /**
     * Обработчик событий для стрелки назад.
     */
    private onclickBackArrow(): void {
        this.controllerManagement.initializerSpecificController('accountController');
    }

    /**
     * Обработчик событий для лого.
     */
    private onclickLogo(): void {
        this.controllerManagement.initializerSpecificController('accountController');
    }

    /**
     * Обработчик событий для акцентного цвета
     * @param color - название цвета.
     */
    private onclickFocusColor(color: string): void {
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
     * Обработчик события для иконки сброса настроек.
     */
    private onclickResetIcon(): void {
        this.controllerManagement.deleteAllSettings();
    }
}
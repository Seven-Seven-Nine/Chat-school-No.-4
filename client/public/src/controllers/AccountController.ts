import Controller from "../Controller.js";

export default class AccountController extends Controller {
    async createHtmlLayout(): Promise<void> {
        let main: HTMLDivElement = document.getElementById('main') as HTMLDivElement;
        main.innerHTML = await this.resourceRequestController.getHtml('account/account.html');
    }

    capturingHtmlElements(): void {
        let iconBurgerMenu: HTMLElement = document.getElementById('account-list-icon-main-menu') as HTMLElement;
        let iconPointsMenu: HTMLElement = document.getElementById('account-chat-top-div-panel-menu') as HTMLElement;

        if (iconBurgerMenu !== null) {
            iconBurgerMenu.onclick = () => this.onclickCreateSideMainMenu();
        }
        if (iconPointsMenu !== null) {
            iconPointsMenu.onclick = () => this.onclickCreateChatMenu();
        }
    }

    /**
     * Создание бокового основного меню контроллера.
     */
    private async onclickCreateSideMainMenu(): Promise<void> {
        await this.createHtmlSideMainMenu();
        this.capturingSideMainMenuElements();
    }

    /**
     * Создание меню чата.
     */
    private onclickCreateChatMenu(): void {
        alert('В разработке...');
    }

    /**
     * Загрузка html данных основного бокового меню из серверной части.
     */
    private async createHtmlSideMainMenu(): Promise<void> {
        let divSideMenu: HTMLDivElement = document.getElementById('account-div-main-side-menu') as HTMLDivElement;
        divSideMenu.style.display = 'block';
        divSideMenu.innerHTML = await this.resourceRequestController.getHtml('account/account_main_side_menu.html');
    }

    /**
     * Добавление событий для элементов основного бокового меню.
     */
    private capturingSideMainMenuElements(): void {
        let divSideMenu: HTMLDivElement = document.getElementById('account-div-main-side-menu') as HTMLDivElement;
        let sideMenu: HTMLDivElement = document.getElementById('account-main-side-menu') as HTMLDivElement;
        let deadZoneMenu: HTMLDivElement = document.getElementById('account-main-side-menu-dead-zone') as HTMLDivElement;
        let btnSetting: HTMLDivElement = document.getElementById('main-menu-button-setting') as HTMLDivElement;
        let btnExit: HTMLDivElement = document.getElementById('main-menu-button-exit') as HTMLDivElement;
        
        // Эти элементы передаются дальше в метод initializingDataUserInMainSideMenu().
        let paragraphLoginInMainSideMenu: HTMLParagraphElement = document.getElementById('account-main-side-menu-login') as HTMLParagraphElement;
        let paragraphStatusInMainSideMenu: HTMLParagraphElement = document.getElementById('account-main-side-menu-status') as HTMLParagraphElement;

        if (deadZoneMenu !== null) {
            deadZoneMenu.onclick = () => this.onclickDeleteSideMainMenu(divSideMenu, sideMenu, deadZoneMenu);
        }
        if (btnSetting !== null) {
            btnSetting.onclick = () => this.onclickSettingBtn();
        }
        if (btnExit !== null) {
            btnExit.onclick = () => this.onclickExitBtn();
        }
        if (paragraphLoginInMainSideMenu !== null && paragraphStatusInMainSideMenu !== null) {
            this.initializingDataUserInMainSideMenu(paragraphLoginInMainSideMenu, paragraphStatusInMainSideMenu);
        }
    }

    /**
     * Закрытие и удаление основного бокового меню.
     */
    private onclickDeleteSideMainMenu(divSideMenu: HTMLDivElement, sideMenu: HTMLDivElement, deadZoneMenu: HTMLDivElement): void {
        sideMenu.style.animation = 'close-main-menu 0.8s forwards';
        deadZoneMenu.style.animation = 'close-dead-zone 0.4s forwards';
        
        setTimeout(() => {
            divSideMenu.textContent = '';
            divSideMenu.style.display = 'none';
        }, 500);
    }

    /**
     * Событие на кнопку настроек в основном меню.
     */
    private onclickSettingBtn(): void {
        this.controllerManagement.initializerSpecificController('settingsController');
    }

    /**
     * Событие на кнопку выхода в основном меню.
     */
    private onclickExitBtn(): void {
        this.controllerManagement.logOutOfAccountUser();
        this.controllerManagement.initializerSpecificController('authorizationController');
    }

    /**
     * Добавление логина и статуса пользователя в вёрстку основного бокового меню.
     * @param paragraphLoginInMainSideMenu html-элемент, абзац для логина.
     * @param paragraphStatusInMainSideMenu html-элемент, абзац для статуса.
     */
    private initializingDataUserInMainSideMenu(paragraphLoginInMainSideMenu: HTMLParagraphElement, paragraphStatusInMainSideMenu: HTMLParagraphElement): void {
        paragraphLoginInMainSideMenu.innerHTML = `${this.controllerManagement.getUserData('login')}`;
        if (this.controllerManagement.getUserData('role') === 'admin') {
            paragraphStatusInMainSideMenu.style.color = 'red';
        }
        paragraphStatusInMainSideMenu.innerHTML = `${this.controllerManagement.getUserData('status')}`;
    } 
}
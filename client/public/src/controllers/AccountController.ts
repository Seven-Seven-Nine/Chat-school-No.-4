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
            iconBurgerMenu.onclick = () => this.createSideMainMenu();
        }
        if (iconPointsMenu !== null) {
            iconPointsMenu.onclick = () => this.createChatMenu();
        }
    }

    /**
     * Создание бокового основного меню контроллера.
     */
    private async createSideMainMenu(): Promise<void> {
        await this.createHtmlSideMainMenu();
        this.capturingSideMainMenuElements();
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
        
        let paragraphLoginInMainSideMenu: HTMLParagraphElement = document.getElementById('account-main-side-menu-login') as HTMLParagraphElement;
        let paragraphStatusInMainSideMenu: HTMLParagraphElement = document.getElementById('account-main-side-menu-status') as HTMLParagraphElement;

        if (deadZoneMenu !== null) {
            deadZoneMenu.onclick = () => this.onclickDeleteSideMainMenu(divSideMenu, sideMenu, deadZoneMenu);
        }
        if (paragraphLoginInMainSideMenu !== null && paragraphStatusInMainSideMenu !== null) {
            this.initializingDataUserInMainSideMenu(paragraphLoginInMainSideMenu, paragraphStatusInMainSideMenu);
        }
    }

    /**
     * Закрытие и удаление основного бокового меню.
     */
    private onclickDeleteSideMainMenu(divSideMenu: HTMLDivElement, sideMenu: HTMLDivElement, deadZoneMenu: HTMLDivElement): void {
        sideMenu.style.animation = 'close-main-menu 1s forwards';
        deadZoneMenu.style.animation = 'close-dead-zone 0.4s forwards';
        
        setTimeout(() => {
            divSideMenu.textContent = '';
            divSideMenu.style.display = 'none';
        }, 500);
    }

    private createChatMenu(): void {
        alert('В разработке...');
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
        console.log(this.controllerManagement.getUserData('token'));
    } 
}
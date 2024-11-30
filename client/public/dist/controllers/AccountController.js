import Controller from "../Controller.js";
export default class AccountController extends Controller {
    async createHtmlLayout() {
        let main = document.getElementById('main');
        main.innerHTML = await this.resourceRequestController.getHtml('account/account.html');
    }
    capturingHtmlElements() {
        let iconBurgerMenu = document.getElementById('account-list-icon-main-menu');
        let iconPointsMenu = document.getElementById('account-chat-top-div-panel-menu');
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
    async createSideMainMenu() {
        await this.createHtmlSideMainMenu();
        this.capturingSideMainMenuElements();
    }
    /**
     * Загрузка html данных основного бокового меню из серверной части.
     */
    async createHtmlSideMainMenu() {
        let divSideMenu = document.getElementById('account-div-main-side-menu');
        divSideMenu.style.display = 'block';
        divSideMenu.innerHTML = await this.resourceRequestController.getHtml('account/account_main_side_menu.html');
    }
    /**
     * Добавление событий для элементов основного бокового меню.
     */
    capturingSideMainMenuElements() {
        let divSideMenu = document.getElementById('account-div-main-side-menu');
        let sideMenu = document.getElementById('account-main-side-menu');
        let deadZoneMenu = document.getElementById('account-main-side-menu-dead-zone');
        let paragraphLoginInMainSideMenu = document.getElementById('account-main-side-menu-login');
        let paragraphStatusInMainSideMenu = document.getElementById('account-main-side-menu-status');
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
    onclickDeleteSideMainMenu(divSideMenu, sideMenu, deadZoneMenu) {
        sideMenu.style.animation = 'close-main-menu 1s forwards';
        deadZoneMenu.style.animation = 'close-dead-zone 0.4s forwards';
        setTimeout(() => {
            divSideMenu.textContent = '';
            divSideMenu.style.display = 'none';
        }, 500);
    }
    createChatMenu() {
        alert('В разработке...');
    }
    /**
     * Добавление логина и статуса пользователя в вёрстку основного бокового меню.
     * @param paragraphLoginInMainSideMenu html-элемент, абзац для логина.
     * @param paragraphStatusInMainSideMenu html-элемент, абзац для статуса.
     */
    initializingDataUserInMainSideMenu(paragraphLoginInMainSideMenu, paragraphStatusInMainSideMenu) {
        paragraphLoginInMainSideMenu.innerHTML = `${this.controllerManagement.getUserData('login')}`;
        if (this.controllerManagement.getUserData('role') === 'admin') {
            paragraphStatusInMainSideMenu.style.color = 'red';
        }
        paragraphStatusInMainSideMenu.innerHTML = `${this.controllerManagement.getUserData('status')}`;
        console.log(this.controllerManagement.getUserData('token'));
    }
}

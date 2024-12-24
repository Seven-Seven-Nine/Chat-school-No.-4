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
            iconBurgerMenu.onclick = () => this.onclickCreateSideMainMenu();
        }
        if (iconPointsMenu !== null) {
            iconPointsMenu.onclick = () => this.onclickCreateChatMenu();
        }
        // this.checkChatsUser();
    }
    // private async checkChatsUser(): Promise<void> {
    //     let checkUserInChats: boolean = await this.controllerManagement.checkingUserChats();
    //     console.debug(`Контроллер AccountController получил результат проверки наличии чатов пользователя: ${checkUserInChats}.`);
    //     if (checkUserInChats === true) {
    //         console.debug('Чаты пользователя успешно найдены.');
    //     } else {
    //         console.debug(`Чаты пользователя не найдены.`);
    //     }
    // }
    /**
     * Создание бокового основного меню контроллера.
     */
    async onclickCreateSideMainMenu() {
        await this.createHtmlSideMainMenu();
        this.capturingSideMainMenuElements();
    }
    /**
     * Создание меню чата.
     */
    onclickCreateChatMenu() {
        alert('В разработке...');
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
        let btnSetting = document.getElementById('main-menu-button-setting');
        let btnExit = document.getElementById('main-menu-button-exit');
        // Эти элементы передаются дальше в метод initializingDataUserInMainSideMenu().
        let paragraphLoginInMainSideMenu = document.getElementById('account-main-side-menu-login');
        let paragraphStatusInMainSideMenu = document.getElementById('account-main-side-menu-status');
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
    onclickDeleteSideMainMenu(divSideMenu, sideMenu, deadZoneMenu) {
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
    onclickSettingBtn() {
        this.controllerManagement.initializerSpecificController('settingsController');
    }
    /**
     * Событие на кнопку выхода в основном меню.
     */
    onclickExitBtn() {
        this.controllerManagement.logOutOfAccountUser();
        this.controllerManagement.initializerSpecificController('authorizationController');
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
    }
}

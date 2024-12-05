import Controller from "../Controller.js";
import Validator from "../Validator.js";
/**
 * Контроллер для регистрации.
 */
export default class RegistrationController extends Controller {
    async createHtmlLayout() {
        let main = document.getElementById('main');
        main.innerHTML = await this.resourceRequestController.getHtml('registration.html');
    }
    capturingHtmlElements() {
        let form = document.getElementById('registration-form');
        let logo = document.getElementById('registration-logo');
        let buttonConfirm = document.getElementById('registration-btn-confirm');
        let linkAuthorization = document.getElementById('registration-link-authorization');
        if (form !== null) {
            form.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    buttonConfirm.click();
                }
            });
        }
        if (logo !== null) {
            logo.onclick = () => this.onclickLogo();
        }
        if (buttonConfirm !== null) {
            buttonConfirm.onclick = () => this.onclickBtnConfirm();
        }
        if (linkAuthorization !== null) {
            linkAuthorization.onclick = () => this.onclickLinkAuthorization();
        }
    }
    onclickLogo() {
        window.location.href = '/';
    }
    onclickBtnConfirm() {
        let inputLogin = document.getElementById('registration-input-login');
        let inputEmail = document.getElementById('registration-input-email');
        let inputPassword = document.getElementById('registration-input-password');
        let inputRePassword = document.getElementById('registration-input-rePassword');
        let validator = new Validator();
        let checkingFormFields = validator.registrationValidation(inputLogin, inputEmail, inputPassword, inputRePassword);
        if (checkingFormFields) {
            console.debug('Валидация формы регистрации пройдена.');
            this.registrationRequest(inputLogin, inputEmail, inputPassword);
        }
        else {
            console.debug('Валидация формы регистрации не пройдена.');
        }
    }
    onclickLinkAuthorization() {
        this.controllerManagement.initializerSpecificController('authorizationController');
    }
    /**
     * Отправляет логин, почту и пароль на сервер для регистрации пользователя.
     * @param inputLogin html-элемент, поле логина.
     * @param inputEmail html-элемент, поле почты.
     * @param inputPassword html-элемент, поле пароля.
     */
    async registrationRequest(inputLogin, inputEmail, inputPassword) {
        console.debug('Отправка данных на сервер для регистрации.');
        let dataJson = {
            'request': 'registration',
            'login': inputLogin.value,
            'email': inputEmail.value,
            'password': inputPassword.value,
        };
        try {
            this.resourceRequestController.startDownloadLine();
            let response = await fetch(this.resourceRequestController.getUrl, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(dataJson),
            });
            if (response.ok) {
                let result = await response.json();
                if (result.status === '200') {
                    if (result.body.user === 'user is registered') {
                        console.debug('Пользователь зарегистрирован.');
                        await this.controllerManagement.setUserData('login', inputLogin.value);
                        await this.controllerManagement.setUserData('email', inputEmail.value);
                        await this.controllerManagement.setUserData('token', result.body.token);
                        await this.controllerManagement.saveUserTokenInMemory();
                        await this.controllerManagement.getAllUserDataUsingToken();
                        this.clearError();
                        this.rightInput(inputLogin, 'Логин');
                        this.rightInput(inputEmail, 'Почта');
                        await this.controllerManagement.initializerSpecificController('accountController');
                    }
                }
                else if (result.status === '200 error') {
                    if (result.body.error === 'user is already registered') {
                        console.debug('Пользователь уже зарегистрирован.');
                        this.outputError('Пользователь уже зарегистрирован.');
                        this.errorInput(inputLogin, 'Логин или почта заняты');
                        this.errorInput(inputEmail, 'Логин или почта заняты');
                    }
                }
                else {
                    console.error('Неизвестный статус ответа от сервера в попытках регистрации пользователя!');
                }
            }
            else {
                throw new Error('Ошибка сети!');
            }
        }
        catch (error) {
            throw new Error('Ошибка fetch запроса.');
        }
        finally {
            this.resourceRequestController.finishDownloadLine();
        }
    }
    outputError(message) {
        let divErrorText = document.getElementById('registration-div-error-text');
        divErrorText.innerHTML = `<p class='error-text'>${message}</p>`;
    }
    clearError() {
        let divErrorText = document.getElementById('registration-div-error-text');
        divErrorText.textContent = '';
    }
    errorInput(input, textPlaceholder) {
        input.value = '';
        input.placeholder = textPlaceholder;
        input.className = 'input-error';
    }
    rightInput(input, textPlaceholder) {
        input.placeholder = textPlaceholder;
        input.classList.remove('input-error');
    }
}

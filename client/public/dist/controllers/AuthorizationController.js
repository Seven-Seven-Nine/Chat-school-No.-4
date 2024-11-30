import Controller from "../Controller.js";
import Validator from "../Validator.js";
/**
 * Контролер для авторизации.
 */
export default class AuthorizationController extends Controller {
    async createHtmlLayout() {
        let main = document.getElementById('main');
        main.innerHTML = await this.resourceRequestController.getHtml('authorization.html');
    }
    capturingHtmlElements() {
        let form = document.getElementById('authorization-form');
        let logo = document.getElementById('authorization-logo');
        let buttonConfirm = document.getElementById('authorization-btn-confirm');
        let linkRegistration = document.getElementById('authorization-link-registration');
        let linkRecoveryPassword = document.getElementById('authorization-link-recovery-password');
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
        if (linkRegistration !== null) {
            linkRegistration.onclick = () => this.onclickLinkRegistration();
        }
        if (linkRecoveryPassword !== null) {
            linkRecoveryPassword.onclick = () => this.onclickLinkRecoveryPassword();
        }
        this.checkingTokenInMemory();
    }
    /**
     * Проверка на наличие токена, если токен не равен null, то следует авторизация через токен.
     */
    checkingTokenInMemory() {
        if (this.controllerManagement.getUserData('token') !== null) {
            this.authorizationRequestViaToken();
        }
    }
    onclickLogo() {
        window.location.href = '/';
    }
    onclickBtnConfirm() {
        let inputLogin = document.getElementById('authorization-input-login');
        let inputPassword = document.getElementById('authorization-input-password');
        let validator = new Validator();
        let checkingFormFields = validator.authorizationValidation(inputLogin, inputPassword);
        if (checkingFormFields === true) {
            console.debug('Валидация формы авторизации пройдена.');
            this.authorizationRequest(inputLogin, inputPassword);
        }
        else {
            console.debug('Валидация формы авторизации не пройдена.');
        }
    }
    onclickLinkRegistration() {
        this.controllerManagement.initializerSpecificController('registrationController');
    }
    onclickLinkRecoveryPassword() {
        this.controllerManagement.initializerSpecificController('passwordRecoveryController');
    }
    /**
     * Отправляет логин и пароль, или токен, на сервер для авторизации, получает токен из сервера.
     * @param inputLogin html-элемент, поле логина.
     * @param inputPassword html-элемент, поле пароля.
     */
    async authorizationRequest(inputLogin, inputPassword) {
        console.debug('Отправка данных на сервер для авторизации.');
        let dataJson = {
            'request': 'authorization',
            'login': inputLogin.value,
            'password': inputPassword.value,
        };
        try {
            let response = await fetch(this.resourceRequestController.getUrl, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(dataJson),
            });
            if (response.ok) {
                let result = await response.json();
                if (result.status === '200') {
                    if (result.body.message === 'authorization allowed') {
                        console.debug('Пользователь прошёл авторизацию.');
                        this.rightInput(inputPassword, 'Пароль');
                        await this.controllerManagement.setUserData('token', result.body.token);
                        await this.controllerManagement.saveUserTokenInMemory();
                        await this.controllerManagement.getAllUserDataUsingToken();
                        await this.controllerManagement.initializerSpecificController('accountController');
                    }
                    else {
                        console.error('Неизвестный ответ сообщения от сервера.');
                    }
                }
                else if (result.status === '200 error') {
                    if (result.body.error === 'user no found') {
                        console.debug('Пользователь не найден в базе данных.');
                        this.errorInput(inputLogin, 'Пользователь не найден');
                    }
                    else if (result.body.error === 'password does not match') {
                        console.debug('Пароли пользователя не совпадают.');
                        this.errorInput(inputPassword, 'Пароль не совпадает');
                    }
                    else {
                        console.error('Неизвестная ошибка авторизации пользователя.');
                    }
                }
                else {
                    console.error('Неизвестный статус ответа от сервера в попытках авторизации пользователя!');
                }
            }
            else {
                throw new Error('Ошибка сервера!');
            }
        }
        catch (error) {
            throw new Error('Ошибка Fetch запроса!');
        }
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
    /**
     * Авторизация пользователя через токен.
     */
    async authorizationRequestViaToken() {
        console.debug('Отправка токена пользователя на сервер для авторизации.');
        let jsonData = {
            'request': 'authorization',
            'token': this.controllerManagement.getUserData('token'),
        };
        try {
            let response = await fetch(this.resourceRequestController.getUrl, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(jsonData),
            });
            if (response.ok) {
                let result = await response.json();
                if (result.status === '200') {
                    if (result.body.message === 'authorization allowed') {
                        console.debug('Авторизация через токен пользователя прошла успешно.');
                        this.clearError();
                        await this.controllerManagement.setUserData('token', result.body.token);
                        await this.controllerManagement.saveUserTokenInMemory();
                        await this.controllerManagement.getAllUserDataUsingToken();
                        await this.controllerManagement.initializerSpecificController('accountController');
                    }
                    else {
                        console.error('Неизвестный ответ сообщения от сервера.');
                    }
                }
                else if (result.status === '200 error') {
                    console.debug('Токены пользователя не совпадают.');
                    this.outputError('Токены пользователя не совпадают.');
                }
                else {
                    console.error('Неизвестная ошибка авторизации пользователя.');
                }
            }
            else {
                throw new Error('Ошибка сети.');
            }
        }
        catch (error) {
            throw new Error('Ошибка fetch запроса.');
        }
    }
    outputError(message) {
        let divErrorText = document.getElementById('authorization-div-error-text');
        divErrorText.innerHTML = `<p class='error-text'>${message}</p>`;
    }
    clearError() {
        let divErrorText = document.getElementById('authorization-div-error-text');
        divErrorText.textContent = '';
    }
}

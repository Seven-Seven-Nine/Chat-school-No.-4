import Controller from "../Controller.js";
import Validator from "../Validator.js";

/**
 * Контроллер для регистрации.
 */
export default class RegistrationController extends Controller {
    async createHtmlLayout(): Promise<void> {
        let main: HTMLDivElement = document.getElementById('main') as HTMLDivElement;
        main.innerHTML = await this.resourceRequestController.getHtml('registration.html');
    }

    capturingHtmlElements(): void {
        let form: HTMLFormElement = document.getElementById('registration-form') as HTMLFormElement;
        let logo: HTMLElement = document.getElementById('registration-logo') as HTMLElement;
        let buttonConfirm: HTMLButtonElement = document.getElementById('registration-btn-confirm') as HTMLButtonElement;
        let linkAuthorization: HTMLParagraphElement = document.getElementById('registration-link-authorization') as HTMLParagraphElement;

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

    private onclickLogo(): void {
        window.location.href = '/';
    }

    private onclickBtnConfirm(): void {
        let inputLogin: HTMLInputElement = document.getElementById('registration-input-login') as HTMLInputElement;
        let inputEmail: HTMLInputElement = document.getElementById('registration-input-email') as HTMLInputElement;
        let inputPassword: HTMLInputElement = document.getElementById('registration-input-password') as HTMLInputElement;
        let inputRePassword: HTMLInputElement = document.getElementById('registration-input-rePassword') as HTMLInputElement;

        let validator = new Validator();
        let checkingFormFields = validator.registrationValidation(inputLogin, inputEmail, inputPassword, inputRePassword);

        if (checkingFormFields) {
            console.debug('Валидация формы регистрации пройдена.');
            this.registrationRequest(inputLogin, inputEmail, inputPassword);
        } else {
            console.debug('Валидация формы регистрации не пройдена.');
        }
    }

    private onclickLinkAuthorization(): void {
        this.controllerManagement.initializerSpecificController('authorizationController');
    }

    /**
     * Отправляет логин, почту и пароль на сервер для регистрации пользователя.
     * @param inputLogin html-элемент, поле логина.
     * @param inputEmail html-элемент, поле почты.
     * @param inputPassword html-элемент, поле пароля.
     */
    private async registrationRequest(inputLogin: HTMLInputElement, inputEmail: HTMLInputElement, inputPassword: HTMLInputElement): Promise<void> {
        console.debug('Отправка данных на сервер для регистрации.');
        let dataJson: object = {
            'request': 'registration',
            'login': inputLogin.value,
            'email': inputEmail.value,
            'password': inputPassword.value,
        }

        try {
            this.resourceRequestController.startDownloadLine();

            let response: Response = await fetch(this.resourceRequestController.getUrl, {
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
                } else if (result.status === '200 error') {
                    if (result.body.error === 'user is already registered') {
                        console.debug('Пользователь уже зарегистрирован.');
                        this.outputError('Пользователь уже зарегистрирован.');
                        this.errorInput(inputLogin, 'Логин или почта заняты');
                        this.errorInput(inputEmail, 'Логин или почта заняты');
                    }
                } else {
                    console.error('Неизвестный статус ответа от сервера в попытках регистрации пользователя!');
                }
            } else {
                throw new Error('Ошибка сети!');
            }
        } catch (error) {
            throw new Error('Ошибка fetch запроса.');
        } finally {
            this.resourceRequestController.finishDownloadLine();
        }
    }

    private outputError(message: string): void {
        let divErrorText: HTMLDivElement = document.getElementById('registration-div-error-text') as HTMLDivElement;
        divErrorText.innerHTML = `<p class='error-text'>${message}</p>`;
    }

    private clearError(): void {
        let divErrorText: HTMLDivElement = document.getElementById('registration-div-error-text') as HTMLDivElement;
        divErrorText.textContent = '';
    }

    private errorInput(input: HTMLInputElement, textPlaceholder: string) {
        input.value = '';
        input.placeholder = textPlaceholder;
        input.className = 'input-error';
    }

    private rightInput(input: HTMLInputElement, textPlaceholder: string) {
        input.placeholder = textPlaceholder;
        input.classList.remove('input-error');
    }
}
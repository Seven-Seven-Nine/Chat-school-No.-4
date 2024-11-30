import Controller from "../Controller.js";
import Validator from "../Validator.js";

export default class PasswordRecoveryController extends Controller {
    async createHtmlLayout(): Promise<void> {
        let main: HTMLDivElement = document.getElementById('main') as HTMLDivElement;
        main.innerHTML = await this.resourceRequestController.getHtml('passwordRecovery.html');
    }

    capturingHtmlElements(): void {
        let buttonConfirm: HTMLButtonElement = document.getElementById('password-recovery-btn-confirm') as HTMLButtonElement;
        let linkAuthorization: HTMLParagraphElement = document.getElementById('password-recovery-link-authorization') as HTMLParagraphElement;
        let linkRegistration: HTMLParagraphElement = document.getElementById('password-recovery-link-registration') as HTMLParagraphElement;

        if (buttonConfirm !== null) {
            buttonConfirm.onclick = () => this.onclickBtnConfirm();
        }
        if (linkAuthorization !== null) {
            linkAuthorization.onclick = () => this.onclickLinkAuthorization();
        }
        if (linkRegistration !== null) {
            linkRegistration.onclick = () => this.onclickLinkRegistration();
        }
    }

    private onclickBtnConfirm(): void {
        let inputEmail: HTMLInputElement = document.getElementById('password-recovery-input-mail') as HTMLInputElement;

        let validator: Validator = new Validator();
        let checkingFormField = validator.passwordRecoveryValidation(inputEmail);

        if (checkingFormField) {
            console.debug('Валидация формы восстановления пароля пройдена.');
        } else {
            console.debug('Валидация формы восстановления пароля не пройдена.');
        }
    }

    private onclickLinkAuthorization(): void {
        this.controllerManagement.initializerSpecificController('authorizationController');
    }

    private onclickLinkRegistration(): void {
        this.controllerManagement.initializerSpecificController('registrationController');
    }
}
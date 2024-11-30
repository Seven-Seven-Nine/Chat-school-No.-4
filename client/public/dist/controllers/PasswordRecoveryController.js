import Controller from "../Controller.js";
import Validator from "../Validator.js";
export default class PasswordRecoveryController extends Controller {
    async createHtmlLayout() {
        let main = document.getElementById('main');
        main.innerHTML = await this.resourceRequestController.getHtml('passwordRecovery.html');
    }
    capturingHtmlElements() {
        let buttonConfirm = document.getElementById('password-recovery-btn-confirm');
        let linkAuthorization = document.getElementById('password-recovery-link-authorization');
        let linkRegistration = document.getElementById('password-recovery-link-registration');
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
    onclickBtnConfirm() {
        let inputEmail = document.getElementById('password-recovery-input-mail');
        let validator = new Validator();
        let checkingFormField = validator.passwordRecoveryValidation(inputEmail);
        if (checkingFormField) {
            console.debug('Валидация формы восстановления пароля пройдена.');
        }
        else {
            console.debug('Валидация формы восстановления пароля не пройдена.');
        }
    }
    onclickLinkAuthorization() {
        this.controllerManagement.initializerSpecificController('authorizationController');
    }
    onclickLinkRegistration() {
        this.controllerManagement.initializerSpecificController('registrationController');
    }
}

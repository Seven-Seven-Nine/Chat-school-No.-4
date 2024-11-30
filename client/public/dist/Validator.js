/**
 * Класс валидации полей формы.
 */
export default class Validator {
    constructor() {
        this.infoDebug();
    }
    infoDebug() {
        console.debug('Инициализирован объект Validator для проверки полей формы.');
    }
    /**
     * Изменение placeholder и стиля для поля при не пройденном условие проверки.
     * @param input html-element, обычное поле формы.
     * @param textPlaceholder текст для placeholder поля.
     */
    inputError(input, textPlaceholder) {
        input.value = '';
        input.placeholder = textPlaceholder;
        input.className = 'input-error';
    }
    /**
     * Изменение placeholder и стиля для поля на первоначальные.
     * @param input html-element, обычное поле формы.
     * @param textPlaceholder текст для placeholder поля.
     */
    inputRight(input, textPlaceholder) {
        input.placeholder = textPlaceholder;
        input.classList.remove('input-error');
    }
    /**
     * Проверка валидации формы авторизации, в зависимости от проверки возвращает true или false.
     * @param inputLogin html-элемент, поле логина.
     * @param inputPassword html-элемент, поле пароля.
     * @returns
     */
    authorizationValidation(inputLogin, inputPassword) {
        let login = inputLogin.value;
        let password = inputPassword.value;
        let loginVerification = false;
        let passwordVerification = false;
        if (login.length > 26 || login.length < 3 || login === '') {
            loginVerification = false;
            this.inputError(inputLogin, 'Слишком длинный или короткий логин');
        }
        else {
            loginVerification = true;
            this.inputRight(inputLogin, 'Логин');
        }
        if (password.length > 128 || password.length < 5 || password === '') {
            passwordVerification = false;
            this.inputError(inputPassword, 'Слишком длинный или короткий пароль');
        }
        else {
            passwordVerification = true;
            this.inputRight(inputPassword, 'Пароль');
        }
        if (loginVerification === true && passwordVerification === true) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * Проверка валидации формы регистрации,, в зависимости от условие возвращает true или false.
     * @param inputLogin html-элемент, поле логина.
     * @param inputEmail html-элемент, поле почты.
     * @param inputPassword html-элемент, поле пароля.
     * @param inputRePassword html-элемент, поле повтора пароля.
     */
    registrationValidation(inputLogin, inputEmail, inputPassword, inputRePassword) {
        let login = inputLogin.value;
        let email = inputEmail.value;
        let password = inputPassword.value;
        let rePassword = inputRePassword.value;
        let loginVerification = false;
        let emailVerification = false;
        let passwordVerification = false;
        let rePasswordVerification = false;
        if (login.length > 26 || login.length < 3 || login === '') {
            loginVerification = false;
            this.inputError(inputLogin, 'Слишком длинный или короткий логин');
        }
        else {
            loginVerification = true;
            this.inputRight(inputLogin, 'Логин');
        }
        if (email.length > 36 || email.length < 4 || email === '') {
            emailVerification = false;
            this.inputError(inputEmail, 'Слишком длинная или короткая почта');
        }
        else {
            emailVerification = true;
            this.inputRight(inputEmail, 'Почта');
        }
        if (password.length > 128 || password.length < 5 || password === '') {
            passwordVerification = false;
            this.inputError(inputPassword, 'Слишком длинный или короткий пароль');
        }
        else {
            passwordVerification = true;
            this.inputRight(inputPassword, 'Пароль');
        }
        if (rePassword !== password) {
            rePasswordVerification = false;
            this.inputError(inputRePassword, 'Пароли не совпадают');
        }
        else {
            rePasswordVerification = true;
            this.inputRight(inputRePassword, 'Повторите пароль');
        }
        if (loginVerification === true && emailVerification === true && passwordVerification === true && rePasswordVerification === true) {
            return true;
        }
        else {
            return false;
        }
    }
    passwordRecoveryValidation(inputEmail) {
        let email = inputEmail.value;
        let emailVerification = false;
        if (email.length > 36 || email.length < 4 || email === '') {
            emailVerification = false;
            this.inputError(inputEmail, 'Слишком длинный или короткий логин');
        }
        else {
            emailVerification = true;
            this.inputRight(inputEmail, 'Почта');
        }
        if (emailVerification) {
            return true;
        }
        else {
            return false;
        }
    }
}

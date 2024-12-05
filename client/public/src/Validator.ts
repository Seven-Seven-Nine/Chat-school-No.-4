/**
 * Класс валидации полей формы.
 */
export default class Validator {
    constructor() {
        this.infoDebug();
    }

    private infoDebug(): void {
        console.debug('Инициализирован объект Validator для проверки полей формы.');
    }
    
    /**
     * Изменение placeholder и стиля для поля при не пройденном условие проверки.
     * @param input html-element, обычное поле формы.
     * @param textPlaceholder текст для placeholder поля.
     */
    private inputError(input: HTMLInputElement, textPlaceholder: string): void {
        input.value = '';
        input.placeholder = textPlaceholder;
        input.className = 'input-error';
    }

    /**
     * Изменение placeholder и стиля для поля на первоначальные.
     * @param input html-element, обычное поле формы.
     * @param textPlaceholder текст для placeholder поля.
     */
    private inputRight(input: HTMLInputElement, textPlaceholder: string): void {
        input.placeholder = textPlaceholder;
        input.classList.remove('input-error');
    }

    /**
     * Проверка валидации формы авторизации, в зависимости от проверки возвращает true или false.
     * @param inputLogin html-элемент, поле логина.
     * @param inputPassword html-элемент, поле пароля.
     * @returns 
     */
    public authorizationValidation(inputLogin: HTMLInputElement, inputPassword: HTMLInputElement): boolean {
        let login: string = inputLogin.value;
        let password: string = inputPassword.value;

        let loginVerification: boolean = false;
        let passwordVerification: boolean = false;

        if (login.length > 26 || login.length < 3 || login === '') {
            loginVerification = false;
            this.inputError(inputLogin, 'Слишком длинный или короткий логин');
        } else {
            loginVerification = true;
            this.inputRight(inputLogin, 'Логин');
        }

        if (password.length > 128 || password.length < 5 || password === '') {
            passwordVerification = false;
            this.inputError(inputPassword, 'Слишком длинный или короткий пароль');
        } else {
            passwordVerification = true;
            this.inputRight(inputPassword, 'Пароль');
        }

        if (loginVerification === true && passwordVerification === true) {
            return true;
        } else {
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
    public registrationValidation(inputLogin: HTMLInputElement, inputEmail: HTMLInputElement, inputPassword: HTMLInputElement, inputRePassword: HTMLInputElement): boolean {
        let login: string = inputLogin.value;
        let email: string = inputEmail.value;
        let password: string = inputPassword.value;
        let rePassword: string = inputRePassword.value;

        let loginVerification: boolean = false;
        let emailVerification: boolean = false;
        let passwordVerification: boolean = false;
        let rePasswordVerification: boolean = false;

        if (login.length > 26 || login.length < 3 || login === '') {
            loginVerification = false;
            this.inputError(inputLogin, 'Слишком длинный или короткий логин');
        } else {
            loginVerification = true;
            this.inputRight(inputLogin, 'Логин');
        }

        if (email.length > 36 || email.length < 4 || email === '') {
            emailVerification = false;
            this.inputError(inputEmail, 'Слишком длинная или короткая почта');
        } else {
            emailVerification = true;
            this.inputRight(inputEmail, 'Почта');
        }

        if (password.length > 128 || password.length < 5 || password === '') {
            passwordVerification = false;
            this.inputError(inputPassword, 'Слишком длинный или короткий пароль');
        } else {
            passwordVerification = true;
            this.inputRight(inputPassword, 'Пароль');
        }

        if (rePassword !== password) {
            rePasswordVerification = false;
            this.inputError(inputRePassword, 'Пароли не совпадают');
        } else {
            rePasswordVerification = true;
            this.inputRight(inputRePassword, 'Повторите пароль');
        }

        if (loginVerification === true && emailVerification === true && passwordVerification === true && rePasswordVerification === true) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Проверка валидации форма для восстановления пароля, возвращает true или false.
     * @param inputEmail html-элемент, поле почты.
     * @returns 
     */
    public passwordRecoveryValidation(inputEmail: HTMLInputElement): boolean {
        let email = inputEmail.value;
        let emailVerification: boolean = false;

        if (email.length > 36 || email.length < 4 || email === '') {
            emailVerification = false;
            this.inputError(inputEmail, 'Слишком длинная или короткая почта');
        } else {
            emailVerification = true;
            this.inputRight(inputEmail, 'Почта');
        }

        if (emailVerification) {
            return true;
        } else {
            return false;
        }
    }
}
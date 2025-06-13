import { showNotification } from "./notifications.js";

/**
 * Функция для отправки fetch-запроса с JSON по адресу.
 * @param {object} object - объект для конвертации в JSON.
 * @param {string} link - адрес для отправки запроса.
 * @param {string} method - http-метод (по умолчанию POST).
 * @returns JSON-ответ от сервера.
 */
async function sendJSONRequest(object, link, method = 'POST') {
    try {
        const request = await fetch(link, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        });

        if (request.ok) {
            const response = await request.json();
            return response;
        } else {
            console.error(`Ошибка HTTP-запроса, статус: ${request.status}`);
        }
    } catch (error) {
        console.error(`Ошибка отправки fetch-запроса: ${error}`);
    }
}

/**
 * Запрос на авторизацию пользователя, возвращает true, если пользователь успешно авторизовался.
 * @param {object} JSON - объект с ключами: 'login', 'password'.
 * @returns 
 */
async function userAuthorization(JSON) {
    const response = await sendJSONRequest(JSON, '/api/user/authorization.php');
    if (response['result'] && response['result'] === 'user authorization is successful') return true;
    if (response['error']) showNotification(response['error message'], 'red');
    return false;
}

/**
 * Запрос на регистрацию пользователя, возвращает true, если пользователь успешно зарегистрировался.
 * @param {string} JSON - объект с ключами: 'login', 'email', 'password'. 
 * @returns 
 */
async function userRegistration(JSON) {
    const response = await sendJSONRequest(JSON, '/api/user/registration.php');
    if (response.result && response.result === 'authorization is successful') return true;
    if (response.error) showNotification(response['error message'], 'red');
    return false;
}

/**
 * Запрос на проверку наличия сохранённой сессии пользователя, возвращает true, если найдена сессия пользователя.
 */
async function checkingForUserSession() {
    const response = await sendJSONRequest({}, '/api/session/checking_for_session_availability.php');
    if (response.result && response.result === 'the user\'s session was found') return true;
    return false;
}

/**
 * Запрос на удаление сессии пользователя.
 * @returns 
 */
async function logout() {
    const response = await sendJSONRequest({}, '/api/user/logout.php');
    if (response.result && response.result === 'the session is destroyed') return true;
    return false;
}

/**
 * Запрос на обновления данных пользователя, возвращает true при успешном обновлении данных.
 * @param {object} JSON - объект с ключами: 'login', 'role', 'email', 'path_to_avatar';
 * @returns 
 */
async function updateUser(JSON) {
    const response = await sendJSONRequest(JSON, '/api/user/user-update.php');
    if (response.result && response.result === 'the user\'s data has been updated') return true;
    if (response.error) showNotification(response['error message'], 'red');
    return false;
}

/**
 * Запрос на обновление пароля пользователя, возвращает true при успешном обновлении пароля.
 * @param {*} JSON - объект с ключами: 'login', 'current_password', 'new_password';
 * @returns
 */
async function passwordUpdate(JSON) {
    const response = await sendJSONRequest(JSON, '/api/user/password-update.php');
    if (response.result && response.result === 'password has been successfully updated') return true;
    if (response.error) showNotification(response['error message'], 'red');
    return false;
}

/**
 * Запрос на получение сохранённой сессии пользователя.
 * @returns возвращает данные сессии в JSON.
 */
async function getUserSession() {
    const response = await sendJSONRequest({}, '/api/session/get_user_session.php');
    if (response.result && response.result === 'the session was successfully found in full') return response;
    if (response.error) showNotification(response['error message'], 'red');
}

/**
 * Отправить изображение на сервер, в formData обязательно должно быть одно изображение.
 * Возвращает true при успешном сохранении изображения.
 * @param {FormData} formData 
 * @returns
 */
async function sendImage(formData) {
    try {
        const response = await fetch('/api/user/save-user-avatar.php', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const json = await response.json();
            if (json.result && json.result === 'the file was saved successfully') return true;
            if (json.error) showNotification(json['error message'], 'red');
            return false;
        } else {
            console.error(`Ошибка HTTP-запроса для отправки изображения, статус: ${request.status}`);
            return false;
        }
    } catch (error) {
        console.error(`Ошибка отправки fetch-запроса для сохранения изображения: ${error}`);
        return false;
    }
}

export { sendJSONRequest, userAuthorization, userRegistration, checkingForUserSession, logout, updateUser, passwordUpdate, getUserSession, sendImage };
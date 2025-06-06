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
        console.error(`Ошибка отправки запроса для регистрации пользователя: ${error}`);
    }
}

/**
 * Функция отправки fetch-запроса для сохранения сессии.
 * Необходимо собрать объект с ключами и значениями для отправки на сервер.
 * Разрешённые ключи: login, role, email.
 * @param {object} object - объект для конвертации в JSON.
 */
async function saveSession(object) {
    const response = await sendJSONRequest(object, '/app/sessions/Session.php?action=save');
    if (response['session result'] !== 'saved') {
        throw new Error(`Ошибка сохранения сессии пользователя: ${response['session result']}.`);
    }
}

/**
 * Функция для получения сессии текущего пользователя.
 * @returns возвращает объект с сессией пользователя.
 */
async function getSession() {
    const response = await sendJSONRequest({}, '/app/sessions/Session.php?action=get_session');
    if (response['session result'] === 'the user session does not exist') {
        throw new Error('Сессия пользователя не существует.');
    } else {
        return response;
    }
}

/**
 * Функция отправки fetch-запроса для проверки данных с сессией пользователя.
 * Необходимо собрать объект с ключами и значениями для отправки на сервер.
 * Разрешённые ключи: login, role, email.
 * @param {*} object 
 * @returns возвращает true, если данные совпадают с сессией.
 */
async function checkSession(object) {
    const response = await sendJSONRequest(object, '/app/sessions/Session.php?action=check_session');
    if (response['session result'] !== 'the session is correct') {
        throw new Error(`Ошибка проверки данных с сессией пользователя: ${response['session result']}.`);
    } else {
        return true;
    }
}

/**
 * Функция для проверки сохранённой сессии пользователя.
 * @returns возвращает true, если сессия пользователя найдена, false - не найдена.
 */
async function checkingAvailabilitySession() {
    const response = await sendJSONRequest({}, '/app/sessions/Session.php?action=checking_availability')
    if (response['session result'] === 'the user session was found') {
        return true;
    } else {
        return false;
    }
}

export { sendJSONRequest, saveSession, getSession, checkSession, checkingAvailabilitySession };
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
        const response = await fetch(link, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        });

        if (response.ok) {
            const json = await response.json();
            return json;
        } else {
            console.error(`Ошибка HTTP-запроса, статус: ${response.status}`);
        }
    } catch (error) {
        console.error(`Ошибка отправки fetch-запроса: ${error}`);
    }
}

/**
 * Отправка fetch-запроса с FormData по адресу.
 * @param {FormData} formData - объекта FormData. 
 * @param {string} link - адрес для отправки запроса.
 * @param {string} method - http-метод (по умолчанию POST).
 * @returns JSON-ответ от сервера.
 */
async function sendFormDataRequest(formData, link, method = 'POST') {
    try {
        const response = await fetch(link, {
            method: method,
            body: formData
        });

        if (response.ok) {
            const json = await response.json();
            return json;
        } else {
            console.error(`Ошибка HTTP-запроса для отправки изображения, статус: ${response.status}`);
        }
    } catch (error) {
        console.error(`Ошибка отправки fetch-запроса: ${error}`);
    }
}

/**
 * Запрос на авторизацию пользователя.
 * @param {object} JSON - объект с ключами: 'login', 'password'.
 * @returns возвращает true, если пользователь успешно авторизовался
 */
async function userAuthorization(JSON) {
    const response = await sendJSONRequest(JSON, '/api/user/authorization.php');
    if (response['result'] && response['result'] === 'user authorization is successful') return true;
    if (response['error']) showNotification(response['error message'], 'red');
    return false;
}

/**
 * Запрос на регистрацию пользователя.
 * @param {string} JSON - объект с ключами: 'login', 'email', 'password'. 
 * @returns возвращает true, если пользователь успешно зарегистрировался
 */
async function userRegistration(JSON) {
    const response = await sendJSONRequest(JSON, '/api/user/registration.php');
    if (response.result && response.result === 'authorization is successful') return true;
    if (response.error) showNotification(response['error message'], 'red');
    return false;
}

/**
 * Запрос на проверку наличия сохранённой сессии пользователя.
 * @returns возвращает true, если найдена сессия пользователя
 */
async function checkingForUserSession() {
    const response = await sendJSONRequest({}, '/api/session/checking_for_session_availability.php');
    if (response.result && response.result === 'the user\'s session was found') return true;
    return false;
}

/**
 * Запрос на удаление сессии пользователя.
 * @returns возвращает true при удалении сессии.
 */
async function logout() {
    const response = await sendJSONRequest({}, '/api/user/logout.php');
    if (response.result && response.result === 'the session is destroyed') return true;
    return false;
}

/**
 * Запрос на обновления данных пользователя.
 * @param {object} JSON - объект с ключами: 'login', 'role', 'email', 'path_to_avatar';
 * @returns возвращает true при успешном обновлении данных.
 */
async function updateUser(JSON) {
    const response = await sendJSONRequest(JSON, '/api/user/user-update.php');
    if (response.result && response.result === 'the user\'s data has been updated') return true;
    if (response.error) showNotification(response['error message'], 'red');
    return false;
}

/**
 * Запрос на обновление пароля пользователя.
 * @param {*} JSON - объект с ключами: 'login', 'current_password', 'new_password';
 * @returns возвращает true при успешном обновлении пароля.
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
 * Запрос на сохранения пользовательского автара.
 * @param {FormData} formData - объект FormData: 'file'.
 * @returns возвращает true при успешном сохранении изображения.
 */
async function saveUserAvatar(formData) {
    const response = await sendFormDataRequest(formData, '/api/user/save-user-avatar.php');
    if (response.result && response.result === 'the file was saved successfully') return true;
    if (response.error) showNotification(response['error message'], 'red');
    return false;
}

/**
 * Отправляет запрос для получения активных чатов пользователя.
 * @returns возвращает 'none' при ошибке или при отсутствии чатов, в успешном случае возвращает JSON с данными чата
 */
async function loadingChat() {
    const response = await sendJSONRequest({}, '/api/chat/loading-chat.php');
    if (response.result && response.result === 'chats found successfully') return response;
    if (response.result && response.result === 'the user does not have any active chats') return 'none';
    if (response.error) showNotification(response['error message'], 'red');
    return 'none';
}

/**
 * Запрос на создания чата.
 * @param {FormData} formData - объект FormData: 'title', 'file'. 
 * @returns возвращает true при успешном создании чата или false
 */
async function creatingChat(formData) {
    const response = await sendFormDataRequest(formData, '/api/chat/creating-chat.php');
    if (response.result && response.result === 'the chat was created successfully') return true;
    if (response.error) showNotification(response['error message'], 'red');
    return false;
}

/**
 * Запрос на получение данных чата.
 * @param {object} JSON - объект с ключом: 'id_chat'. 
 * @returns возвращает json с данными чата, при успешном исходе
 */
async function getChatData(JSON) {
    const response = await sendJSONRequest(JSON, '/api/chat/get-chat-data.php');
    if (response.result && response.result === 'chat found successfully') return response;
    if (response.error) showNotification(response['error message'], 'red');
    return false;
}

/**
 * Запрос на удаление чата.
 * @param {object} JSON - объект с ключом: 'id_chat'; 
 * @returns возвращает true при успешном удалении чата
 */
async function deleteChat(JSON) {
    const response = await sendJSONRequest(JSON, '/api/chat/delete-chat.php');
    if (response.result && response.result === 'the chat was successfully deleted') return true;
    if (response.error) showNotification(response['error message'], 'red');
    return false;
}

/**
 * Запрос на отправку сообщения пользователя.
 * @param {object} JSON - объект с ключами: 'id_chat', 'text'. 
 * @returns возвращает true, если сообщение успешно отправлено
 */
async function sendMessage(JSON) {
    const response = await sendJSONRequest(JSON, '/api/chat/add-message.php');
    if (response.result && response.result === 'the message was successfully added') return true;
    if (response.error) showNotification(response['error message'], 'red');
    return false;
}

/**
 * Запрос на получения количества сообщений в базе данных.
 * @param {object} JSON - объект с ключом: 'id_chat'. 
 * @returns возвращает количество сообщений или false.
 */
async function getNumberChatMessages(JSON) {
    const response = await sendJSONRequest(JSON, '/api/chat/get-number-chat-messages.php');
    if (response.result && response.result === 'successfully receiving the number of chat messages') return response['number of messages'];
    if (response.error) showNotification(response['error message'], 'red');
    return false;
}

/**
 * Запрос на получение всех сообщений чата.
 * @param {object} JSON - объект с ключом: 'id_chat'.
 * @returns возвращает JSON с данными сообщения.
 */
async function getAllChatMessages(JSON) {
    const response = await sendJSONRequest(JSON, '/api/chat/get-all-messages.php');
    if (response.result && response.result === 'messages received successfully') return response;
    if (response.error) showNotification(response['error message'], 'red');
    return false;
}

/**
 * Функция получения данных пользователей.
 * @returns возвращает JSON с данными пользователя.
 */
async function getDataAllUsers() {
    const response = await sendJSONRequest({}, '/api/user/get-all-users.php');
    if (response.result && response.result === 'user data has been successfully received') return response;
    if (response.error) showNotification(response['error message'], 'red');
    return false;
}

/**
 * Запрос добавления пользователя в чат.
 * @param {*} JSON - объект с ключами: 'login', 'id_chat'.
 * @returns true - пользователь успешно добавлен, false - ошибка добавления пользователя.
 */
async function addUserChat(JSON) {
    const response = await sendJSONRequest(JSON, '/api/chat/add-user-chat.php');
    if (response.result && response.result === 'the user has been successfully added to the chat') return true;
    if (response.error) showNotification(response['error message'], 'red');
    return false;
}

/**
 * Запрос поиска пользователей по логину.
 * @param {object} JSON - объект с ключом: 'login'.
 * @returns true - поиск завершён успешно, false - ошибка поиска пользователя.
 */
async function userSearch(JSON) {
    const response = await sendJSONRequest(JSON, '/api/user/user-search.php');
    if (response.result && response.result === 'the search was successfully performed') return response;
    if (response.error) showNotification(response['error message'], 'red');
    return false;
}

/**
 * Запрос получения данных сообщения по ID.
 * @param {object} JSON - объект с ключом: 'id_message'.
 * @returns возвращает JSON с данными сообщения.
 */
async function getMessageData(JSON) {
    const response = await sendJSONRequest(JSON, '/api/chat/get-message-data.php');
    if (response.result && response.result === 'these messages were successfully received') return response;
    if (response.error) showNotification(response['error message'], 'red');
    return false;
}

/**
 * Запрос обновления текста сообщения.
 * @param {object} JSON - объект с ключами: 'id_message', 'new_text'.
 * @returns возвращает true при успешном обновлении текста сообщения.
 */
async function editMessage(JSON) {
    const response = await sendJSONRequest(JSON, '/api/chat/edit-message.php');
    if (response.result && response.result === 'the message has been successfully updated') return true;
    if (response.error) showNotification(response['error message'], 'red');
    return false;
}

/**
 * Запрос удаления сообщения.
 * @param {object} JSON - объект с ключом: 'id_message'.
 * @returns возвращает true при успешном удаления сообщения.
 */
async function deleteMessage(JSON) {
    const response = await sendJSONRequest(JSON, '/api/chat/delete-chat-message.php');
    if (response.result && response.result === 'the message was successfully deleted') return true;
    if (response.error) showNotification(response['error message'], 'red');
    return false;
}

/**
 * Запрос на изменение названия чата.
 * @param {object} JSON - объект с ключами: 'id_chat', 'new_title'.
 */
async function changeChatTitle(JSON) {
    const response = await sendJSONRequest(JSON, '/api/chat/change-chat-title.php');
    if (response.result && response.result === 'the chat title has been successfully changed') return true;
    if (response.error) showNotification(response['error message'], 'red');
    return false;
}

/**
 * Запрос на изменение изображения чата.
 * @param {FormData} formData - объект FormData с ключами: 'id_chat', 'image';
 */
async function changeChatImage(formData) {
    const response = await sendFormDataRequest(formData, '/api/chat/change-chat-image.php');
    if (response.result && response.result === 'the chat image has been successfully changed') return true;
    if (response.error) showNotification(response['error message'], 'red');
    return false;
}

export {
    sendJSONRequest, 
    userAuthorization, 
    userRegistration,
    checkingForUserSession, 
    logout, 
    updateUser, 
    passwordUpdate, 
    getUserSession, 
    saveUserAvatar, 
    loadingChat,
    creatingChat,
    getChatData,
    deleteChat,
    sendMessage,
    getNumberChatMessages,
    getAllChatMessages,
    getDataAllUsers,
    addUserChat,
    userSearch,
    getMessageData,
    editMessage,
    deleteMessage,
    changeChatTitle,
    changeChatImage
};
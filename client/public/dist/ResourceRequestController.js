/**
 * Класс для контроля запросов к серверу.
 */
export default class ResourceRequestController {
    url = 'http://chat.school4.localhost/server/public/index.php';
    constructor() {
        this.debugInfo();
    }
    debugInfo() {
        console.debug('Инициализирован объект ResourceRequestController.');
    }
    /**
     * Метод получения html данных из серверной директории html, путь уже начинается в директории html.
     */
    async getHtml(pathFile) {
        try {
            ;
            let response = await fetch(`${this.url}?request=get_html_data&path_file=${pathFile}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error(`Сеть ответила с ошибкой: ${response.status}`);
            }
            else {
                let responseData = await response.json();
                return responseData.htmlData;
            }
        }
        catch (error) {
            throw new Error(`Ошибка запроса: ${error}.`);
        }
    }
    get getUrl() {
        return this.url;
    }
}

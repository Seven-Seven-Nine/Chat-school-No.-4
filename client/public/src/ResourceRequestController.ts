/**
 * Класс для контроля запросов к серверу.
 */
export default class ResourceRequestController {
    private url: string = 'http://chat.school4.localhost/server/public/Server.php';
    
    constructor() {
        this.debugInfo();
    }

    private debugInfo() {
        console.debug('Инициализирован объект ResourceRequestController.');
    }

    /**
     * Метод получения html данных из серверной директории html, путь уже начинается в директории html.
     */
    public async getHtml(pathFile: string): Promise<string> {
        try {
            interface ResponseData {
                htmlData: string,
            };

            let response = await fetch(`${this.url}?request=get_html_data&path_file=${pathFile}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`Сеть ответила с ошибкой: ${response.status}`)
            } else {
                let responseData: ResponseData = await response.json();
                return responseData.htmlData;
            }
        } catch (error) {
            throw new Error(`Ошибка запроса: ${error}.`);
        }
    }

    public get getUrl(): string {
        return this.url;
    }
}
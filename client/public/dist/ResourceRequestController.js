/**
 * Класс для контроля запросов к серверу.
 */
export default class ResourceRequestController {
    url = 'http://chat.school4.localhost/server/public/Server.php';
    constructor() {
        console.debug('Инициализирован объект ResourceRequestController.');
    }
    /**
     * Изменить ширину полосы загрузки.
     */
    startDownloadLine() {
        let downloadLine = document.getElementById('download-line');
        downloadLine.style.opacity = '1';
        downloadLine.style.width = '100%';
    }
    /**
     * Убрать полосу загрузки.
     */
    finishDownloadLine() {
        setTimeout(() => {
            let downloadLine = document.getElementById('download-line');
            downloadLine.style.opacity = '0';
            downloadLine.style.width = '0px';
        }, 400);
    }
    /**
     * Метод получения html данных из серверной директории html, путь уже начинается в директории html.
     */
    async getHtml(pathFile) {
        this.startDownloadLine();
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
        finally {
            this.finishDownloadLine();
        }
    }
    get getUrl() {
        return this.url;
    }
}

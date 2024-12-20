/**
 * Класс для управления настройками веб-приложения.
 */
export default class Settings {
    private settingsMap: Map<string, string>;

    constructor() {
        this.settingsMap = new Map<string, string>();
        this.settingsMap.set('focusColor', 'blue');

        console.debug('Инициализирован объект Settings.');
    }

    /**
     * Сохранить все настройки в локальное хранилище.
     */
    public saveSettings(): void {
        console.debug('Сохранение настроек приложения в локальное хранилище.');
        for (let [key, value] of this.settingsMap.entries()) {
            window.localStorage.setItem(key, value);
        }
    }

    /**
     * Удаление всех настроек из локального хранилища.
     */
    public deleteAllSettings(): void {
        console.debug('Удаление настроек приложения из локального хранилища.');
        for (let key of this.settingsMap.keys()) {
            window.localStorage.removeItem(key);
        }
    }

    /**
     * Изменение настройки в settingMap.
     * @param setting - название настройки.
     * @param value - значение настройки.
     */
    public changeSettings(setting: string, value: string): void {
        for (let key of this.settingsMap.keys()) {
            if (setting === key) {
                console.debug(`Изменение настройки приложения: ${setting} на значение ${value}.`);
                this.settingsMap.set(setting, value);
                this.saveSettings();
            }
        }
    }
}
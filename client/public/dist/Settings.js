/**
 * Класс для управления настройками веб-приложения.
 */
export default class Settings {
    settingsMap;
    constructor() {
        this.settingsMap = new Map();
        this.settingsMap.set('focusColor', 'blue');
        console.debug('Инициализирован объект Settings.');
    }
    /**
     * Сохранить все настройки в локальное хранилище.
     */
    saveSettings() {
        console.debug('Сохранение настроек приложения в локальное хранилище.');
        for (let [key, value] of this.settingsMap.entries()) {
            window.localStorage.setItem(key, value);
        }
    }
    /**
     * Удаление всех настроек из локального хранилища.
     */
    deleteAllSettings() {
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
    changeSettings(setting, value) {
        for (let key of this.settingsMap.keys()) {
            if (setting === key) {
                console.debug(`Изменение настройки приложения: ${setting} на значение ${value}.`);
                this.settingsMap.set(setting, value);
                this.saveSettings();
            }
        }
    }
}

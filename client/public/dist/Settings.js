/**
 * Класс для управления настройками веб-приложения.
 */
export default class Settings {
    settingsMap;
    constructor() {
        this.settingsMap = new Map();
        this.settingsMap.set('focusColor', 'blue');
        this.checkingSettingsValueInLocalStorage();
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
        this.applyDefaultSettings();
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
    /**
     * Применить настройки по умолчанию.
     */
    applyDefaultSettings() {
        console.debug('Изменение настроек по умолчанию.');
        let isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (isDarkMode) {
            this.settingsMap.set('focusColor', 'orange');
            document.documentElement.style.setProperty('--color-focus', 'orange');
        }
        else {
            this.settingsMap.set('focusColor', 'blue');
            document.documentElement.style.setProperty('--color-focus', 'blue');
        }
    }
    /**
     * Проверка значения настроек в локальном хранилище.
     */
    checkingSettingsValueInLocalStorage() {
        try {
            for (let key of this.settingsMap.keys()) {
                let valueInLocalStorage = window.localStorage.getItem(key);
                if (valueInLocalStorage !== null) {
                    console.debug(`В локальном хранилище найден сохранённый параметр ${key}: ${valueInLocalStorage}`);
                    this.applySavedSetting(key);
                }
            }
        }
        catch (error) {
            throw new Error('Ошибка проверки значений настроек в памяти!');
        }
    }
    /**
     * Применить сохранённую настройку из локального хранилища.
     * @param ketSetting - ключ параметра настройки.
     */
    applySavedSetting(ketSetting) {
        switch (ketSetting) {
            case 'focusColor':
                document.documentElement.style.setProperty('--color-focus', window.localStorage.getItem(ketSetting));
                break;
            default:
                throw new Error('Неизвестный ключ параметра настройки!');
        }
    }
}

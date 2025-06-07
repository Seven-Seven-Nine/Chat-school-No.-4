'use strict';

import { showNotification } from "./scripts/notifications.js";
import { snowModalConfirmationWindow } from "./scripts/modalWindow.js";
import { changeModule } from "./scripts/module.js";

showNotification('Ахтунг! Данный модуль в разработке!', 'red');
setTimeout(() => snowModalConfirmationWindow('Модуль пользователя пуст, закрыть данный модуль?', 'Да', 'Нет', () => changeModule('account')), 1000);
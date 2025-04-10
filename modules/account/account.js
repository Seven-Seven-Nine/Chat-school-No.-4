'use strict';

import moduleTransition from "../../static/scripts/moduleTransition.js";

const module = document.getElementById('module');

function account() {
  bindEvent();
}

function bindEvent() {
  document.getElementById('icon-btn-left-menu').onclick = () => handlerIconLeftMenu();
  document.getElementById('icon-btn-right-menu').onclick = () => handlerIconRightMenuChat();

  if (document.getElementById('list-btn-add-chat')) {
    document.getElementById('list-btn-add-chat').onclick = () => handlerBtnAddChat();
  }
  document.getElementById('icon-btn-add-chat').onclick = () => handlerBtnAddChat();

  document.getElementById('btn-icon-notification-left-menu').onclick = () => handlerIconWindowNotification();
  document.getElementById('btn-icon-close-left-menu').onclick = () => handlerCloseLeftMenu();

  document.getElementById('btn-close').onclick = () => handlerCloseLeftMenu();
  if (document.getElementById('btn-admin-panel')) {
    document.getElementById('btn-admin-panel').onclick = () => handlerBtnAdminPanel();
  }
  document.getElementById('btn-user').onclick = () => handlerBtnUser();
  document.getElementById('btn-settings').onclick = () => handlerBtnSettings();
  document.getElementById('btn-exit').onclick = () => handlerBtnExit();
}

function handlerIconLeftMenu() {
  clearCloseAnimationsLeftMenu();

  document.getElementById('block-left-menu-layer').style.display = 'flex';
  document.getElementById('block-left-menu').classList.add('open-block-left-menu');
  document.getElementById('block-darkening-area').classList.add('open-block-darkening-area');
  document.getElementById('block-information-data').classList.add('open-block-content-information-data');
}

function clearCloseAnimationsLeftMenu() {
  document.getElementById('block-left-menu').classList.remove('close-block-left-menu');
  document.getElementById('block-darkening-area').classList.remove('close-block-darkening-area');
  document.getElementById('block-information-data').classList.remove('close-block-content-information-data');
}

function handlerCloseLeftMenu() {
  clearOpenAnimationsLeftMenu();

  document.getElementById('block-left-menu').classList.add('close-block-left-menu');
  document.getElementById('block-darkening-area').classList.add('close-block-darkening-area');
  document.getElementById('block-information-data').classList.add('close-block-content-information-data');

  setTimeout(() => { document.getElementById('block-left-menu-layer').style.display = 'none' }, 500);
}

function clearOpenAnimationsLeftMenu() {
  document.getElementById('block-left-menu').classList.remove('open-block-left-menu');
  document.getElementById('block-darkening-area').classList.remove('open-block-darkening-area');
  document.getElementById('block-information-data').classList.remove('open-block-content-information-data');
}

function handlerIconWindowNotification() {
  alert('Кнопка уведомлений.');
}

function handlerIconRightMenuChat() {
  alert('Кнопка открытия правого меню чата.');
}

function handlerBtnAddChat() {
  moduleTransition(module, 'add_chat');
}

function handlerBtnAdminPanel() {
  moduleTransition(module, 'admin_panel');
}

function handlerBtnUser() {
  moduleTransition(module, 'user');
}

function handlerBtnSettings() {
  moduleTransition(module, 'settings');
}

function handlerBtnExit() {
  window.location.href = '/controllers/controller_handler.php?logout_user';
}

account();
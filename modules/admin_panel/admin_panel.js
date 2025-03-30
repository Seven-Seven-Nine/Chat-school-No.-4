'use strict';

import moduleTransition from '../../static/scripts/moduleTransition.js';

const module = document.getElementById('module');

function admin_panel() {
  bindEvent();
}

function bindEvent() {
  document.getElementById('btn-return').onclick = () => handlerBtnReturn();

  document.getElementById('btn-working-with-news').onclick = () => handlerBtnNews();
  document.getElementById('btn-working-with-update').onclick = () => handlerBtnUpdate();
  document.getElementById('btn-working-with-users').onclick = () => handlerBtnUsers();
  
  document.getElementById('icon-working-with-news').onclick = () => handlerIconNews();
  document.getElementById('icon-working-with-updates').onclick = () => handlerIconUpdates();
  document.getElementById('icon-working-with-users').onclick = () => handlerIconUsers();

  document.getElementById('card-add-news').onclick = () => handlerCardAddNews();
  document.getElementById('card-add-updates').onclick = () => handlerCardAddUpdates();
}

// Обработчики
function handlerBtnReturn() {
  moduleTransition(module, 'account');
}

function handlerBtnNews() {
  closeBlock('block-menu-admin-panel', 300);
  setTimeout(() => { 
    openBlock('block-navigation');
    openBlock('block-news'); 
  }, 300);
}

function handlerBtnUpdate() {
  closeBlock('block-menu-admin-panel', 300);
  setTimeout(() => {
    openBlock('block-navigation');
    openBlock('block-updates');
  }, 300);
}

function handlerBtnUsers() {
  closeBlock('block-menu-admin-panel', 300);
  setTimeout(() => {
    openBlock('block-navigation');
    openBlock('block-users');
  }, 300);
}

function handlerIconNews() {
  closeBlock('block-updates', 300);
  closeBlock('block-users', 300);
  closeBlock('block-add-news', 300);
  closeBlock('block-add-updates', 300);
  setTimeout(() => { openBlock('block-news') }, 300);
}

function handlerIconUpdates() {
  closeBlock('block-news', 300);
  closeBlock('block-users', 300);
  closeBlock('block-add-news', 300);
  closeBlock('block-add-updates', 300);
  setTimeout(() => { openBlock('block-updates') }, 300);
}

function handlerIconUsers() {
  closeBlock('block-news', 300);
  closeBlock('block-updates', 300);
  closeBlock('block-add-news', 300);
  closeBlock('block-add-updates', 300);
  setTimeout(() => { openBlock('block-users') }, 300);
}

function handlerCardAddNews() {
  closeBlock('block-news', 300);
  setTimeout(() => { openBlock('block-add-news') }, 300);
}

function handlerCardAddUpdates() {
  closeBlock('block-updates', 300);
  setTimeout(() => { openBlock('block-add-updates') }, 300);
}

// Анимации блоков
function closeBlock(idBlock, timeout) {
  const blockMenuAdminPanel = document.getElementById(idBlock);
  blockMenuAdminPanel.classList.remove('open-block');
  blockMenuAdminPanel.classList.add('close-block');
  setTimeout(() => { blockMenuAdminPanel.classList.add('display-none') }, timeout);
}

function openBlock(idBlock) {
  const block = document.getElementById(idBlock);
  block.classList.remove('display-none');
  block.classList.remove('close-block');
  block.classList.add('open-block');
}

admin_panel();
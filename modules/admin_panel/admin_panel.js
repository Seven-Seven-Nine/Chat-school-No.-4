'use strict';

import moduleTransition from '../../static/scripts/moduleTransition.js';

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
}

// Обработчики
function handlerBtnReturn() {
  moduleTransition(document.getElementById('module'), 'account');
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
  setTimeout(() => { openBlock('block-news') }, 300);
}

function handlerIconUpdates() {
  closeBlock('block-news', 300);
  closeBlock('block-users', 300);
  setTimeout(() => { openBlock('block-updates') }, 300);
}

function handlerIconUsers() {
  closeBlock('block-news', 300);
  closeBlock('block-updates', 300);
  setTimeout(() => { openBlock('block-users') }, 300);
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
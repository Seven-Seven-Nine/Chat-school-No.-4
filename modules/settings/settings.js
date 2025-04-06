'use strict';

import moduleTransition from '../../static/scripts/moduleTransition.js';

/** @type {HTMLDivElement[]} */
let arrayBlock = [];

/** @type {number} */
const speedAnimations = 300;

async function settings() {
  bindEvent();
  await getAllBlocks();
}

async function getAllBlocks() {
  arrayBlock = await document.getElementsByClassName('block');
}

function bindEvent() {
  document.getElementById('btn-return').onclick = () => handlerBtnReturn();
  document.getElementById('btn-open-block-color').onclick = () => handlerBtnBlockColor();
  document.getElementById('btn-open-block-background').onclick = () => handlerBtnOpenBlockBackground();
  document.getElementById('btn-open-block-speed-animations').onclick = () => handlerBtnOpenBlockSpeedAnimations();
  document.getElementById('btn-open-block-recovery').onclick = () => handlerBtnOpenBlockRecovery();
}

function handlerBtnReturn() {
  moduleTransition(document.getElementById('module'), 'account');
}

function handlerBtnBlockColor() {
  openBlock('block-settings-color')
  closeAllBlocks('block-settings-color')
}

function handlerBtnOpenBlockBackground() {
  openBlock('block-settings-background');
  closeAllBlocks('block-settings-background');
}

function handlerBtnOpenBlockSpeedAnimations() {
  openBlock('block-settings-speed-animations');
  closeAllBlocks('block-settings-speed-animations');
}

function handlerBtnOpenBlockRecovery() {
  openBlock('block-settings-recovery');
  closeAllBlocks('block-settings-recovery');
}

// Функции блоков
/** 
 * Открыть определённый блок.
 * @param {string} idBlock  */
function openBlock(idBlock) {
  for (let block of arrayBlock) {
    if (block.id === idBlock) {
      block.classList.remove('close-block');
      setTimeout(() => {
        block.classList.remove('display-none');
        block.classList.add('open-block');
      }, speedAnimations);
    }
  }
}

/** 
 * Закрыть все блоки, кроме определённого блока.
 * @param {string} idBlock  */
function closeAllBlocks(idBlock) {
  for (let block of arrayBlock) {
    if (block.id !== idBlock) {
      block.classList.remove('open-block');
      block.classList.add('close-block');
      setTimeout(() => {
        block.classList.add('display-none');
      }, speedAnimations);
    }
  }
}

settings();
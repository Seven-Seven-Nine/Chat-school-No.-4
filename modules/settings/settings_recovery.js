'use strict';

function settingsRecovery() {
  document.getElementById('btn-recovery').onclick = () => handlerBtnRecovery();
}

function handlerBtnRecovery() {
  window.localStorage.clear();
  window.location.href = '/?module=settings'
}

settingsRecovery();

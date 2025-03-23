import moduleTransition from '../../static/scripts/moduleTransition.js';

function module_error() {
  bindEvent();
}

function bindEvent() {
  document.getElementById('btn-confirm').onclick = () => moduleTransition(document.getElementById('module'), '/');
}

module_error();
/**
 * Плавный переход к следующему модулю.
 * @param {HTMLDivElement} module 
 * @param {string} nextModule 
 */
function moduleTransition(module, nextModule) {
  module.classList.remove('open-module');
  module.classList.add('close-module');
  const timerTransition = setTimeout(() => {
    if (nextModule === '/') {
      window.location.href = '/';
    } else {
      window.location.href = `/?module=${nextModule}`;
    }
  }, 300);
}

export default moduleTransition;
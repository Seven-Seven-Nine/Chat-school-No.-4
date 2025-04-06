function applyingSavedValues() {
  searchSavedValues();
}

// Поиск сохранённых значений
function searchSavedValues() {
  if (window.localStorage.getItem('valueAccentColor')) {
    changeCssVariable('--accent-color', window.localStorage.getItem('valueAccentColor'));
  }

  if (window.localStorage.getItem('valueBorderColor')) {
    changeCssVariable('--border-color', window.localStorage.getItem('valueBorderColor'));
  }

  if (window.localStorage.getItem('valueTextColor')) {
    changeCssVariable('--text-color', window.localStorage.getItem('valueTextColor'));
  }

  if (window.localStorage.getItem('valueLinkColor')) {
    changeCssVariable('--link-hover-color', window.localStorage.getItem('valueLinkColor'));
  }

  if (window.localStorage.getItem('backgroundImage')) {
    setBackgroundImage(window.localStorage.getItem('backgroundImage'));
  }
}

/**
 * Изменить CSS переменную.
 * @param {string} variable 
 * @param {string} value 
 */
function changeCssVariable(variable, value) {
  document.documentElement.style.setProperty(variable, value);
}

/**
 * Установить фоновое изображение.
 * @param {string} image 
 */
function setBackgroundImage(image) {
  document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("./static/images/${image}")`;
  document.body.style.backgroundPosition = 'center';
  document.body.style.boxShadow = 'inset 0 0 300px black';
}

applyingSavedValues();
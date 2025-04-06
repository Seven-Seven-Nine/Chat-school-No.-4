'use strict';

function settingsBackground() {
  bindEvent();
}

function bindEvent() {
  document.getElementById('img-wallpaper-one').onclick = () => handlerImgWallpaperOne();
  document.getElementById('img-wallpaper-second').onclick = () => handlerImgWallpaperSecond();
  document.getElementById('img-wallpaper-third').onclick = () => handlerImgWallpaperThird();
  document.getElementById('img-wallpaper-fourth').onclick = () => handlerImgWallpaperFourth();
  document.getElementById('img-wallpaper-fifth').onclick = () => handlerImgWallpaperFifth();
  document.getElementById('img-wallpaper-sixth').onclick = () => handlerImgWallpaperSixth();
}

function handlerImgWallpaperOne() {
  setBackgroundImage('wallpaper_1.webp');
}

function handlerImgWallpaperSecond() {
  setBackgroundImage('wallpaper_2.webp');
}

function handlerImgWallpaperThird() {
  setBackgroundImage('wallpaper_3.webp');
}

function handlerImgWallpaperFourth() {
  setBackgroundImage('wallpaper_4.webp');
}

function handlerImgWallpaperFifth() {
  setBackgroundImage('wallpaper_5.webp');
}

function handlerImgWallpaperSixth() {
  setBackgroundImage('wallpaper_6.webp');
}

/**
 * Установить фоновое изображение.
 * @param {string} image 
 */
function setBackgroundImage(image) {
  window.localStorage.setItem('backgroundImage', image);
  document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("./static/images/${image}")`;
  document.body.style.backgroundPosition = 'center';
  document.body.style.boxShadow = 'inset 0 0 300px black';
}

settingsBackground();

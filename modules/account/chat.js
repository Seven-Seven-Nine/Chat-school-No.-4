'use strict';

import moduleTransition from "../../static/scripts/moduleTransition.js";

/** @type {HTMLDivElement} */
const blockDataChat = document.getElementById('block-data-chat');
/** @type {HTMLParagraphElement} */
const titleChat = document.getElementById('title-chat');

function chat() {
  window.localStorage.removeItem('active-chat');
  bindEvent();
  getMessages();
}

function bindEvent() {
  /** @type {HTMLDivElement[]} */
  let arrayBlockChats = document.getElementsByClassName('block-chat');
  for (let blockChats of arrayBlockChats) {
    blockChats.onclick = () => getDataChat(blockChats.id);
  }

  document.getElementById('btn-menu-info-chat').onclick = () => handlerBtnInfoChat();
  document.getElementById('btn-menu-chat-users').onclick = () => handlerBtnAdditionUser();
  document.getElementById('btn-menu-chat-delete').onclick = () => handlerBtnMenuChatDelete();

  document.getElementById('btn-send-message').onclick = () => handlerBtnSendMessage();

  document.getElementById('btn-search-user').onclick = () => handlerBtnSearchUser();

  document.getElementById('btn-edit-chat').onclick = () => handlerBtnEditChat();
}

/**
 * @param {string} idChat 
 */
async function getDataChat(idChat) {
  try {
    const request = await fetch('http://chat.school4.localhost/controllers/controller_handler.php?get_data_chat&id_chat=' + idChat, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      }
    });

    if (request.ok) {
      const json = await request.json();
      openChat(idChat, json);    
    }
  } catch (error) {
    console.error(`Ошибка API запроса: ${error}.`);
  }
}

/**
 * @param {string} idChat 
 * @param {object} json 
 */
function openChat(idChat, json) {
  window.localStorage.setItem('active-chat', idChat)
  blockDataChat.style.opacity = '1';
  titleChat.innerText = json.title;
}

function handlerBtnMenuChatDelete() {
  deleteChat();
}

async function deleteChat() {
  try {
    const idChat = window.localStorage.getItem('active-chat').slice(5);
    const request = await fetch('http://chat.school4.localhost/controllers/controller_handler.php?delete_chat&id_chat=' + idChat, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      }
    });
  
    if (request.ok) {
      moduleTransition(document.getElementById('module'), 'account');
    }
  } catch (error) {
    console.error(`Ошибка API запроса: ${error}.`);
  }
}

function handlerBtnSendMessage() {
  /** @type {HTMLTextAreaElement} */
  const enteringMessage = document.getElementById('entering-message');
  if (enteringMessage.value !== '') {
    sendMessage(enteringMessage.value);
    enteringMessage.value = '';
  }
}

/**
 * @param {string} text 
 */
async function sendMessage(text) {
  try {
    const idChat = window.localStorage.getItem('active-chat').slice(5);
    const request = await fetch('http://chat.school4.localhost/controllers/controller_handler.php?send_message&id_chat=' + idChat, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        'text': text
      })
    });
  } catch (error) {
    console.error(`Ошибка API запроса: ${error}.`);
  }
}

function getMessages() {
  setInterval(async () => {
    if (window.localStorage.getItem('active-chat') !== null) {
      try {
        const idChat = window.localStorage.getItem('active-chat').slice(5);

        const request = await fetch('http://chat.school4.localhost/controllers/controller_handler.php?get_messages&id_chat=' + idChat, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            'messageCount': previousMessagesCount
          })
        });

        if (request.ok) {
          const json = await request.json();
          if (json.status && json.status === 'no update') {
            console.log('Wait.');
          } else {
            renderMessages(json);
          }
        }
      } catch (error) {
        console.error(`Ошибка API запроса: ${error}.`);
      }
    }
  }, 200);
}

let previousMessagesCount = 0;

function renderMessages(messages) {
  /** @type {HTMLDivElement} */
  const messagesContainer = document.getElementById('messages-container');
  const currentMessagesCount = messages.length;

  const escapeHtml = (text) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  messagesContainer.innerHTML = '';

  messages.forEach(message => {
    const messageElement = document.createElement('div');

    /** @type {string} */
    let safeText = escapeHtml(message.text);

    safeText = safeText.replace(/\r?\n/g, '<br>');

    messageElement.innerHTML = `
      <div class="message">
        <p>${message.login} | ${message.date}</p>
        <p>${safeText}</p>
        <span class="display-none">${message.id_message}</span>
      </div>
    `;
    messagesContainer.appendChild(messageElement);
  });

  previousMessagesCount = currentMessagesCount;
  messagesContainer.lastElementChild.scrollIntoView({ behavior: 'smooth' });
}

function handlerBtnAdditionUser() {
  openWindowAdditionUser();
  getUser();
}

function openWindowAdditionUser() {
  openFloatingMenu('block-user-addition', 'closing-area-user-addition');
  closeFloatingMenu('block-user-addition', 'closing-area-user-addition');
  instantCloseFloatingMenu('block-menu-chat', 'closing-area-menu-chat');
}

async function getUser() {
  try {
    const request = await fetch('http://chat.school4.localhost/controllers/controller_handler.php?get_users', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      }
    });

    if (request.ok) {
      const json = await request.json();
      renderUsersInAdditionUsers(json);
    }
  } catch (error) {
    console.error(`Ошибка API запроса: ${error}.`);
  }
}

/**
 * @param {object[]} users 
 */
function renderUsersInAdditionUsers(users) {
  const containerUsers = document.getElementById('container-users');
  containerUsers.innerHTML = '';

  users.forEach(user => {
    const divElement = document.createElement('div');
    
    divElement.classList.add('user');
    divElement.classList.add('flex');
    divElement.classList.add('flex-row');

    divElement.innerHTML = `
      <img class="user-image" src="${user.path_to_image}" alt="image user">
      <p>${user.login}</p>
      <img title="Добавить" src="/static/svg/icon-plus-fill.svg" id="icon-btn-add-user-${user.login}" class="icon-button add-btn-user" alt="Добавить">
    `;

    containerUsers.appendChild(divElement);
  });

  /** @type {HTMLImageElement[]} */
  let arrayBtnAdd = document.getElementsByClassName('add-btn-user');
  for (let i = 0; i < arrayBtnAdd.length; i++) {
    arrayBtnAdd[i].onclick = () => handlerBtnAddUserInChat(arrayBtnAdd[i].id);
  }
}

/**
 * @param {string} loginUser 
 */
async function handlerBtnAddUserInChat(loginUser) {
  try {
    const login = loginUser.slice(18);
    const idChat = window.localStorage.getItem('active-chat').slice(5);

    const request = await fetch('http://chat.school4.localhost/controllers/controller_handler.php?add_user_in_chat', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        'login': login,
        'id-chat': idChat,
      })
    });

    if (request.ok) {
      const json = await request.json();
      
    }
  } catch (error) {
    console.error(`Ошибка API запроса: ${error}.`);
  }
}

function handlerBtnSearchUser() {
  const inputSearchUser = document.getElementById('input-search-user');
  if (inputSearchUser.value !== '') {
    searchUser(inputSearchUser.value);
  } else {
    getUser();
  }
}

/**
 * @param {string} loginUser 
 */
async function searchUser(loginUser) {
  try {
    const request = await fetch('http://chat.school4.localhost/controllers/controller_handler.php?search_user', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        'login': loginUser
      })
    });

    if (request.ok) {
      const json = await request.json();
      renderUsersInAdditionUsers(json);
    }
  } catch (error) {
    console.error(`Ошибка API запроса: ${error}.`);
  }
}

function handlerBtnInfoChat() {
  openWindowInfoChat();
  getInfoChat();
}

async function getInfoChat() {
  try {
    const idChat = window.localStorage.getItem('active-chat').slice(5);

    const request = await fetch('http://chat.school4.localhost/controllers/controller_handler.php?get_info_chat', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        'id-chat': idChat
      })
    });

    if (request.ok) {
      const json = await request.json();
      renderInfoChat(json);
    }
  } catch (error) {
    console.error(`Ошибка API запроса: ${error}.`);
  }
}

/**
 * @param {object[]} json 
 */
function renderInfoChat(json) {
  console.log(json);
  
  document.getElementById('info-chat-title').innerHTML = json.title;
  document.getElementById('info-chat-image').src = json.path_to_image;

  const containerUsersChats = document.getElementById('container-users-chats');
  containerUsersChats.innerHTML = '';

  /** @type {object[]} */
  let arrayUsers = json.users;
  
  for (let index = 0; index < arrayUsers.length; index++) {
    const div = document.createElement('div');

    div.classList.add('flex');
    div.classList.add('flex-row');
    div.classList.add('flex-start');

    if (arrayUsers[index].login !== json.creator) {
      div.innerHTML = `<img src="${arrayUsers[index].path_to_image}" alt="image"> ${arrayUsers[index].login} | участник с ${arrayUsers[index].joined_at}.`;
    } else {
      div.innerHTML = `<img src="${arrayUsers[index].path_to_image}" alt="image"> <span class="green-text">${arrayUsers[index].login}</span> | создатель с ${arrayUsers[index].joined_at}.`;
    }
    containerUsersChats.appendChild(div);
    
    console.log(arrayUsers[index]);
  }
}

function openWindowInfoChat() {
  openFloatingMenu('block-info-chat', 'closing-area-chat');
  closeFloatingMenu('block-info-chat', 'closing-area-chat');
  instantCloseFloatingMenu('block-menu-chat', 'closing-area-menu-chat');
}

function openFloatingMenu(idFloatingMenu, idClosingArea) {
  const floatingMenu = document.getElementById(idFloatingMenu);
  const closingArea = document.getElementById(idClosingArea);
  floatingMenu.classList.remove('display-none');
  floatingMenu.classList.add('open-floating-menu');
  closingArea.classList.remove('display-none');
}

function handlerBtnEditChat() {
  moduleTransition(document.getElementById('module'), 'edit_chat');
}

/**
 * @param {string} idFloatingMenu 
 * @param {string} idClosingArea 
 */
function closeFloatingMenu(idFloatingMenu, idClosingArea) {
  const floatingMenu = document.getElementById(idFloatingMenu);
  const closingArea = document.getElementById(idClosingArea);
  closingArea.onclick = () => {
    floatingMenu.classList.add('close-floating-menu');
    setTimeout(() => {
      floatingMenu.classList.add('display-none');
      floatingMenu.classList.remove('close-floating-menu');
    }, 200);
    closingArea.classList.add('display-none');
  }
}

/**
 * @param {string} idFloatingMenu 
 * @param {string} idClosingArea 
 */
function instantCloseFloatingMenu(idFloatingMenu, idClosingArea) {
  const floatingMenu = document.getElementById(idFloatingMenu);
  const closingArea = document.getElementById(idClosingArea);
  floatingMenu.classList.add('close-floating-menu');
  setTimeout(() => {
    floatingMenu.classList.add('display-none');
    floatingMenu.classList.remove('close-floating-menu');
  }, 200);
  closingArea.classList.add('display-none');
}

chat();
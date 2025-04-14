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

  document.getElementById('btn-menu-chat-delete').onclick = () => handlerBtnMenuChatDelete();
  document.getElementById('btn-send-message').onclick = () => handlerBtnSendMessage();
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
  // openFloatingMenu('closing-area-confirm-deleting-chat', 'deletion-confirmation-window');
  // closeFloatingMenu('closing-area-confirm-deleting-chat', 'deletion-confirmation-window');
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
  sendMessage(enteringMessage.value);
  enteringMessage.value = '';
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
            console.log('Обновлять ничего не нужно.');
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

  messagesContainer.innerHTML = '';

  messages.forEach(message => {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `
      <div class="message">
        <p>${message.login} | ${message.date}</p>
        <p>${message.text}</p>
        <span class="display-none">${message.id_message}</span>
      </div>
    `;
    messagesContainer.appendChild(messageElement);
  });

  previousMessagesCount = currentMessagesCount;
  messagesContainer.lastElementChild.scrollIntoView({ behavior: 'smooth' });
}

chat();
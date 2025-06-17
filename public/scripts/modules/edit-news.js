'use strict';

import { applyModule, applySubmodule, deleteSpecificModuleScript } from "../module.js";
import { showNotification } from "../notifications.js";
import { getUserSession, sendJSONRequest } from "../requests.js";
import { changeStyleAnimationElement } from "../template-element.js";
import { correctInput, incorrectInput } from "../validationForms.js";

const inputTitle = document.getElementById('input-title-news');
const newsText = document.getElementById('text-news');

function eventBinding() {
    document.getElementById('black-space').onclick = async () => await closeEditNews();
    document.getElementById('submodule-return-edit-news-button').onclick = async () => await closeEditNews();
    document.getElementById('btn-confirm-edit-news').onclick = () => validatorEditNewsForm();
    document.getElementById('btn-delete-edit-news').onclick = async () => await deleteNews(); 
}

async function closeEditNews() {
    changeStyleAnimationElement('black-space', 'snow-black-space', 'hide-black-space');
    changeStyleAnimationElement('edit-news-submodule', 'show-submodule', 'hide-submodule');
    setTimeout(() => document.getElementById('container-submodule-admin-panel').textContent = '', 400);
    await deleteSpecificModuleScript('/public/scripts/modules/edit-news.js');
}

function validatorEditNewsForm() {
    let formValidationResult = [];
    
    if (inputTitle.value.length < 3) {
        incorrectInput(inputTitle, 'Короткое название!');
    } else if (inputTitle.value.length > 120) {
        incorrectInput(inputTitle, 'Большое название!');
    } else {
        correctInput(inputTitle, 'Логин');
        formValidationResult.push(true);
    }

    if (formValidationResult.length === 1) editNews();
}

async function editNews() {
    if (await requestEditNews()) {
        await closeEditNews();
        await applyModule('admin-panel');
    }
} 

async function requestEditNews() {
    const userSession = await getUserSession();
    const response = await sendJSONRequest({
        'id_news': window.localStorage.getItem('id_news'),
        'title': inputTitle.value,
        'text': newsText.value
    }, '/api/news/edit-news.php');
    if (response.result && response.result === 'the news was successfully changed') return true;
    if (response.error) showNotification(response['error message'], 'red');
    return false;
}

async function deleteNews() {
    if (await requestDeleteNews()) {
        await closeEditNews();
        await applyModule('admin-panel');
    }
}

async function requestDeleteNews() {
    const response = await sendJSONRequest({
        'id_news': window.localStorage.getItem('id_news')
    }, '/api/news/delete-news.php');
    if (response.result && response.result === 'the news was successfully deleted') return true;
    if (response.error) showNotification(response['error message'], 'red');
    return false;
}

async function getNewsData() {
    const newsData = await requestGetNewsData();
    inputTitle.value = newsData.title;
    newsText.value = newsData.text;
}

async function requestGetNewsData() {
    const response = await sendJSONRequest({
        'id_news': window.localStorage.getItem('id_news')
    }, '/api/news/get-news-by-id.php');
    if (response.result && response.result === 'news found successfully') return response;
    if (response.error) showNotification(response['error message'], 'red');
    return false;
}

eventBinding();
getNewsData();
'use strict';

import { applyModule, applySubmodule, deleteSpecificModuleScript } from "../module.js";
import { getUserSession, sendJSONRequest } from "../requests.js";
import { changeStyleAnimationElement } from "../template-element.js";
import { correctInput, incorrectInput } from "../validationForms.js";

const inputTitle = document.getElementById('input-title-news');
const newsText = document.getElementById('text-news');

function eventBinding() {
    document.getElementById('black-space').onclick = async () => await closeAddNews();
    document.getElementById('submodule-return-add-news-button').onclick = async () => await closeAddNews();
    document.getElementById('btn-confirm-add-news').onclick = () => validatorAddNewsForm();
}

async function closeAddNews() {
    changeStyleAnimationElement('black-space', 'snow-black-space', 'hide-black-space');
    changeStyleAnimationElement('add-news-submodule', 'show-submodule', 'hide-submodule');
    setTimeout(() => document.getElementById('container-submodule-admin-panel').textContent = '', 400);
    await deleteSpecificModuleScript('/public/scripts/modules/add-news.js');
}

function validatorAddNewsForm() {
    let formValidationResult = [];
    
    if (inputTitle.value.length < 3) {
        incorrectInput(inputTitle, 'Короткое название!');
    } else if (inputTitle.value.length > 120) {
        incorrectInput(inputTitle, 'Большое название!');
    } else {
        correctInput(inputTitle, 'Логин');
        formValidationResult.push(true);
    }

    if (formValidationResult.length === 1) addNews();
}

async function addNews() {
    if (await requestAddNews()) {
        await closeAddNews();
        await applyModule('admin-panel');
    }
} 

async function requestAddNews() {
    const userSession = await getUserSession();
    const response = await sendJSONRequest({
        'login': userSession.login,
        'title': inputTitle.value,
        'text': newsText.value
    }, '/api/news/add-news.php');
    if (response.result && response.result === 'the news was added successfully') return true;
    if (response.error) showNotification(response['error message'], 'red');
    return false;
}

eventBinding();
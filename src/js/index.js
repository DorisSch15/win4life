import './../assets/styles/main.scss';

import { gambleNumbers, winNumbers, createNewCard, CheckExistingCard } from './game.js';
import {checkWin, setScratched} from './check-win.js';
import {checkUserData} from './user.js';

export let winSection = document.querySelector('.win-section__table');
export let gameSection = document.querySelector('.game-section__table');

window.addEventListener('load', checkUserData);

winSection.addEventListener('click', scratchItem);
gameSection.addEventListener('click', scratchItem);


export function renderCard() {
    CheckExistingCard();

    let index = 0;
    
    winSection.innerHTML = '';
    for(let number of winNumbers){

        let scratchedClass = '';

        if (number.scratched === true){
            scratchedClass = 'win-section__number-front--scratched';
        };

        let winBox = document.createElement('div');
        
        winBox.classList.add('win-section__number');
        
        winBox.innerHTML = `
        <div class="win-section__number-front ${scratchedClass} fa-solid fa-clover" id="${index}-win"></div>
        <div class="win-section__number-back win-section__number-back">
        <div class="win-section__number-back-int">${number.int}</div>
        <div class="win-section__number-back-string">${number.string}</div>
        </div>
        `;

        index += 1;
        winSection.appendChild(winBox);
    };

    index = 0; // damit index bei game ebenfalls wieder bei 1 beginnt
    
    gameSection.innerHTML = '';
    for(let number of gambleNumbers){

        let scratchedClass = '';
        
        if (number.scratched === true){
            scratchedClass = 'game-section__item-front--scratched';
        };

        let gameBox = document.createElement('div');

        gameBox.classList.add('game-section__item');
        gameBox.innerHTML = `
        <div class="game-section__item-front ${scratchedClass} fa-solid fa-money-bill-1-wave" id="${index}-game"></div>
        <div class="game-section__item-back">
        <div class="game-section__item-back__number-int">${number.int}</div>
        <div class="game-section__item-back__number-string">${number.string}</div>
        <div class="game-section__item-back__win-int">${checkString(number)}</div>
        <div class="game-section__item-back__win-string">${number.text}</div>
        </div>
        `;
        
        index += 1;
        gameSection.appendChild(gameBox);

    };
};

function scratchItem(e){
    if(e.target && (e.target.classList.contains('game-section__item-front') || e.target.classList.contains('win-section__number-front'))){
        setScratched(e.target.id);
        renderCard();
        checkWin();
    };
};

function checkString(number){
    if(typeof number.win === 'string'){
        return number.win;
    } else {
        return getCurrencyFormat(number.win) + ' ' + number.currency;
    };
};

export function getCurrencyFormat(number){
    return new Intl.NumberFormat('de-CH').format(number);
};
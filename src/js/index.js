import './../assets/styles/main.scss';

import { gambleNumbers, winNumbers, letsGamble } from './game.js';
import {checkWin, setScratched} from './check-win.js';

let winSection = document.querySelector('.win-section__table');
let gameSection = document.querySelector('.game-section');

winSection.addEventListener('click', scratchItem);
gameSection.addEventListener('click', scratchItem);

render()

function render() {
    letsGamble();
    let index = 0;
    
    winSection.innerHTML = '';
    for(let number of winNumbers){
        let winBox = document.createElement('div');
        
        winBox.classList.add('win-section__number');
        
        winBox.innerHTML = `
        <div class="win-section__number-front fa-solid fa-clover" id="${index}-win"></div>
        <div class="win-section__number-back">
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
        let gameBox = document.createElement('div');

        gameBox.classList.add('game-section__item');
        
        gameBox.innerHTML = `
        <div class="game-section__item-front fa-solid fa-money-bill-1-wave" id="${index}-game"></div>
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
        e.target.style.zIndex = 0;
        setScratched(e.target.id);
        checkWin();
    };
};

function checkString(number){
    
    if(typeof number.win === "string"){
        return number.win;
    } else {
        return new Intl.NumberFormat('de-CH').format(number.win) + ' ' + number.currency;
    };

};
import './../assets/styles/main.scss';

import { gambleNumbers, winNumbers, letsGamble } from './game.js';

let winSection = document.querySelector('.win-section__table');
let gameSection = document.querySelector('.game-section');

winSection.addEventListener('click', changeZindex);
gameSection.addEventListener('click', changeZindex);

render()


function render() {
    letsGamble();
    
    winSection.innerHTML = '';
    for(let number of winNumbers){
        let winBox = document.createElement('div');
        
        winBox.classList.add('win-section__number');
        
        winBox.innerHTML = `
        <div class="win-section__number-front">test</div>
        <div class="win-section__number-back">
            <div class="win-section__number-back-int">${number.int}</div>
            <div class="win-section__number-back-string">${number.string}</div>
        </div>
        `;
        winSection.appendChild(winBox);
    };
    
    gameSection.innerHTML = '';
    for(let number of gambleNumbers){
        let gameBox = document.createElement('div');
        gameBox.classList.add('game-section__item');
        
        gameBox.innerHTML = `
        <div class="game-section__item-front">test</div>
        <div class="game-section__item-back">
            <div class="game-section__item-back__number-int">${number.int}</div>
            <div class="game-section__item-back__number-string">${number.string}</div>
            <div class="game-section__item-back__win-int">${number.win}${number.currency}</div>
            <div class="game-section__item-back__win-string">${number.text}</div>
        </div>
        `;
        
        gameSection.appendChild(gameBox);
    };
};


function changeZindex(e){
    if(e.target){
        e.target.style.zIndex = 0;
    };
};
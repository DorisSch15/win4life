import './../assets/styles/main.scss';

import { gambleNumbers, winNumbers, letsGamble } from './game.js';

let winSection = document.querySelector('.win-section__table');

let gameSection = document.querySelector('.game-section');

let gameBtn = document.querySelector('.getNewCard');
gameBtn.addEventListener('click', render);

function render() {
    letsGamble();

    winSection.innerHTML = '';
    for(let number of winNumbers){
        let winBox = document.createElement('div');

        winBox.classList.add('win-section__number');

        winBox.innerHTML = `
            <div class="win-section__number-int">${number.int}</div>
            <div class="win-section__number-string">${number.string}</div>
        `;

        winSection.appendChild(winBox);
    };

    gameSection.innerHTML = '';
    for(let number of gambleNumbers){
        let gameBox = document.createElement('div');
        gameBox.classList.add('game-section__item');

        gameBox.innerHTML = `
        <div class="game-section__item__number-int">${number.int}</div>
        <div class="game-section__item__number-string">${number.string}</div>
        <div class="game-section__item__win-int">${number.win}${number.currency}</div>
        <div class="game-section__item__win-string">${number.text}</div>
        `;

        gameSection.appendChild(gameBox);
    };
};

render()
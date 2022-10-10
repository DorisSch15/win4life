import './../assets/styles/main.scss';
import './game.js';

import { numbers } from './numbers.js';
// import * as wins from './wins.js';

let winSection = document.querySelector('.win-section__table');
let gameSection = document.querySelector('.game-section');

    for(let number of winNumbers){
        // console.log(number);
        let winDiv = document.createElement('div');
        winDiv.innerHTML =+`
        <div class="win-section__number-int">
            ${number.int}
        </div>
        <div class="win-section__number-string">
            ${number.string}
        </div>`;
        winDiv.classList = 'win-section__number';
        winSection.appendChild(winDiv);
    };


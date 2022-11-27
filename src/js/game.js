import { gameNumbers } from './numbers.js';
import { wins } from './wins.js';

export let winNumbers = [];
export let gambleNumbers = [];


export function checkExistingCard(){
    if(localStorage.getItem('winNumbers') === null){
        return
    } else {
        winNumbers = JSON.parse(localStorage.getItem('winNumbers'));
        gambleNumbers = JSON.parse(localStorage.getItem('gambleNumbers'));
    }
};

export function createNewCard() {
    createNewWinNumbers();
    createNewGambleNumbers();

    saveNumbersToLocalStorage();
};

export function saveNumbersToLocalStorage(){
    localStorage.setItem('winNumbers', JSON.stringify(winNumbers));
    localStorage.setItem('gambleNumbers', JSON.stringify(gambleNumbers));
};

function createNewWinNumbers() {
    winNumbers = [];
    for(let i = 0; i < 4; i++){
        let winNumber = getRandomWinNumber(19);

        if(winNumbers.some(win => win.int === winNumber.int)){
            i--;
            continue;
        }

        winNumbers.push({
            int: winNumber.int,
            string: winNumber.string,
            scratched: false
        });
    };
};

function createNewGambleNumbers() {
    gambleNumbers = [];
    
    for(let i = 0; i < 12; i++){
        let gambleNumber = getRandomWinNumber(20.44);
        let win;
        
        // check if number already excists exept 20(WIN) - if number already excists -> get another number
        if(gambleNumber !== gameNumbers[20] && gambleNumbers.some(game => game.int === gambleNumber.int)){
            i--;
            continue;
        }
        
        // if id = 20(WIN) it always shows wins[9]
        if(gambleNumber === gameNumbers[20]){
            {
                gambleNumber.int = gambleNumber.string.toUpperCase();
                win = wins[9];
            }
        } else {
            {
                win = getRandomPrice(wins.length - 2); // so that wins[9] never gets picked
            }
        };
        
        gambleNumbers.push({
            int: gambleNumber.int,
            string: gambleNumber.string,
            win: win.win,
            currency: win.currency,
            text: win.text,
            scratched: false,
        });

    };
};

function getRandomWinNumber(max){
    let randomId = Math.round(Math.random() * max);
    return gameNumbers[randomId];
};

function getRandomPrice(max) {
    let randomId = Math.round(Math.pow(Math.random(), 2.5) * max);
    return wins[randomId];
};


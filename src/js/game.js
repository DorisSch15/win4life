import { gameNumbers } from './numbers.js';
import { wins } from './wins.js';

export let winNumbers = [];
export let gambleNumbers = [];

export function letsGamble() {
    createNewWinNumbers();
    createNewGambleNumbers();
};

// create WinNumbers

function createNewWinNumbers() {
    winNumbers = [];
    for(let i = 0; i < 4; i++){
        let winNumber = getRandomWinNumber(19);

        if(winNumbers.some(e => e.int === winNumber.int)){
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

// create gambleNumbers

function createNewGambleNumbers() {
    gambleNumbers = [];
    
    for(let i = 0; i < 12; i++){
        let gambleNumber = getRandomWinNumber(20.44); // 20.1 nehmen ? damit win nicht immer wieder 3x vorkommt ?
        let win;
        
        // überprüfen ob Zahl schon vorhanden, ausser id:20(WIN) - wenn vorhanden dann nochmals neu "generieren"
        if(gambleNumber !== gameNumbers[20] && gambleNumbers.some(e => e.int === gambleNumber.int)){
            i--;
            continue;
        }
        
        // wenn id20(WIN) muss immer wins[9] verwendet werden, Jahresgewinn !
        if(gambleNumber === gameNumbers[20]){
            {
                gambleNumber.int = gambleNumber.string.toUpperCase();
                win = wins[9];
            }
        } else {
            {
                win = getRandomPrice(wins.length - 2); // damit Win nicht dabei ist
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

// getRandomNumber

function getRandomWinNumber(max){
    let rn = Math.round(Math.random() * max);
    return gameNumbers[rn];
};

function getRandomPrice(max) {
    let rn = Math.round(Math.pow(Math.random(), 2.5) * max);
    return wins[rn];
};

Array.prototype.count = function(item) { 
    let appearance = 0; //This is the default value
    this.forEach(index => {
        if (index === item)
            appearance++
    });
    return appearance;
};


import { gameNumbers } from './numbers.js';
import { wins } from './wins.js';

export let winNumbers = [];
export let gambleNumbers = [];
export function letsGamble() {
    createNewWinNumbers();
    createNewGambleNumbers();
};

function createNewWinNumbers() {
    winNumbers = [];
    for(let i = 0; i < 4; i++){
        let winNumber = getRandomWinNumber(19);

        if(winNumbers.includes(winNumber)){
            i--;
            continue;
        }

        winNumbers.push(winNumber);
    };
};

function createNewGambleNumbers() {
    gambleNumbers = [];
    
    for(let i = 0; i < 12; i++){
        let gambleNumber = getRandomWinNumber(20.44);
        let win;

        function multipleExisting(number){
            number.int === gambleNumber.int;
        }
        
        if(gambleNumber !== gameNumbers[20] && gambleNumbers.some(multipleExisting)){
            i--;
            continue;
        }
        
        if(gambleNumber === gameNumbers[20]){
            {
                win = wins[9];
            }
        } else {
            {
                win = getRandomWin(wins.length - 2);
            }
        };
        
        gambleNumbers.push({
            int: gambleNumber.int,
            string: gambleNumber.string,
            win: win.win,
            currency: win.currency,
            text: win.text
        });
        
        console.log(`die gamble nr ist` + gambleNumber.int)
    };
    console.table(gambleNumbers);
};

function getRandomWinNumber(max){
    let rn = getRandomNumber(max, gameNumbers);
    return gameNumbers[rn];
};

function getRandomWin(max) {
    let rn = getRandomNumber(max, wins);
    return wins[rn];
};

function getRandomNumber(max, array) {
    return Math.round(Math.random() * max);
};

Array.prototype.count = function(item) { 
    let appearance = 0; //This is the default value
    this.forEach(index => {
        if (index === item)
            appearance++
    });
    return appearance;
};


import { gameNumbers } from './numbers.js';
import { wins } from './wins.js';

let winNumbers = [];
let gambleNumbers = [];

function createNewCard(){

};

function createNewWinNumbers(){
    winNumbers = [];
    for(let i = 0; i < 4; i++){
        let winNumber = getRandomWinNumber(19);

        if(doesWinNumberAlreadyExist(winNumber)){
            i--;
            continue;
        }

        winNumbers.push(winNumber);
    };
};

createNewWinNumbers();

function createNewGambleNumbers() {

};

function getRandomWinNumber(max){
    let rn = getRandomNumber(max);
    return gameNumbers[rn];

};

function getRandomWin(max){
    let rn = getRandomNumber(max);
    return wins[rn];
};

function getRandomNumber(max) {
    if(max > wins.length){
        max = wins.length-1;
    };

    return Math.floor(Math.random() * max);
};

function doesWinNumberAlreadyExist(winNumber){
    return winNumbers.includes(winNumber);
};


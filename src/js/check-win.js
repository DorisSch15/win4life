import { getCurrencyFormat } from './index.js';
import { gambleNumbers, winNumbers, letsGamble } from './game.js';
import { clientData } from './user.js';

let game = document.querySelector('.gambling');

let g;
let w;

let buyCard = document.querySelector('#buyCard');
let grabWin = document.querySelector('#getWin');


export function setScratched(id){
    let scratchedId = id.split('-');

    if(scratchedId[1] === 'win'){
        winNumbers[scratchedId[0]].scratched = true;
    } else {
        gambleNumbers[scratchedId[0]].scratched = true;
    }
};


export function checkWin(){
    
    if(winNumbers.some(e => e.scratched === false) || gambleNumbers.some(e => e.scratched === false)){
        return;
    };
    
    let winFromCurrentCard = 0;
    let amountAfterGame = 0;

    for(g = 0; g < gambleNumbers.length; g++){
        for (w = 0; w < winNumbers.length; w++){
            if(gambleNumbers[g].int === winNumbers[w].int){
                winFromCurrentCard += gambleNumbers[g].win;
            };
        };
    };

    console.log(winFromCurrentCard);

    amountAfterGame = clientData.amount + winFromCurrentCard;

    let winInfo = document.createElement('dialog');
    winInfo.classList.add('win-dialog');

    if(winFromCurrentCard === 0){
        winInfo.innerHTML = `
        <h3 class="win-dialog__title-loss">Sorry, vielleicht beim nächsten Mal !</h3>
        <iframe src="https://giphy.com/embed/X0QKGRNCxnwWs" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed win-dialog__giphy-loss" allowFullScreen></iframe>
        <p class="win-dialog__text-loss">Leider hat es dieses Mal nicht geklappt.</p>
        <button class="win-dialog__btn-loss" id="buyCard">Versuche es erneut !</button>
        `

    } else {
        winInfo.innerHTML = `
        <h3 class="win-dialog__title-win">Gratulation</h3>
        <div style="width:100%;height:0;padding-bottom:45%;position:relative;">
            <iframe src="https://giphy.com/embed/fxsqOYnIMEefC" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed win-dialog__giphy-win" allowFullScreen></iframe>
        </div>
        <p class="win-dialog__text-win">Sie haben ${getCurrencyFormat(winFromCurrentCard)} ${clientData.currency} gewonnen.</p>
        <button class="win-dialog__btn-win" id="getWin">Gewinn einsacken</button>
        `
    }
    game.appendChild(winInfo);
    winInfo.showModal();
};

// grabWin.addEventListener('click', addWinToCredit);

// function addWinToCredit(){
//     let currentCredit = document.querySelector('.user__credit-number');


// }
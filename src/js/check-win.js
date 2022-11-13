import { getCurrencyFormat } from './index.js';
import { gambleNumbers, winNumbers, letsGamble } from './game.js';
import { header, clientData, addWinToCredit } from './user.js';

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
    
    for(let g = 0; g < gambleNumbers.length; g++){
        for (let w = 0; w < winNumbers.length; w++){
            if(gambleNumbers[g].int === winNumbers[w].int){
                winFromCurrentCard += gambleNumbers[g].win;
            }
        };
    };

    showGameEndDialog(winFromCurrentCard);
};

function showGameEndDialog(amount){
    let gameInfo = document.createElement('dialog');
    gameInfo.classList.add('win-dialog');
    
    if(amount === 0){
        gameInfo.innerHTML = `
        <h3 class="win-dialog__title">Sorry, vielleicht beim nächsten Mal !</h3>
        <div class="win-dialog__emojis">
            <div class="fa-regular fa-face-sad-cry"></div>
            <div class="fa-solid fa-heart-crack"></div>
            <div class="fa-regular fa-face-sad-tear"></div>
        </div>
        <p class="win-dialog__text">Leider hat es dieses Mal nicht geklappt.</p>
        <button class="win-dialog__btn">Versuche es erneut !</button>
        `;
    } else {
        gameInfo.innerHTML = `
        <h3 class="win-dialog__title">Gratulation</h3>
        <div class="win-dialog__emojis">
            <div class="fa-solid fa-face-smile-beam"></div>
            <div class="fa-regular fa-face-laugh-squint"></div>
            <div class="fa-solid fa-face-laugh-beam"></div>
        </div>
        <p class="win-dialog__text">Sie haben ${getCurrencyFormat(amount)} ${clientData.currency} gewonnen.</p>
        <button class="win-dialog__btn">Gewinn einsacken</button>
        `; 
    }
    
    header.appendChild(gameInfo);

    gameInfo.showModal();

    gameInfo.addEventListener('cancel', (e) => {
        e.preventDefault();
    });

    let grabWin = document.querySelector('.win-dialog__btn');
    grabWin.addEventListener('click',(e) => {
        gameInfo.close();
        header.removeChild(gameInfo);
        addWinToCredit(amount);
    });  
};
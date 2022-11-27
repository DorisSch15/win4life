import { header, getCurrencyFormat } from './index.js';
import { clientData } from './user.js';
import { addWinToCredit } from './check-win.js';

export function showGameResultDialog(amount){
    let gameResult = document.createElement('dialog');
    gameResult.classList.add('win-dialog');
    
    if(amount === 0){
        gameResult.classList.add('win-dialog--loss');
        gameResult.innerHTML = `
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
        gameResult.classList.add('win-dialog--win');
        gameResult.innerHTML = `
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
    
    header.appendChild(gameResult);

    gameResult.showModal();
    gameResult.addEventListener('cancel', (e) => {
        e.preventDefault();
    });

    let grabWin = document.querySelector('.win-dialog__btn');
    grabWin.addEventListener('click',() => {
        gameResult.close();
        header.removeChild(gameResult);
        addWinToCredit(amount);
    });  
};
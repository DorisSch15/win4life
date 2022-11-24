import { getCurrencyFormat } from './index.js';
import { gambleNumbers, winNumbers, letsGamble } from './game.js';
import { header, clientData, addWinToCredit, checkAmount } from './user.js';
import { gameNumbers } from './numbers.js';

export function setScratched(id){
    let scratchedId = id.split('-');

    if(scratchedId[1] === 'win'){
        winNumbers[scratchedId[0]].scratched = true;
    } else {
        gambleNumbers[scratchedId[0]].scratched = true;
    }
    saveNumbersToLocalStorage();
};

export function checkWin(){
    if(winNumbers.some(e => e.scratched === false) || gambleNumbers.some(e => e.scratched === false)){
        return;
    }
    
    let winFromCurrentCard = 0;
    let win = 0;
    
    for(let g = 0; g < gambleNumbers.length; g++){
        for (let w = 0; w < winNumbers.length; w++){
            if(gambleNumbers[g].int === winNumbers[w].int){
                winFromCurrentCard += gambleNumbers[g].win;
            }
        };

        if(gambleNumbers[g].int === 'WIN'){
            win++;
        }
    };

    if(win >= 3){

        tripleWin();

    } else {

        showGameEndDialog(winFromCurrentCard);

    };
};

function showGameEndDialog(amount){
    let gameInfo = document.createElement('dialog');
    gameInfo.classList.add('win-dialog');
    
    if(amount === 0){
        gameInfo.classList.add('win-dialog--loss');
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
        gameInfo.classList.add('win-dialog--win');
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

function tripleWin(){
    let tripleWin = document.createElement('dialog');
    tripleWin.classList.add('triple-win');
    
    tripleWin.innerHTML = `
    <div class="triple-win__hack">
        <h3 class="triple-win__title">!! Gratulation, du hast den Jackpot gewonnen !!</h3>
        <div class="triple-win__emojis">
            <i class="fa-solid fa-champagne-glasses"></i>
            <i class="fa-solid fa-face-laugh-squint"></i>
            <i class="fa-solid fa-coins"></i>
        </div>
        <p class="triple-win__text">Da wir dir nicht 20 Jahre lang monatlich 4'000 Fr. auszahlen können, kriegst du von uns den riesigen Betrag über 960'000 Fr. von uns gutgeschrieben !<br><br>Gratulation !!!</p>
        <button class="triple-win__btn">Guthaben einsacken</button>
    </div>
    `;
    
    header.appendChild(tripleWin);

    tripleWin.showModal();

    tripleWin.addEventListener('cancel', (e) => {
        e.preventDefault();
    });

    let grabWin = document.querySelector('.triple-win__btn');
    grabWin.addEventListener('click',(e) => {
        tripleWin.close();
        header.removeChild(tripleWin);
        addWinToCredit(960000);
    });  


}

export function saveNumbersToLocalStorage(){
    localStorage.setItem('winNumbers', JSON.stringify(winNumbers));
    localStorage.setItem('gambleNumbers', JSON.stringify(gambleNumbers));
};
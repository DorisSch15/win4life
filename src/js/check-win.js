import { gambleNumbers, winNumbers } from './game.js';
import { clientData, renderUser } from './user.js';
import { showGameResultDialog } from './dialog_game-result.js';
import { showTripleWinDialog } from './dialog_triple-win.js';
import { saveNumbersToLocalStorage } from './game.js';

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
        showTripleWinDialog();
    } else {
        showGameResultDialog(winFromCurrentCard);
    }
};

export function addWinToCredit(amount){
    clientData.amount += amount;
    renderUser();
};
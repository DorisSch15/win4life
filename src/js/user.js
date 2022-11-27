import { renderCard, costCard, getCurrencyFormat } from './index.js';
import { createNewCard, winNumbers, gambleNumbers } from './game.js';
import { showUserSetUpDialog } from './dialog_new-user.js';
import { showNewCardForRealDialog } from './dialog_new-card.js';
import { showTopUpDialog } from './dialog_top-up-credit.js';

let name = document.querySelector('.user__title-welcome-name');
let credit = document.querySelector('.user__credit-number');


export let clientData = {
    name: '',
    amount: 0,
    currency: '',
    set setUser(value){
        this.name = value.name;
        this.amount = value.amount;
        this.currency = value.currency;
    }
};

export function checkUserData(){
    if(localStorage.getItem('clientData') === null){
        showUserSetUpDialog();
        renderCard();
    } else {
        clientData = JSON.parse(localStorage.getItem('clientData'));
        renderUser();
        renderCard();
    }
};

export function renderUser(){ 
    name.innerHTML = `&nbsp;${clientData.name}`;
    credit.innerHTML = ` ${getCurrencyFormat(clientData.amount)} ${clientData.currency}`;
    saveClientDataToLocalStorage();
};

function saveClientDataToLocalStorage(){
    localStorage.setItem('clientData', JSON.stringify(clientData));
};

let btnBuy = document.querySelector('.user__buyone-btn');
btnBuy.addEventListener('click', buyCard);

export function buyCard(){
    if(winNumbers.some(e => e.scratched === false) || gambleNumbers.some(e => e.scratched === false)){
        showNewCardForRealDialog();
    } else {
        if(clientData.amount < costCard){
            showTopUpDialog();
        } else {
            clientData.amount -= costCard;
            
            createNewCard();
            renderCard();
            renderUser();
        }
    }
};
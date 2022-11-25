import { header, renderCard } from './index.js';
import { clientData, costCard, renderUser, buyCard } from './user.js';
import { createNewCard } from './game.js';
import { topUpCreditAmount } from './dialog_top-up-credit.js';


export function newCardForRealDialog(){

    let newCardForReal = document.createElement('dialog');

    newCardForReal.classList.add('new-card');

    newCardForReal.innerHTML = `
        <h3 class="new-card__title">Sicher, dass du wieder eine neue Karte willst ?</h3>
        <div class="new-card__emojis">
            <i class="fa-solid fa-circle-question"></i>
            <i class="fa-regular fa-hand"></i>
            <i class="fa-solid fa-circle-question"></i>
        </div>
        <p class="new-card__text">So wies aussieht, bist du 2x auf den Kauf-Button gekommen. Sicher, dass du eine neue Karte willst, obwohl noch nicht alles aufgedeckt ist ?</p>
        <div class="new-card__btns">
            <button class="new-card__btns-yes">Japp, unbedingt !</button>
            <button class="new-card__btns-no">Nope, das war ein Fehler !</button>
        </div>
    `;

    header.appendChild(newCardForReal);

    newCardForReal.showModal();

    newCardForReal.addEventListener('cancel', (e) => {
        e.preventDefault();
    });

    let yes = document.querySelector('.new-card__btns-yes');
    let no = document.querySelector('.new-card__btns-no')

    yes.addEventListener('click',(e) => {
        if(clientData.amount < costCard){

            topUpCreditAmount();

            newCardForReal.close();
            header.removeChild(newCardForReal);


        } else {
            clientData.amount -= costCard;

            newCardForReal.close();
            header.removeChild(newCardForReal);

            createNewCard();
            renderCard();
            renderUser();
        }
    });

    no.addEventListener('click', (e) => {
        newCardForReal.close();
        header.removeChild(newCardForReal);
    });
};
import { header, getCurrencyFormat } from './index.js';
import { clientData, renderUser } from './user.js';

export function showPayOutDialog(){
    
    let payOutDialog = document.createElement('dialog');

    payOutDialog.classList.add('payout');

    payOutDialog.innerHTML = `
        <h3 class="payout__title">Unmengen an Geld gewonnen ?</h3>
        <div class="payout__emojis">
            <i class="fa-solid fa-face-grin-squint-tears"></i>
            <i class="fa-solid fa-money-check"></i>
            <i class="fa-solid fa-face-grin-tongue-squint"></i>
        </div>
        <p class="payout__text">Leider ist das hier nur ein Spiel und deshalb können wir dir deinen Betrag über ${getCurrencyFormat(clientData.amount)} ${clientData.currency}. nicht auszahlen.<br><br>
        Gerne kannst du das Geld für die Weiterentwicklung der App spenden oder zum Game zurückkehren.</p>
        <div class="payout__btns">
            <button class="payout__btns-donate">
                <i class="fa-solid fa-hand-holding-dollar"></i>
                <span>Betrag spenden</span>
            </button>
            <button class="payout__btns-return">
                <i class="fa-solid fa-gamepad"></i>
                <span>Weiterzocken bitte !</span>
            </button>
        </div>
    `;

    header.appendChild(payOutDialog);

    payOutDialog.showModal();

    payOutDialog.addEventListener('cancel', (e) => {
        e.preventDefault();
    });

    let donateBtn = document.querySelector('.payout__btns-donate');
    let returnGameBtn = document.querySelector('.payout__btns-return');

    donateBtn.addEventListener('click', () => {
        clientData.amount = 0;
        renderUser();
        payOutDialog.close();
        header.removeChild(payOutDialog);
    });

    returnGameBtn.addEventListener('click', () => {
        payOutDialog.close();
        header.removeChild(payOutDialog);
    });
};

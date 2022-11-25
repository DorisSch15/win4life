import { header } from './index.js';
import { clientData, renderUser } from './user.js';

let topUpCredit;

export function topUpCreditAmount(){
    topUpCredit = document.createElement('dialog');

    topUpCredit.classList.add('top-up-credit');

    topUpCredit.innerHTML = `
        <h3 class="top-up-credit__title">Guthaben aufladen</h3>
        <div class="top-up-credit__emojis">
            <i class="fa-regular fa-thumbs-down"></i>
            <i class="fa-solid fa-filter-circle-dollar"></i>
            <i class="fa-regular fa-thumbs-up"></i>
            <i class="fa-solid fa-coins"></i>
        </div>
        <p class="top-up-credit__text">So wies aussieht, war das Glück nicht auf deiner Seite. Dein aktuelles Guthaben beträgt:.<br><br>Leider ist dein Guthaben unter die Kosten eines neuen Gewinnloses gefallen. Lade dein Guthaben wieder auf</p>
        <form method="dialog" class="top-up-credit__add-money">
        <div class="add-money">
            <div class="add-money__new-credit">
                <label class="add-money__new-credit-label" for="newCredit">Wieviel willst du verspielen ?</label>
                <div class="add-money__new-credit-input">
                    <select class="add-money__new-credit-input-select" id="newCredit">
                        <option value="100">100 Fr.</option>
                        <option value="200">200 Fr.</option>
                        <option value="300">300 Fr.</option>
                        <option value="400">400 Fr.</option>
                        <option value="500">500 Fr.</option>
                        <option value="600">600 Fr.</option>
                        <option value="700">700 Fr.</option>
                        <option value="800">800 Fr.</option>
                        <option value="900">900 Fr.</option>
                        <option value="1000">1'000 Fr.</option>
                    </select>
                    <div class="add-money__new-credit-arrow">
                        <i class="fa-regular fa-circle-down"></i>
                    </div>
                </div>
            </div>
            <button class="add-money__btn">
                <i class="fa-solid fa-sack-dollar"></i>
                <span>Guthaben aufladen</span>
            </button>
        </div>
        </form>

    `;

    header.appendChild(topUpCredit);

    topUpCredit.showModal();

    topUpCredit.addEventListener('cancel', (e) => {
        e.preventDefault();
    }); 

    let topUpBtn = document.querySelector('.add-money__btn');
    topUpBtn.addEventListener('click',(e) => {
        e.preventDefault();
        closeTopUpDialog();
    });
};

function closeTopUpDialog(){   
    let newCredit = document.querySelector('#newCredit').value;

    clientData.amount += parseInt(newCredit);

    renderUser();

    topUpCredit.close();
    header.removeChild(topUpCredit);
};

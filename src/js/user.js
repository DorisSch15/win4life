import { winSection, gameSection, renderCard, getCurrencyFormat } from './index.js';
import { createNewCard, winNumbers, gambleNumbers } from './game.js';

// get UserData / check UserData

export let header = document.querySelector('header');
let firstAttend;
let topUpCredit;
let costCard = 100;

let name = document.querySelector('.user__title-name');
let credit = document.querySelector('.user__credit-number');

export let clientData;

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

function showUserSetUpDialog(){
    winSection.classList.add('win-section__table--inactive');
    gameSection.classList.add('game-section__table--inactive');

    firstAttend = document.createElement('dialog');
    
    firstAttend.classList.add('new-client');
    
    firstAttend.innerHTML = `
    <div class="new-client__emojis">
        <i class="fa-solid fa-poo"></i>
        <i class="fa-regular fa-face-laugh-squint"></i>
        <i class="fa-solid fa-user-secret"></i>
        <i class="fa-regular fa-circle-user"></i>
    </div>
    <h5 class="new-client__title">Willkommen ! Let's get personal...</h5>
    <form method="dialog" class="new-client__yourdetails">
        <div class="yourdetails">
            <div class="yourdetails__yourname">
                <label class="yourdetails__yourname-label" for="clientName">Teile uns deinen Namen mit: </label>
                <input class="yourdetails__yourname-input" id="clientName" type="text">
            </div>
            <div class="yourdetails__yourcredit">
                <label class="yourdetails__yourcredit-label" for="clientCredit">Wieviel willst du ausgeben ?</label>
                <div class="yourdetails__yourcredit-input">
                    <select class="yourdetails__yourcredit-input-select" id="clientCredit">
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
                    <div class="yourdetails__yourcredit-arrow">
                        <i class="fa-regular fa-circle-down"></i>
                    </div>
                </div>
            </div>
        </div>
        <button class="new-client__btn">
        <i class="fa-solid fa-right-to-bracket"></i>
        <span>Los Gehts !</span>
        </button>
    </form>
    <div class="new-client__price">
        <h3>ZU DEINER INFO</h3>
        Ein WinForLife-Los kostet <span>100 Fr</span>.<br>Viel Spass beim Spielen !
    </div>
    `;

    header.appendChild(firstAttend);

    firstAttend.showModal();

    firstAttend.addEventListener('cancel', (e) => {
        e.preventDefault();
    });
    
    let letsStart = document.querySelector('.new-client__btn');
    letsStart.addEventListener('click',(e) => {
        e.preventDefault();
        closeUserSetUpDialog();
    });
};

function closeUserSetUpDialog(){
    let inputs = document.querySelectorAll('input');
    
    let userName = document.querySelector('#clientName').value;
    let userCredit = document.querySelector('#clientCredit').value;

    if(!userName.match(/^\s*$/) && !userCredit.match(/^\s*$/)){
        clientData = {
            name: userName,
            amount: parseInt(userCredit),
            currency: "Fr"
        };
        
        winSection.classList.remove('win-section__table--inactive');
        gameSection.classList.remove('game-section__table--inactive');
        
        renderUser();
        buyCard();
        firstAttend.close();
        header.removeChild(firstAttend);

    } else {
        for(let input of inputs){
            if(input.value.match(/^\s*$/)){
                input.style.backgroundColor = '#B81F3C';
                input.placeholder = 'bitte ausfüllen';
            }
        };
    }
};

function renderUser(){ 
    name.innerHTML = ` ${clientData.name}`;
    credit.innerHTML = ` ${getCurrencyFormat(clientData.amount)} ${clientData.currency}`;
    saveClientDataToLocalStorage();
};

function saveClientDataToLocalStorage(){
    localStorage.setItem('clientData', JSON.stringify(clientData));
};

let btnBuy = document.querySelector('.user__buyone-btn');

btnBuy.addEventListener('click', buyCard);

function buyCard(){

    if(winNumbers.some(e => e.scratched === false) || gambleNumbers.some(e => e.scratched === false)){
        
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

                topUpAmount();

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
        
    } else {
        if(clientData.amount < costCard){

            topUpAmount();
            
        } else {

            clientData.amount -= costCard;
            
            createNewCard();
            renderCard();
            renderUser();
        }
    }
};

export function addWinToCredit(amount){
    clientData.amount += amount;
    renderUser();
};

let btnCollect = document.querySelector('.user__collect-btn');
btnCollect.addEventListener('click', collectWin)

function collectWin(){
    let collectWinDialog = document.createElement('dialog');

    collectWinDialog.classList.add('collect-win');

    collectWinDialog.innerHTML = `
        <h3 class="collect-win__title">Unmengen an Geld gewonnen ?</h3>
        <div class="collect-win__emojis">
            <i class="fa-solid fa-face-grin-squint-tears"></i>
            <i class="fa-solid fa-money-check"></i>
            <i class="fa-solid fa-face-grin-tongue-squint"></i>
        </div>
        <p class="collect-win__text">Leider ist das hier nur ein Spiel und deshalb können wir dir deinen Betrag über ${getCurrencyFormat(clientData.amount)} ${clientData.currency}. nicht auszahlen.<br><br>
        Gerne kannst du das Geld für die Weiterentwicklung der App spenden oder zum Game zurückkehren.</p>
        <div class="collect-win__btns">
            <button class="collect-win__btns-donate">
                <i class="fa-solid fa-hand-holding-dollar"></i>
                <span>Betrag spenden</span>
            </button>
            <button class="collect-win__btns-return">
                <i class="fa-solid fa-gamepad"></i>
                <span>Weiterzocken bitte !</span>
            </button>
        </div>
    `;

    header.appendChild(collectWinDialog);

    collectWinDialog.showModal();

    collectWinDialog.addEventListener('cancel', (e) => {
        e.preventDefault();
    });

    let donateBtn = document.querySelector('.collect-win__btns-donate');
    let returnGameBtn = document.querySelector('.collect-win__btns-return');

    donateBtn.addEventListener('click', () => {
        clientData.amount = 0;
        renderUser();
        collectWinDialog.close();
        header.removeChild(collectWinDialog);
    });

    returnGameBtn.addEventListener('click', () => {
        collectWinDialog.close();
        header.removeChild(collectWinDialog);
    });
};

export function topUpAmount(){
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

import { getCurrencyFormat } from './index.js';
import { letsGamble } from './game.js';

let header = document.querySelector('header');

let startDialog;

let btnBuy = document.querySelector('.user__buyone-btn');
let btnCollect = document.querySelector('.user__collect-btn');

export let clientData;

export function checkUserData(){
    if(localStorage.getItem('clientData') === null){
        showDialog();
    } else {
        clientData = JSON.parse(localStorage.getItem('clientData'));
        renderUser();
    }
};

function showDialog(){
    startDialog = document.createElement('dialog');
    
    startDialog.classList.add('new-client');
    
    startDialog.innerHTML = `
    <div class="new-client__emojis">
    <div class="fa-solid fa-poo"></div>
    <div class="fa-regular fa-face-laugh-squint"></div>
    <div class="fa-solid fa-user-secret"></div>
    <div class="fa-regular fa-circle-user"></div>
    </div>
    <h5 class="new-client__welcome">Willkommen ! Let's get personal...</h5>
    <form method="dialog" class="new-client__yourdetails">
    <div class="yourdetails">
    <div class="yourdetails__yourname">
    <label class="yourdetails__yourname-label" for="clientName">Teile uns deinen Namen mit: </label>
    <input class="yourdetails__yourname-input" id="clientName" type="text">
    </div>
    <div class="yourdetails__yourcredit">
    <label class="yourdetails__yourcredit-label" for="startCredit">Wieviel willst du verspielen ?</label>
    <input class="yourdetails__yourcredit-input" id="clientCredit" type="number">
    </div>
    </div>
    <button class="new-client__get-started">
    <i class="fa-solid fa-right-to-bracket"></i>
    <span>Los Gehts !</span>
    </button>
    </form>
    `;
    header.appendChild(startDialog);
    
    startDialog.showModal();
    
    
    let letsStart = document.querySelector('.new-client__get-started');
    startDialog.addEventListener('cancel', (e) => {
        e.preventDefault();
    });
    
    letsStart.addEventListener('click',(e) => {
        e.preventDefault();
        closeDialog();
    });

};

function closeDialog(){
    let inputs = document.querySelectorAll('input');
    
    let userName = document.querySelector('#clientName').value;
    let userCredit = document.querySelector('#clientCredit').value;
    
    if(!userName.match(/^\s*$/) && !userCredit.match(/^\s*$/)){
        clientData = {
            name: userName,
            amount: userCredit,
            currency: "Fr"
        };
        
        renderUser();
        saveLocalStorage();
        startDialog.close();
        console.log(clientData);
        
    } else {
        for(let input of inputs){
            if(input.value.match(/^\s*$/)){
                input.style.backgroundColor = 'red';
            }
        };
    };
};

function renderUser(){ 
    let name = document.querySelector('.user__title-name');
    let credit = document.querySelector('.user__credit-number');

    name.innerHTML = `${clientData.name}`;
    credit.innerHTML = `${getCurrencyFormat(clientData.amount)} ${clientData.currency}`;
};

function saveLocalStorage(){
    localStorage.setItem('clientData', JSON.stringify(clientData));
};


import { winSection, gameSection, header } from './index.js';
import { clientData, renderUser, buyCard } from './user.js';

let firstVisit;

export function showUserSetUpDialog(){
    winSection.classList.add('win-section__table--inactive');
    gameSection.classList.add('game-section__table--inactive');

    firstVisit = document.createElement('dialog');
    firstVisit.classList.add('new-user');
    
    firstVisit.innerHTML = `
        <div class="new-user__emojis">
            <i class="fa-solid fa-poo"></i>
            <i class="fa-regular fa-face-laugh-squint"></i>
            <i class="fa-solid fa-user-secret"></i>
            <i class="fa-regular fa-circle-user"></i>
        </div>
        <h3 class="new-user__title">Willkommen ! Let's get personal...</h3>
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
            <button class="new-user__btn">
                <i class="fa-solid fa-right-to-bracket"></i>
                <span>Los Gehts !</span>
            </button>
        </form>
        <div class="new-user__price">
            <h4>ZU DEINER INFO</h4>
            Ein WinForLife-Los kostet 100 Fr.<br>Viel Spass beim Spielen !
        </div>
    `;

    header.appendChild(firstVisit);

    firstVisit.showModal();
    firstVisit.addEventListener('cancel', (e) => {
        e.preventDefault();
    });
    
    let letsStart = document.querySelector('.new-user__btn');
    letsStart.addEventListener('click',(e) => {
        e.preventDefault();
        closeUserSetUpDialog();
    });
};

export function closeUserSetUpDialog(){
    let inputs = document.querySelectorAll('input');
    let userName = document.querySelector('#clientName').value;
    let userCredit = document.querySelector('#clientCredit').value;

    if(!userName.match(/^\s*$/) && !userCredit.match(/^\s*$/)){
        clientData.setUser = {
            name: userName,
            amount: parseInt(userCredit),
            currency: "Fr"
        };
                
        winSection.classList.remove('win-section__table--inactive');
        gameSection.classList.remove('game-section__table--inactive');
        
        renderUser();
        buyCard(false);

        firstVisit.close();
        header.removeChild(firstVisit);
    } else {
        for(let input of inputs){
            if(input.value.match(/^\s*$/)){
                input.style.backgroundColor = '#B81F3C';
                input.placeholder = 'bitte ausfüllen';
            }
        };
    }
};

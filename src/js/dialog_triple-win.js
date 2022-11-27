import { header } from './index.js';
import { addWinToCredit } from './check-win.js';

export function showTripleWinDialog(){
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
    
    grabWin.addEventListener('click',() => {
        tripleWin.close();
        header.removeChild(tripleWin);

        addWinToCredit(960000);
    });  
};

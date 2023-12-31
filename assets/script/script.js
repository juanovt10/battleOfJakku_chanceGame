document.addEventListener("DOMContentLoaded", function() {
    
    let buttons = document.getElementsByTagName('button');

    for (let button of buttons) {
        button.addEventListener('click', function() {
            if (this.getAttribute('data-type') === 'cover') {
                checkHealth();
                pushAnswer('cover');
                cover('user_health_bar_full');
            } else if (this.getAttribute('data-type') === 'reload') {
                checkHealth();
                reloadAmmo(); 
            } else if ((this.getAttribute('data-type') === 'shoot')) {
                checkHealth();
                ammoCheck();
            } else if (((this.getAttribute('data-type') === 'restart'))){
                restartGame();
            } else {
                closePopup();
            }
        });
    }
    
    let currentUserHealth = '0%';
    let currentCpuHealth = '0%';
    
    if (window.innerWidth > 768) {
        document.getElementById('user_health_bar').style.height = currentUserHealth;
        document.getElementById('cpu_health_bar').style.height = currentCpuHealth;
    } else {
        document.getElementById('user_health_bar').style.width = currentUserHealth;
        document.getElementById('cpu_health_bar').style.width = currentCpuHealth;
    }
});

/**
 * This function is to close the intial and no ammo popup
 */
function closePopup() {
    let startGamePopup = document.getElementById('start_game_popup');
    startGamePopup.classList.add('close_popup');

    let noAmmoPopup = document.getElementById('no_ammo_popup');
    noAmmoPopup.classList.remove('open_popup');
    
    let ammoDisplay = document.getElementById('user_ammo_display');
    ammoDisplay.style.color = 'white';
}

/**
 * This function defines when the game is over. It checks the health values of the players (height of div), and if this value is 100% it means that the player wins or loses
 */
function checkHealth() {
    let currentUserHealth;
    let currentCpuHealth;

    if (window.innerWidth > 768) {
        currentUserHealth = document.getElementById('user_health_bar').style.height;
        currentCpuHealth = document.getElementById('cpu_health_bar').style.height;
    } else {
        currentUserHealth = document.getElementById('user_health_bar').style.width;
        currentCpuHealth = document.getElementById('cpu_health_bar').style.width;
    }

    if (currentUserHealth === '100%') {
        let losePopup = document.getElementById('cpu_win_popup'); 
        losePopup.classList.add('open_popup');
                
    } else if (currentCpuHealth === '100%') {
        let winPopup = document.getElementById('user_win_popup'); 
        winPopup.classList.add('open_popup');
    }
}

/**
 * This function will add 1 to the ammo count and trigger the pushAnswer function that will put the 
 * result in the big screen and trigger the cpu selection
 */
function reloadAmmo() {
    let userAmmo = parseInt(document.getElementById('user_ammo').innerText);
    let shootBtn = document.getElementById('selection_shoot');

    document.getElementById('user_ammo').innerText = ++userAmmo;
    
    shootBtn.classList.remove('shoot_lock');
    shootBtn.classList.remove('shoot_lock_hover');

    ammoBlink('user_ammo_display');

    pushAnswer('reload');
}

/**
 * This function creates the blinking effect in the ammo count with the symbol
 */
function ammoBlink(ammoId) {
    
    let ammoElement = document.getElementById(ammoId);

    ammoElement.style.color = 'green';

    function toggleColor() {
        if (ammoElement.style.color === 'green') {
        ammoElement.style.color = 'white';
        } else {
        ammoElement.style.color = 'green';
        }
    }

    let interval = setInterval(toggleColor, 200);

    setTimeout(function () {
        clearInterval(interval);
        ammoElement.style.color = 'white';
    }, 400);
}

/**
 * This function will check if the user has ammo, if it does, it will trigger the push_answer() function
 * if not, it will display an alert that the user does not have ammo. 
 */
function ammoCheck() {
    let userAmmo = parseInt(document.getElementById('user_ammo').innerText); 
    let noAmmoPopup = document.getElementById('no_ammo_popup');
    let ammoDisplay = document.getElementById('user_ammo_display');
    let shootBtn = document.getElementById('selection_shoot');

    if (userAmmo != 0) {
        pushAnswer('shoot');
        document.getElementById('user_ammo').innerText = --userAmmo;
    } else {
        noAmmoPopup.classList.add('open_popup');
        ammoDisplay.style.color = 'red';
        shootBtn.classList.add('shoot_lock');
        shootBtn.classList.add('shoot_lock_hover');
    }
}

/**
 * This function is comprised in two parts. The first one assesses the user selection, 
 * allocates it a number from 0 to 2 and pushes the result into the main div. The second
 * part assesses the amount of ammo the cpu has, and then makes create a random number between 
 * 0 and 1, or 0 and 2 if it has ammo and displays the result in the main div. 
 */
function pushAnswer(userSelection) {

    let userResult; 

    if (userSelection === 'cover') {
        userResult = 0;
    } else if (userSelection === 'reload') {
        userResult = 1;
    } else if (userSelection === 'shoot') {
        userResult = 2;
    }

    let cpuAmmo = parseInt(document.getElementById('cpu_ammo').innerText);
    let cpuResult;

    if (cpuAmmo != 0) {
        cpuResult = Math.floor(Math.random() * 3);
    } else {
        cpuResult = Math.floor(Math.random() * 2);
    }

    console.log(cpuResult);

    if (cpuResult === 0) { 
        cover('cpu_health_bar_full');
    } else if (cpuResult === 1) {
        document.getElementById('cpu_ammo').innerText = ++cpuAmmo;
        ammoBlink('cpu_ammo_display');
    } else if (cpuResult === 2) {
        document.getElementById('cpu_ammo').innerText = --cpuAmmo;
    }

    checkAnswer(userResult, cpuResult);
}

/**
 * This function creates the blinking effect of the health bar to represents that the user/bot is covering
 */
function cover(coverId) {
    let healthCover = document.getElementById(coverId);

    healthCover.style.backgroundColor = 'blue'; 
    
    function toggleColor() {
        if (healthCover.style.backgroundColor === 'blue') {
            healthCover.style.backgroundColor = 'black';
        } else {
            healthCover.style.backgroundColor = 'blue';
        }
    }

    let interval = setInterval(toggleColor, 200);

    setTimeout(function () {
        clearInterval(interval);
        healthCover.style.backgroundColor = 'black';
    }, 400);
}

/**
 * This function checks the results of both the cpu and the user, and assesses the outcome. 
 * - If both cover, the game continues. 
 * - If both reload or shoot simultaneously, the game continues. 
 * - The one that shoots when the other is reloading, wins and increased the duels won record.
 */

function checkAnswer(userResult, cpuResult) {

    let currentUserHealth;
    let currentCpuHealth;

    if (window.innerWidth > 768) {
        currentUserHealth = parseInt((document.getElementById('user_health_bar').style.height).slice(0,1));
        currentCpuHealth = parseInt((document.getElementById('cpu_health_bar').style.height).slice(0,1));
    } else {
        currentUserHealth = parseInt((document.getElementById('user_health_bar').style.width).slice(0,1));
        currentCpuHealth = parseInt((document.getElementById('cpu_health_bar').style.width).slice(0,1));
    }
    if (userResult === 0 || cpuResult === 0) {

    } else if (userResult === 1 && cpuResult === 1) {

    } else if (userResult === 1 && cpuResult === 2) {

        userDamage('user_health_bar_full');
        currentUserHealth += 2;

        if (window.innerWidth > 768) {
            document.getElementById('user_health_bar').style.height = currentUserHealth + '0%';
        } else {
            document.getElementById('user_health_bar').style.width = currentUserHealth + '0%';
        }

        if (currentUserHealth > 3 && currentUserHealth < 7) {
            document.getElementById('user_health_bar_full').style.boxShadow = '0 0 20px 20px yellow';
        } else if (currentUserHealth > 7) {
            document.getElementById('user_health_bar_full').style.boxShadow = '0 0 20px 20px red';
        } 

    } else if (userResult === 2 && cpuResult === 1) {

        userDamage('cpu_health_bar_full');
        currentCpuHealth += 2;

        if (window.innerWidth > 768) {
            document.getElementById('cpu_health_bar').style.height = currentCpuHealth + '0%';
        } else {
            document.getElementById('cpu_health_bar').style.width = currentCpuHealth + '0%';
        }
        
        if (currentCpuHealth > 3 && currentCpuHealth < 7) {
            document.getElementById('cpu_health_bar_full').style.boxShadow = '0 0 20px 20px yellow';
        } else if (currentCpuHealth > 7) {
            document.getElementById('cpu_health_bar_full').style.boxShadow = '0 0 20px 20px red';
        } 

    } else if (userResult === 2 && cpuResult === 2) {
        console.log('gameContinues');
    }

    checkHealth();
}

/**
 * This function creates the blinking effect of the health bar border to represent damage
 */
function userDamage(healthId) {
    let healthBar = document.getElementById(healthId);

    healthBar.style.border = '1px outset red';

    function toggleColor() {
        if (healthBar.style.border === '2px outset red') {
            healthBar.style.border = '1px inset white';
        } else {
            healthBar.style.border = '2px outset red';
        }
    }

    let interval = setInterval(toggleColor, 200);

    setTimeout(function () {
        clearInterval(interval);
        healthBar.style.border = '1px solid white';
    }, 400);
}

/**
 * This function restarts the health bars, the ammo to 1 and displays and is trigger play again button is pressed
 */
function restartGame() {

    if (window.innerWidth > 768) {
        document.getElementById('user_health_bar').style.height = '0%';
        document.getElementById('cpu_health_bar').style.height = '0%';
    } else {
        document.getElementById('user_health_bar').style.width = '0%';
        document.getElementById('cpu_health_bar').style.width = '0%';
    }

    document.getElementById('user_health_bar_full').style.boxShadow = '0 0 20px 20px green';
    document.getElementById('cpu_health_bar_full').style.boxShadow = '0 0 20px 20px green';

    let winPopup = document.getElementById('user_win_popup'); 
    winPopup.classList.remove('open_popup');

    let losePopup = document.getElementById('cpu_win_popup'); 
    losePopup.classList.remove('open_popup');

    document.getElementById('user_ammo').innerText = 1;
    document.getElementById('cpu_ammo').innerText = 1;
}
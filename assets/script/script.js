document.addEventListener("DOMContentLoaded", function() {
    
    let buttons = document.getElementsByTagName('button');

    for (let button of buttons) {
        button.addEventListener('click', function() {
            if (this.getAttribute('data-type') === 'cover') {
                checkHealth()
                pushAnswer('cover');
            } else if (this.getAttribute('data-type') === 'reload') {
                checkHealth()
                reloadAmmo(); 
            } else if ((this.getAttribute('data-type') === 'shoot')) {
                checkHealth()
                ammoCheck();
            } else if (((this.getAttribute('data-type') === 'restart'))){
                restartGame();
            } else {
                closePopup();
            }
        })
    }

    let currentUserHealth = '0%'
    document.getElementById('user_health_bar').style.height = currentUserHealth;

    let currentCpuHealth = '0%'
    document.getElementById('cpu_health_bar').style.height = currentCpuHealth;
})

function closePopup() {
    let noAmmoPopup = document.getElementById('no_ammo_popup');
    noAmmoPopup.classList.remove('open_popup')
}

function checkHealth() {
    let currentUserHealth = document.getElementById('user_health_bar').style.height;
    let currentCpuHealth = document.getElementById('cpu_health_bar').style.height;

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
    document.getElementById('user_ammo').innerText = ++userAmmo;

    pushAnswer('reload');
}

/**
 * This function will check if the user has ammo, if it does, it will trigger the push_answer() function
 * if not, it will display an alert that the user does not have ammo. 
 */
function ammoCheck() {
    let userAmmo = parseInt(document.getElementById('user_ammo').innerText); 
    let noAmmoPopup = document.getElementById('no_ammo_popup');

    if (userAmmo != 0) {
        pushAnswer('shoot');
        document.getElementById('user_ammo').innerText = --userAmmo;
    } else {
        noAmmoPopup.classList.add('open_popup')
    }
}

/**
 * This function is comprised in two parts. The first one assesses the user selection, 
 * allocates it a number from 0 to 2 and pushes the result into the main div. The second
 * part assesses the amount of ammo the cpu has, and then makes create a random number between 
 * 0 and 1, or 0 and 2 if it has ammo and displays the result in the main div. 
 */
function pushAnswer(userSelection) {

    let userSelectionArea = document.getElementById('user_selection_decision');

    if (userSelection === 'cover') {

        // userSelectionArea.innerHTML = '<img src="assets/images/cover_icon.png" alt="Sheriff icon">';
        userResult = 0;
    } else if (userSelection === 'reload') {
        // userSelectionArea.innerHTML = '<img src="assets/images/reload_icon.png" alt="Reload icon">';
        userResult = 1;
    } else if (userSelection === 'shoot') {
        // userSelectionArea.innerHTML = '<img src="assets/images/shoot_icon.png" alt="Shoot icon">';
        userResult = 2;
    }
    
    console.log(userResult);

    let userAmmo = parseInt(document.getElementById('user_ammo').innerText); 
    let cpuAmmo = parseInt(document.getElementById('cpu_ammo').innerText);

    if (cpuAmmo != 0) {
        cpuResult = Math.floor(Math.random() * 3)
    } else {
        cpuResult = Math.floor(Math.random() * 2)
    }

    let cpuSelectionArea = document.getElementById('cpu_selection_decision');

    console.log(cpuResult)

    if (cpuResult === 0) { 
        // cpuSelectionArea.innerHTML = '<img src="assets/images/cover_icon.png" alt="Cover icon">';
    } else if (cpuResult === 1) {
        document.getElementById('cpu_ammo').innerText = ++cpuAmmo;
        // cpuSelectionArea.innerHTML = '<img src="assets/images/reload_icon.png" alt="Reload icon">';
    } else if (cpuResult === 2) {
        // cpuSelectionArea.innerHTML = '<img src="assets/images/shoot_icon.png" alt="Shoot icon">';
        document.getElementById('cpu_ammo').innerText = --cpuAmmo
    }

    checkAnswer(userResult, cpuResult);
}


/**
 * This function checks the results of both the cpu and the user, and assesses the outcome. 
 * - If both cover, the game continues. 
 * - If both reload or shoot simultaneously, the game continues. 
 * - The one that shoots when the other is reloading, wins and increased the duels won record.
 */


function checkAnswer(userResult, cpuResult) {

    let currentUserHealth = parseInt((document.getElementById('user_health_bar').style.height).slice(0,1));
    let currentCpuHealth = parseInt((document.getElementById('cpu_health_bar').style.height).slice(0,1));
    
    if (userResult === 0 || cpuResult === 0) {
        console.log('gameContinues');
    } else if (userResult === 1 && cpuResult === 1) {
        console.log('gameContinues');
    } else if (userResult === 1 && cpuResult === 2) {

        console.log('gameOver');
        currentUserHealth += 1;
        document.getElementById('user_health_bar').style.height = currentUserHealth + '0%';
        alert("XXXX has shoot you when you are reloading, he will keep tormenting XXXX town")
        console.log(document.getElementById('user_health_bar').style.height)

    } else if (userResult === 2 && cpuResult === 1) {

        console.log('youWin');
        currentCpuHealth += 1;
        document.getElementById('cpu_health_bar').style.height = currentCpuHealth + '0%';
        alert("Congratulations! You have beaten XXXX in the most epic standoff XXXX have seen!")
        console.log(document.getElementById('cpu_health_bar').style.height)
        

    } else if (userResult === 2 && cpuResult === 2) {
        console.log('gameContinues');
    }

    checkHealth(currentUserHealth, currentCpuHealth);
    checkHealth(currentUserHealth, currentCpuHealth);
}


/**
 * This function restarts the ammo of both the user and cpu after, winning, losing or restarting
 */
function restartAmmo() {
    document.getElementById('user_ammo').innerText = 1;
    document.getElementById('cpu_ammo').innerText = 1;
}


/**
 * This function restarts the duels won count and the ammo to 1 each
 */
function restartGame() {
    document.getElementById('user_health_bar').style.height = '0%';
    document.getElementById('cpu_health_bar').style.height = '0%';

    let winPopup = document.getElementById('user_win_popup'); 
    winPopup.classList.remove('open_popup');

    let losePopup = document.getElementById('cpu_win_popup'); 
    losePopup.classList.remove('open_popup');

    restartAmmo();
}
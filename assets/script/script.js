document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName('button');

    for (let button of buttons) {
        button.addEventListener('click', function() {
            if (this.getAttribute('data-type') === 'cover') {
                pushAnswer('cover');
            } else if (this.getAttribute('data-type') === 'reload') {
                reloadAmmo(); 
            } else if ((this.getAttribute('data-type') === 'shoot')) {
                ammoCheck();
            } else {
                restartGame();
            }
        })
    }
})

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
    
    if (userAmmo != 0) {
        pushAnswer('shoot');
        document.getElementById('user_ammo').innerText = --userAmmo;
    } else {
        alert(`You don't have any ammo! Reload to be able to shoot.`)
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
        userSelectionArea.innerHTML = 'cover';
        userResult = 0;
    } else if (userSelection === 'reload') {
        userSelectionArea.innerHTML = 'reload';
        userResult = 1;
    } else if (userSelection === 'shoot') {
        userSelectionArea.innerHTML = 'shoot';
        userResult = 2;
    }
    
    console.log(userResult);
    
    let cpuAmmo = parseInt(document.getElementById('cpu_ammo').innerText);

    if (cpuAmmo != 0) {
        cpuResult = Math.floor(Math.random() * 3)
    } else {
        cpuResult = Math.floor(Math.random() * 2)
    }

    let cpuSelectionArea = document.getElementById('cpu_selection_decision');

    console.log(cpuResult)

    if (cpuResult === 0) {
        cpuSelectionArea.innerText = 'cover';
    } else if (cpuResult === 1) {
        document.getElementById('cpu_ammo').innerText = ++cpuAmmo;
        cpuSelectionArea.innerText = 'reload';
    } else if (cpuResult === 2) {
        cpuSelectionArea.innerText = 'shoot';
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

    let userScore = parseInt(document.getElementById('user_score').innerText);
    let cpuScore = parseInt(document.getElementById('cpu_score').innerText);
    
    if (userResult === 0 || cpuResult === 0) {
        console.log('gameContinues');
    } else if (userResult === 1 && cpuResult === 1) {
        console.log('gameContinues');
    } else if (userResult === 1 && cpuResult === 2) {

        console.log('gameOver');
        document.getElementById('cpu_score').innerText = ++cpuScore;
        restartAmmo();

    } else if (userResult === 2 && cpuResult === 1) {

        console.log('youWin');
        document.getElementById('user_score').innerText = ++userScore;
        restartAmmo();

    } else if (userResult === 2 && cpuResult === 2) {
        console.log('gameContinues');
    }
}

function restartAmmo() {
    document.getElementById('user_ammo').innerText = 1;
    document.getElementById('cpu_ammo').innerText = 1;
}

function restartGame() {
    document.getElementById('user_score').innerText = 0;
    document.getElementById('cpu_score').innerText = 0;

    restartAmmo();
}
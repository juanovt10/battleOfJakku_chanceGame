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

function pushAnswer(userSelection) {

    if (userSelection === 'cover') {
        //push cover into the big screen
        userResult = 0;
    } else if (userSelection === 'reload') {
        //push reload into the big screen
        userResult = 1;
    } else if (userSelection === 'shoot') {
        //push shoot into the big screen
        userResult = 2;
    }
    
    console.log(userResult);
    let cpuAmmo = parseInt(document.getElementById('cpu_ammo').innerText);

    if (cpuAmmo != 0) {
        cpuResult = Math.floor(Math.random() * 3)
    } else {
        cpuResult = Math.floor(Math.random() * 2)
    }

    console.log(cpuResult)

    if (cpuResult === 0) {
        // push the cover answer
    } else if (cpuResult === 1) {
        document.getElementById('cpu_ammo').innerText = ++cpuAmmo;
        //push the reload answer
    } else if (cpuResult === 2) {
        //push the shoot answer
        document.getElementById('cpu_ammo').innerText = --cpuAmmo
    }

    checkAnswer(userResult, cpuResult);
}

function checkAnswer(userResult, cpuResult) {
    if (userResult === 0 || cpuResult === 0) {
        console.log('gameContinues');
    } else if (userResult === 1 && cpuResult === 1) {
        console.log('gameContinues');
    } else if (userResult === 1 && cpuResult === 2) {
        console.log('gameOver');
    } else if (userResult === 2 && cpuResult === 1) {
        console.log('youWin');
    } else if (userResult === 2 && cpuResult === 2) {
        console.log('gameContinues');
    }
}

function restartGame() {
    location.reload();
}
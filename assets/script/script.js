document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName('button');

    for (let button of buttons) {
        button.addEventListener('click', function() {
            if (this.getAttribute('data-type') === 'reload') {
                // reloadAmmo(); function 
            } else if (this.getAttribute('data-type') === 'cover') {
                // selectionMade('cover');
            } else if ((this.getAttribute('data-type') === 'shoot')) {
                // ammoCheck(); function
            } else {
                //restartGame();
            }
        })
    }

    // restartGame();
})

// function cpuSelection();

function reloadAmmo() {
    let userAmmo = parseInt(document.getElementById('user_ammo').innerText);
    document.getElementById('score').innerText = ++userAmmo;

    selectionMade('reload');
}

function ammoCheck() {
    let userAmmo = parseInt(document.getElementById('user_ammo').innerText); 
    
    if (userAmmo != 0) {
        selectionMade();
    } else {
        alert(`You don't have any ammo! Reload to be able to shoot.`)
    }

    selectionMade('shoot');
}

function selectionMade() {
    let cpuAmmo = parseInt(document.getElementById('cpu_ammo').innerText);
    let cpuOptions = ['cover', 'reload', 'shoot'];

    let cpuResult;

    if (cpuAmmo != 0) {
        cpuResult = Math.floor(Math.random() * 2)
    } else {
        cpuResult = Math.floor(Math.random() * 1)
    }

    if (cpuResult === 0) {
        selectionMade(); 
    } else if (cpuResult === 1) {
        document.getElementById('cpu_ammo').innerText = ++cpuAmmo;
    } else {
        checkResult(); 
    }
}
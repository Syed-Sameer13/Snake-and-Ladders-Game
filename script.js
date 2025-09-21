let p1Span = document.getElementById("p1pos");
let p2Span = document.getElementById("p2pos");
let rollBut = document.getElementById("roll");
let moveBut = document.getElementById("move");
let quitBut = document.getElementById("quit");
let resetBut = document.getElementById("reset");
let setBut = document.getElementById("setBut");
let p1 = document.getElementById("p1");
let p2 = document.getElementById("p2");
let slE = document.getElementById("sl");
let pos = document.getElementById("pos");
let movt = document.getElementById("mov");
let cpl = document.getElementById('cpl');
let p1NameText = document.getElementById('player1Name');
let p2NameText = document.getElementById('player2Name');
let cont1 = document.getElementById("sectionpage1");
let cont2 = document.getElementById("sectionpage2");

let snakes = {
    6: 3,
    42: 19,
    45: 36,
    51: 13,
    67: 54,
    83: 62,
    90: 87,
    96: 64
};
let ladders = {
    5: 9,
    15: 25,
    18: 80,
    44: 86,
    47: 68,
    63: 78,
    71: 94,
    81: 98
};

let pos1 = 0;
let pos2 = 0;
let currentPlayer = 1;
let currentDiceValue = 0;
let players = {
    1: "Player1",
    2: "Player2"
};

function updateTurn() {
    cpl.textContent = `${players[currentPlayer]} Your Turn`;
    cpl.style.fontSize = "25px";
}

function setPlayers() {
    const p1Name = p1.value;
    const p2Name = p2.value;
    if (p1Name) players[1] = p1Name;
    if (p2Name) players[2] = p2Name;
    p1NameText.textContent = players[1];
    p2NameText.textContent = players[2];
    cpl.textContent = `${players[currentPlayer]} Your Turn`;
    p1.disabled = true;
    p2.disabled = true;
    setBut.disabled = true;
    cont1.classList.add("d-none");
    cont2.classList.remove("d-none");
}

function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    rollBut.disabled = false;
    moveBut.disabled = true;
    rollBut.style.borderColor = "#681fde";
    rollBut.style.borderWidth = "3px";
    moveBut.style.borderWidth = "2px";
    updateTurn();
}

function startGame() {
    pos1 = 0;
    pos2 = 0;
    currentPlayer = 1;
    currentDiceValue = 0;
    pos.textContent = currentDiceValue;
    p1Span.textContent = pos1;
    p2Span.textContent = pos2;
    movt.classList.remove("result");
    movt.textContent = '';
    players = {
        1: "Player1",
        2: "Player2"
    };
    p1.value = '';
    p2.value = '';
    p1NameText.textContent = players[1];
    p2NameText.textContent = players[2];
    cont1.classList.remove("d-none");
    cont2.classList.add("d-none");
    rollBut.disabled = false;
    moveBut.disabled = true;
    rollBut.style.borderColor = "#681fde";
    rollBut.style.borderWidth = "3px";
    moveBut.style.borderWidth = "2px";
    p1.disabled = false;
    p2.disabled = false;
    setBut.disabled = false;
    cpl.style.fontSize = "25px";
}
startGame();

function onRoll() {
    currentDiceValue = Math.floor(Math.random() * 6) + 1;
    pos.textContent = currentDiceValue;
    let currentPosition = currentPlayer === 1 ? pos1 : pos2;
    if (currentPosition === 0 && currentDiceValue !== 1) {
        movt.textContent = `${players[currentPlayer]} You need to Roll 1 to Start the Game!`;
        switchPlayer();
        return;
    }
    movt.textContent = `${players[currentPlayer]} Move the Position`;
    slE.textContent = "";
    rollBut.disabled = true;
    moveBut.disabled = false;
    moveBut.style.borderColor = "#681fde";
    rollBut.style.borderWidth = "2px";
    moveBut.style.borderWidth = "3px";
}

function onMove() {
    let currentPosition = (currentPlayer === 1) ? pos1 : pos2;
    let newposition = currentPosition + currentDiceValue;
    if (newposition > 100) {
        movt.textContent = `${players[currentPlayer]} Overshot stay in the Current Position!`;
        switchPlayer();
        return;
    }
    if (newposition === 100) {
        movt.textContent = `${players[currentPlayer]} is the Winner!!!`;
        movt.classList.add("result");
        rollBut.disabled = true;
        moveBut.disabled = true;
        cpl.textContent = "Reset to Start a New Game!";
        cpl.style.fontSize = "20px";
        return;
    }
    if (Object.hasOwnProperty.call(snakes, newposition)) {
        newposition = snakes[newposition];
        slE.textContent = "Oh no, a snake! 🐍";
    } else if (Object.hasOwnProperty.call(ladders, newposition)) {
        newposition = ladders[newposition];
        slE.textContent = "Wow, a ladder! 🪜";
    }
    if (currentPlayer === 1) {
        pos1 = newposition;
        p1Span.textContent = pos1;
    } else {
        pos2 = newposition;
        p2Span.textContent = pos2;
    }
    movt.textContent = '';
    switchPlayer();
}

function onQuit() {
    const winner = currentPlayer === 1 ? 2 : 1;
    movt.textContent = `${players[winner]} is the Winner!!!`;
    movt.classList.add("result");
    rollBut.disabled = true;
    moveBut.disabled = true;
    cpl.textContent = "Reset to Start a New Game!";
    cpl.style.fontSize = "15px";
    return;
}

moveBut.onclick = function() {
    onMove();
};
rollBut.onclick = function() {
    onRoll();
};
resetBut.onclick = function() {
    startGame();
}
setBut.onclick = function() {
    setPlayers();
}
quitBut.onclick = function() {
    onQuit();
}
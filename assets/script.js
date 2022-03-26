// MEMORIZE COLORS GAME GENIUS/SIMON STYLE
// DEV JOICE GOMES
// 2022

// Get colors' divs
const green = document.querySelector('.green');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const blue = document.querySelector('.blue');

// Variables
let colorOrder = [];
let clickedColorOrder = [];
let level = 1;

//Confirmation to start game 
setTimeout(startGame, 3000);

function startGame() {
    let welcome = 'Bem vindo ao Memorize Colors!\nObserve as cores e clique na sequência de cores que iluminarem!';
    if (confirm(welcome) == true) {
        playGame()
    } else {
        alert('Até mais!');
    }

}

// Initiate game
function playGame() {
    level = 1;
    randomColorOrder();
}

// Generate random color order
function randomColorOrder() {
    let colorNumber = Math.floor(Math.random() * 4)
    colorOrder[colorOrder.length] = colorNumber;
    clickedColorOrder = [];

    for (let i in colorOrder) {
        let elementColor = createColorElement(colorOrder[i]);
        lightenColor(elementColor, Number(i) + 1);
    }
}

function createColorElement(color) {
    if (color == 0) {
        return green;
    } else if (color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

// Lighten color
function lightenColor(element, time) {
    time = time * 500;

    setTimeout(() => {
        element.classList.add('selected');
    }, time - 250);

    setTimeout(() => {
        element.classList.remove('selected');
    }, time);
}

// Get User's click
function getClick(color) {
    clickedColorOrder[clickedColorOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkColorOrder();
    }, 250)
}

green.onclick = () => getClick(0);
red.onclick = () => getClick(1);
yellow.onclick = () => getClick(2);
blue.onclick = () => getClick(3);

// Check if clicked colors order is right 
function checkColorOrder() {
    for (let i in clickedColorOrder) {
        if (clickedColorOrder[i] != colorOrder[i]) {
            gameOver();
            break;
        }
    }
    if (colorOrder.length >= 1){
        if (clickedColorOrder.length == colorOrder.length) {
            alert(`Nível: ${level} \nParabéns! Você passou para o próximo nível!`);
            nextLevel();
        }
    }
}

// Next Level
function nextLevel() {
    level++;
    randomColorOrder();
}

// Game Over
function gameOver() {
    alert(`Game Over\nVocê errou a ordem! \nNível: ${level}`)
    if (confirm('Gostaria de jogar denovo?') == true) {
        colorOrder = [];
        clickedColorOrder = [];
        playGame()
    } else {
        alert('Até mais!');
        colorOrder = [];
        clickedColorOrder = [];
        setTimeout(startGame, 2000);
    }
}

// Change colors mode - accessibility
function changeMode() {
    const game = document.querySelector('.game');
    game.classList.toggle('accessibility');
}

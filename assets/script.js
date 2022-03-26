// MEMORIZE COLOR GAME GENIUS/SIMON STYLE
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
let level = 0;

// Initiate game
playGame();

function playGame(){
    alert('Bem vindo ao Memorize Colors!');
    level = 0;
    randomColorOrder();
}

// Get User's click
function getClick(color){
    clickedColorOrder[clickedColorOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkColorOrder();
    },250)
}

green.onclick = () => getClick(0);
red.onclick = () => getClick(1);
yellow.onclick = () => getClick(2);
blue.onclick = () => getClick(3);

// Generate random color order
function randomColorOrder(){
    let colorNumber = Math.floor(Math.random()*4)
    colorOrder[colorOrder.length] = colorNumber;
    clickedColorOrder = [];

    for(let i in colorOrder){
        let elementColor = createColorElement(colorOrder[i]);
        lightenColor(elementColor, Number(i)+1);
    }
}

function createColorElement(color){
    if(color == 0){
        return green;
    }else if(color == 1){
        return red;
    }else if(color == 2){
        return yellow;
    }else if(color == 3){
        return blue;
    }
}

// Next Level
function nextLevel(){
    level++;
    randomColorOrder();
}

// Lighten color
function lightenColor(element, time){
    time = time * 500;

    setTimeout(() => {
        element.classList.add('selected');
    }, time - 250);

    setTimeout(() => {
        element.classList.remove('selected');
    }, time);
}

// Check if color order is right 
function checkColorOrder(){
    for(let i in clickedColorOrder){
        if(clickedColorOrder[i] != colorOrder[i]){
            gameOver();
            break;
        }
    }

    if(clickedColorOrder.length == colorOrder.length){
        alert(`Nível: ${level} \nParabéns! Você passou para o próximo nível!`);
        nextLevel();
    }
}

// Game Over
function gameOver(){
    alert(`Game Over\nVocê errou a ordem! \nNível: ${level}\nClique em Ok para iniciar um novo jogo`)
    colorOrder = [];
    clickedColorOrder = [];
    playGame();
}
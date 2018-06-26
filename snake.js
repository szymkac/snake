var canvas = null;
var ctx = null;

var gridSize = 20;
var tileCount = 20;
var xDir = 0;
var yDir = 0;
var xPlayerPos = 10;
var yPlayerPos = 10;
var xApplePos = getRandomInt(0, tileCount);
var yApplePos = getRandomInt(0, tileCount);
var snakeBody = [];
var snakeLength = 5;

window.onload = function () {
    canvas = document.getElementById('game-canvas');
    ctx = canvas.getContext('2d');
    document.addEventListener('keydown', keyPush)
    this.setInterval(game, 1000 / 15);
}

function setDefaultSnake() {
    xDir = 0;
    yDir = 0;
    xPlayerPos = 10;
    yPlayerPos = 10;
    xApplePos = getRandomInt(0, tileCount);
    yApplePos = getRandomInt(0, tileCount);
    snakeBody = [];
    snakeLength = 5;
}

function game() {
    xPlayerPos += xDir;
    yPlayerPos += yDir;
    if (xPlayerPos < 0)
        xPlayerPos = tileCount - 1;
    if (xPlayerPos > tileCount - 1)
        xPlayerPos = 0;
    if (yPlayerPos < 0)
        yPlayerPos = tileCount - 1;
    if (yPlayerPos > tileCount - 1)
        yPlayerPos = 0;

    //background
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //snake
    ctx.fillStyle = "#024715";
    for (var i = 0; i < snakeBody.length; i++) {
        ctx.fillRect(snakeBody[i].x * gridSize, snakeBody[i].y * gridSize, gridSize - 2, gridSize - 2);
        if ((xDir !== 0 || yDir !== 0) && snakeBody[i].x === xPlayerPos && snakeBody[i].y === yPlayerPos) {
            setDefaultSnake();
        }
    }
    snakeBody.push({ x: xPlayerPos, y: yPlayerPos });
    while (snakeBody.length > snakeLength) {
        snakeBody.shift();
    }
    if (xPlayerPos === xApplePos && yPlayerPos === yApplePos) {
        xApplePos = getRandomInt(0, tileCount);
        yApplePos = getRandomInt(0, tileCount);
        snakeLength++;
    }

    //apple
    ctx.fillStyle = "#ad0022"
    ctx.fillRect(xApplePos * gridSize, yApplePos * gridSize, gridSize - 2, gridSize - 2);
}
function keyPush(evt) {
    switch (evt.keyCode) {
        case 37:
        case 65:
            if (xDir === 0) {
                xDir = -1;
                yDir = 0;
            }
            break;
        case 38:
        case 87:
            if (yDir === 0) {
                xDir = 0;
                yDir = -1;
            }
            break;
        case 39:
        case 68:
            if (xDir === 0) {
                xDir = 1;
                yDir = 0;
            }
            break;
        case 40:
        case 83:
            if (yDir === 0) {
                xDir = 0;
                yDir = 1;
            }
            break;
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

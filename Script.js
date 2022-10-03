var headSnake = new Image();
headSnake.src = "images/SnakeHead.png";

var bodySnake = new Image();
bodySnake.src = "images/SnakeBody.jpg";

var tailSnake = new Image();
tailSnake.src = "images/SnakeBody.jpg";

var apple = new Image();
apple.src = "images/Apple.png";

var goldenApple = new Image();
goldenApple.src = "images/GoldenApple.jpg";

var blockSize = 25;
var rows = 20;
var cols = 20;

var board;
var context;

var score = 0;

var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var appleX = blockSize * 10;
var appleY = blockSize * 10;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

var gameOver = false;
var isGoldenApple = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); // 2d context

    // place the Apple
    placeApple();
    document.addEventListener("keyup", changeDirection);

    setInterval(update, 1000/10);
}

function update() {
    // update the game state
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    // draw the apple
    if (isGoldenApple) {
        context.drawImage(goldenApple, appleX, appleY, blockSize, blockSize);
    } else {
        context.drawImage(apple, appleX, appleY, blockSize, blockSize);
    }

    if (snakeX == appleX && snakeY == appleY) {
        snakeBody.push([appleX, appleY]);

        // update score
        updateScore();

        // snake ate the apple
        placeApple();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // draw the snake
    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.drawImage(headSnake, snakeX, snakeY, blockSize, blockSize);

    // draw the snake body
    for (let i = 0; i < snakeBody.length; i++) {
        context.drawImage(bodySnake, snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // draw the snake tail
    if (snakeBody.length) {
        context.drawImage(tailSnake, snakeBody[snakeBody.length - 1][0], snakeBody[snakeBody.length - 1][1], blockSize, blockSize);
    }

    // check if the snake is out of bounds
    if (snakeX < 0 || snakeX >= cols * blockSize || snakeY < 0 || snakeY >= rows * blockSize) {
        //sendGameOver();
    }

    if (snakeX >= cols * blockSize) {
        snakeX = 0;
    } else if (snakeX < 0) {
        snakeX = cols * blockSize;
    }

    if (snakeY >= rows * blockSize) {
        snakeY = 0;
    } else if (snakeY < 0) {
        snakeY = rows * blockSize;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            sendGameOver();
        }
    }
}

function changeDirection(event) {
    // change the direction of the snake
    if (event.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (event.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (event.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (event.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }

    if (gameOver) {
        gameOver = false;
        score = 0;
        document.getElementById("score").innerHTML = score;
        document.getElementById("gameOver").innerHTML = "";
    }
}

function placeApple() {
    // place the apple at a random location
    appleX = Math.floor(Math.random() * cols) * blockSize;
    appleY = Math.floor(Math.random() * rows) * blockSize;

    if (!isGoldenApple && Math.floor(Math.random() * 10) == 0) {
        isGoldenApple = true;
    }
}

function updateScore() {
    // update the score
    if (isGoldenApple) {
        score += Math.floor(Math.random() * 50);
        isGoldenApple = false;
    } else {
        score += Math.floor(Math.random() * 10);
    }
    document.getElementById("score").innerHTML = score;
}

function sendGameOver() {
    // game over
    gameOver = true;
    document.getElementById("gameOver").innerHTML = "Game Over!";
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    snakeBody = [];
    velocityX = 0;
    velocityY = 0;
}
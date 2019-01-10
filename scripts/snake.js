// Setting Canvas Constants
let canvasBorder = 'black';
let canvasBackground = "white";

// Retrieving Canvas
var gameCanvas = document.getElementById("gameCanvas");

// Drawing context
var ctx = gameCanvas.getContext("2d");

// Drawing Canvas
function clearCanvas() {
    ctx.fillStyle = canvasBackground;
    ctx.strokestyle = canvasBorder;

    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

 // Setting up snake
 let Snake = [
    {x: 150, y: 150},
    {x: 140, y: 150},
    {x: 130, y: 150},
    {x: 120, y: 150},
    {x: 110, y: 150},
  ];

function drawSnakePart(snakePart) {
    ctx.fillStyle = 'lightgreen';
    ctx.strokestyle = 'darkgreen';
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function drawSnake() {
    Snake.forEach(drawSnakePart);
}

// Score initialization
let score = 0;

// Snake movement
let vx = 10;
let vy = 0; // Note that negative numbers will shift the snake up

function moveSnakePart() {
    const head = {x: Snake[0].x + vx, y: Snake[0].y + vy};
    Snake.unshift(head);

    const ateFood = foodX === Snake[0].x && foodY == Snake[0].y;
    if (ateFood) {
        Snake.unshift(head);
        Snake.unshift(head);
        generateFood();
        score += 10;
        document.getElementById("score").innerHTML = "Score: " + score;
    } else {
        Snake.pop();
    }
}

function moveSnake() {
    document.getElementById("startButton").disabled = true;

    if (gameEnd()) {
        document.getElementById("restartButton").disabled = false;
        return;
    } else {
        setTimeout(function() {
            changingDirection = false;
            clearCanvas();
            drawFood();
            moveSnakePart();
            drawSnake();

            moveSnake();
        }, 100);
    }
}

// Changing directions
document.addEventListener("keydown", changeDirection);
function changeDirection(event) {
    // Setting keycodes
    const left = 37;
    const right = 39;
    const up = 38;
    const down = 40;

    if (changingDirection) {
        return;
    }

    changingDirection = true;

    // Setting movement changes
    const keyPressed = event.keyCode;
    const movingUp = vy === -10;
    const movingDown = vy === 10;
    const movingRight = vx === 10;
    const movingLeft = vx === -10;

    // Conditions to check for movement
    if (keyPressed === left && !movingRight) {
        vx = -10;
        vy = 0;
    } else if (keyPressed === right && !movingLeft) {
        vx = 10;
        vy = 0;
    } else if (keyPressed === up && !movingDown) {
        vx = 0;
        vy = -10;
    } else if (keyPressed === down && !movingUp) {
        vx = 0;
        vy = 10;
    } 
}

// Food generation
function generateFood() {
    foodX = Math.floor(Math.random() * ((gameCanvas.width - 10) / 10)) * 10;
    foodY = Math.floor(Math.random() * ((gameCanvas.height - 10) / 10)) * 10;

    Snake.forEach(function(snakePart) {
        const foodOnSnake = snakePart.x === foodX && snakePart.y === foodY;

        if (foodOnSnake) {
            generateFood();
        }
    })
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.strokestyle = 'darkred';
    ctx.fillRect(foodX, foodY, 10, 10);
    ctx.strokeRect(foodX, foodY, 10, 10);
}


// End game mechanism
function gameEnd() {
    for (let i = 4; i < Snake.length; i++) {
        const collided = Snake[i].x === Snake[0].x && Snake[i].y === Snake[0].y;

        if (collided) {
            return true;
        }
    }

    const hitLeftWall = Snake[0].x < 0;
    const hitRightWall = Snake[0].x > gameCanvas.width - 10;
    const hitTopWall = Snake[0].y < 0;
    const hitBottomWall = Snake[0].y > gameCanvas.height - 10;

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

// Starting and Restarting game
function startGame() {
    document.addEventListener("keydown", changeDirection);
    moveSnake();
}


function restartGame() {
    Snake = [
        {x: 150, y: 150},
        {x: 140, y: 150},
        {x: 130, y: 150},
        {x: 120, y: 150},
        {x: 110, y: 150},
    ];
    vx = 10;
    vy = 0;
    score = 0;
    document.getElementById("score").innerHTML = "Score: " + score;

    clearCanvas();
    drawSnake();
    generateFood();
    drawFood();

    document.getElementById("startButton").disabled = false;
    document.getElementById("restartButton").disabled = true;
    document.removeEventListener("keydown", changeDirection);
}

clearCanvas();
drawSnake();
generateFood();
drawFood();
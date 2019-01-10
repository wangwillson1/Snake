// Setting Canvas Constants
let canvasBorder = 'black';
let canvasBackground = "white";

// Retrieving Canvas
var gameCanvas = document.getElementById("gameCanvas");

// Drawing context
var gameContext = gameCanvas.getContext("2d");

// Drawing Canvas
function clearCanvas() {
    gameContext.fillStyle = canvasBackground;
    gameContext.strokestyle = canvasBorder;

    gameContext.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    gameContext.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
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
    gameContext.fillStyle = 'lightgreen';
    gameContext.strokestyle = 'darkgreen';
    gameContext.fillRect(snakePart.x, snakePart.y, 10, 10);
    gameContext.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function drawSnake() {
    Snake.forEach(drawSnakePart);
}

// Snake movement
let vx = 0;
let vy = 10; // Note that negative numbers will shift the snake up

function moveSnake() {
    const head = {x: Snake[0].x + vx, y: Snake[0].y + vy};
    Snake.unshift(head);
    Snake.pop();
}


clearCanvas();
moveSnake();
drawSnake();
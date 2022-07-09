

const gameContainer = document.querySelector("#gameContainer");
const gameBoard = document.querySelector("#gameBoard");
const scoreText = document.querySelector("#scoreText");
const resetbtn = document.querySelector("#mybtn");
const ctx = gameBoard.getContext("2d");
const gamewidth = gameBoard.width;
const gameheight = gameBoard.height;
const unitSize = 20;
const snakecolor = "blue";
const snakeborder = "black";
const foodcolor = "red";
const background = "black";
let foodX;
let foodY;
let xVelocity = unitSize;
let yVelocity = 0;
let snake = [{
    x:0, y:0
}]
let running = false;
let score=0;

window.addEventListener("keydown", changedirection);
resetbtn.addEventListener("click", resetGame);

startGame();


function startGame(){
    running = true;
        scoreText.textContent = score;
     
        createFood();
        drawFood();
        nextTick();

   
    
       
};

function nextTick(){
    if(running){
    setTimeout(()=>{
        clearboard();
        drawFood();
        moveSnake();
        drawSnake();

        nextTick();


    }, 75);
}
else{
    displayGameOver();
}
};

function clearboard(){
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, gamewidth, gameheight);
};

function createFood(){
    let randnum;
    function randNum(min, max){
        randnum = Math.floor(Math.random()*(max-min)/unitSize)* unitSize;
        return randnum;
    };
    foodX = randNum(0, gamewidth-unitSize);
    foodY = randNum(0, gamewidth-unitSize);
     console.log(foodX);
};

function drawFood(){
    ctx.fillStyle= foodcolor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
};

function drawSnake(){

    ctx.fillStyle = snakecolor;
    ctx.strokeStyle = snakeborder;
    snake.forEach(snakepart =>{
        ctx.fillRect(snakepart.x, snakepart.y, unitSize , unitSize);
        ctx.strokeRect(snakepart.x, snakepart.y, unitSize , unitSize);
    })
};



function moveSnake(){
    const head = {
        x: snake[0].x + xVelocity,
        y: snake[0].y + yVelocity
    }
    snake.unshift(head);
    if(snake[0].x == foodX && snake[0].y == foodY){
        score += 1;
        scoreText.textContent = score;
        createFood();
    }
    else{
        snake.pop();
    }
};




function displayGameOver(){};

function changedirection(event){
    const keypressed = event.keyCode ; 

    const LEFT = 37; 
    const RIGHT = 39;
    const UP = 38;
    const DOWN = 40;

    const goingleft = (xVelocity ==  -unitSize);
    const goingright = (xVelocity ==  unitSize);
    const goingup = (yVelocity ==  -unitSize);
    const goingdown = (yVelocity ==  unitSize);

    switch(true){
        case(keypressed == LEFT && !goingright):
        xVelocity = -unitSize;
        yVelocity = 0;
        break;
        case(keypressed == RIGHT && !goingleft):
        xVelocity = unitSize;
        yVelocity = 0;
        break;
        case(keypressed == UP && !goingdown):
        xVelocity = 0;
        yVelocity = -unitSize;
        break;
        case(keypressed == DOWN && !goingup):
        xVelocity = 0;
        yVelocity = unitSize;
        break;
    }
};

function resetGame(){};

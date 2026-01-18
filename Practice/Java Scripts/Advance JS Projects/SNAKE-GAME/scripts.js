const board = document.querySelector(".board");
const startButton = document.querySelector(".btn-start");
const modal = document.querySelector(".modal");
const startGameModal = document.querySelector(".start-game");
const gameOverModal = document.querySelector(".game-over");
const restartButton = document.querySelector(".btn-restart");
const highScoreElement = document.querySelector("#high-score");
const scoreElement = document.querySelector("#score");
const timeElement = document.querySelector("#time");

const blockSize = 50;
const cols = Math.floor(board.clientWidth / blockSize);
const rows = Math.floor(board.clientHeight / blockSize);

let intervalId = null;
let timerInterval = null;
let direction = "down";
let score = 0;
let time = 0;
let highScore = localStorage.getItem("highScore") || 0;

highScoreElement.innerText = highScore;

const blocks = {};
let snake = [{ x: 1, y: 3 }];
let food = getRandomFood();

/* ------------------ CREATE BOARD ------------------ */
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement("div");
        block.classList.add("block");
        board.appendChild(block);
        blocks[`${row}-${col}`] = block;
    }
}

/* ------------------ TIMER ------------------ */
function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        time++;
        timeElement.innerText = formatTime(time);
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    stopTimer();
    time = 0;
    timeElement.innerText = "00:00";
}

function formatTime(seconds) {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
}

/* ------------------ FOOD ------------------ */
function getRandomFood() {
    let pos;
    do {
        pos = {
            x: Math.floor(Math.random() * rows),
            y: Math.floor(Math.random() * cols)
        };
    } while (snake.some(s => s.x === pos.x && s.y === pos.y));
    return pos;
}

/* ------------------ RENDER ------------------ */
function render() {
    let head = { ...snake[0] };

    if (direction === "up") head.x--;
    if (direction === "down") head.x++;
    if (direction === "left") head.y--;
    if (direction === "right") head.y++;

    // Collision (wall & self)
    if (
        head.x < 0 || head.x >= rows ||
        head.y < 0 || head.y >= cols ||
        snake.some(s => s.x === head.x && s.y === head.y)
    ) {
        gameOver();
        return;
    }

    snake.unshift(head);

    // Eat food
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.innerText = score;
        food = getRandomFood();
    } else {
        snake.pop();
    }

    draw();
}

/* ------------------ DRAW ------------------ */
function draw() {
    Object.values(blocks).forEach(b =>
        b.classList.remove("fill", "food")
    );

    snake.forEach(s =>
        blocks[`${s.x}-${s.y}`].classList.add("fill")
    );

    blocks[`${food.x}-${food.y}`].classList.add("food");
}

/* ------------------ GAME OVER ------------------ */
function gameOver() {
    clearInterval(intervalId);
    stopTimer();

    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        highScoreElement.innerText = highScore;
    }

    modal.style.display = "flex";
    startGameModal.style.display = "none";
    gameOverModal.style.display = "flex";
}

/* ------------------ GAME CONTROLS ------------------ */
startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);

function startGame() {
    modal.style.display = "none";
    resetTimer();
    startTimer();
    intervalId = setInterval(render, 300);
}

function restartGame() {
    clearInterval(intervalId);
    resetTimer();

    snake.forEach(s =>
        blocks[`${s.x}-${s.y}`].classList.remove("fill")
    );

    score = 0;
    scoreElement.innerText = score;
    snake = [{ x: 1, y: 3 }];
    direction = "down";
    food = getRandomFood();
    modal.style.display = "none";

    startTimer();
    intervalId = setInterval(render, 300);
}

/* ------------------ KEYBOARD ------------------ */
addEventListener("keydown", e => {
    if (e.key === "ArrowUp" && direction !== "down") direction = "up";
    if (e.key === "ArrowDown" && direction !== "up") direction = "down";
    if (e.key === "ArrowLeft" && direction !== "right") direction = "left";
    if (e.key === "ArrowRight" && direction !== "left") direction = "right";
});

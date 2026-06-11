const gameArea = document.getElementById("gameArea");
const scoreText = document.getElementById("score");
const timeText = document.getElementById("time");
const healthText = document.getElementById("health");
const startBtn = document.getElementById("startBtn");
const message = document.getElementById("message");

let score = 0;
let time = 60;
let health = 100;
let gameRunning = false;

let spawnInterval;
let timerInterval;
let items = [];
let trator;

const keys = {};

document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

startBtn.addEventListener("click", startGame);

function startGame() {
    if (gameRunning) return;

    gameRunning = true;
    score = 0;
    time = 60;
    health = 100;
    items = [];

    scoreText.textContent = score;
    timeText.textContent = time;
    healthText.textContent = health;
    message.textContent = "";

    gameArea.innerHTML = "";

    // Criar trator
    trator = document.createElement("div");
    trator.classList.add("trator");
    trator.style.left = "275px";
    trator.style.top = "175px";
    trator.textContent = "🚜";
    gameArea.appendChild(trator);

    spawnInterval = setInterval(spawnItem, 1000);
    timerInterval = setInterval(updateTime, 1000);

    requestAnimationFrame(updateGame);
}

function spawnItem() {
    const item = document.createElement("div");
    item.classList.add("item");

    // Problemas da lavoura: pragas 🐛, ervas daninhas 🌿, seca 💧
    const rand = Math.random();
    if (rand < 0.4) {
        item.type = "praga";
        item.textContent = "🐛";
    } else if (rand < 0.7) {
        item.type = "erva";
        item.textContent = "🌿";
    } else {
        item.type = "agua";
        item.textContent = "💧";
    }

    const x = Math.random() * (gameArea.clientWidth - 40);
    const y = Math.random() * (gameArea.clientHeight - 40);

    item.style.left = x + "px";
    item.style.top = y + "px";

    gameArea.appendChild(item);
    items.push(item);
}

function updateTime() {
    time--;
    timeText.textContent = time;
    if (time <= 0 || health <= 0) {
        endGame();
    }
}

function updateGame() {
    if (!gameRunning) return;

    moveTrator();
    checkCollisions();
    requestAnimationFrame(updateGame);
}

function moveTrator() {
    const step = 5;
    let x = parseInt(trator.style.left);
    let y = parseInt(trator.style.top);

    if (keys["ArrowLeft"] && x > 0) x -= step;
    if (keys["ArrowRight"] && x < gameArea.clientWidth - 50) x += step;
    if (keys["ArrowUp"] && y > 0) y -= step;
    if (keys["ArrowDown"] && y < gameArea.clientHeight - 50) y += step;

    trator.style.left = x + "px";
    trator.style.top = y + "px";
}

function checkCollisions() {
    const tratorRect = trator.getBoundingClientRect();

    items.forEach((item, index) => {
        const itemRect = item.getBoundingClientRect();

        if (!(tratorRect.right < itemRect.left ||
              tratorRect.left > itemRect.right ||
              tratorRect.bottom < itemRect.top ||
              tratorRect.top > itemRect.bottom)) {

            if (item.type === "praga") {
                score += 10;
            } else if (item.type === "erva") {
                score += 5;
            } else if (item.type === "agua") {
                health = Math.min(health + 15, 100);
            }

            scoreText.textContent = score;
            healthText.textContent = health;

            item.remove();
            items.splice(index, 1);
        }
    });

    // Perda de saúde por tempo
    if (Math.random() < 0.01) {
        health -= 1;
        healthText.textContent = health;
    }
}

function endGame() {
    gameRunning = false;
    clearInterval(spawnInterval);
    clearInterval(timerInterval);
    message.innerHTML =
        `🌾 Fim do Jogo!<br>
        Pontuação: ${score}<br>
        Saúde da lavoura: ${health}%`;
}
const gameArea = document.getElementById("gameArea");
const scoreText = document.getElementById("score");
const timeText = document.getElementById("time");
const startBtn = document.getElementById("startBtn");
const message = document.getElementById("message");

let score = 0;
let time = 60;
let gameRunning = false;

let spawnInterval;
let timerInterval;

startBtn.addEventListener("click", startGame);

function startGame(){

    if(gameRunning) return;

    gameRunning = true;
    score = 0;
    time = 60;

    scoreText.textContent = score;
    timeText.textContent = time;
    message.textContent = "";

    gameArea.innerHTML = "";

    spawnInterval = setInterval(spawnItem, 800);

    timerInterval = setInterval(() => {

        time--;
        timeText.textContent = time;

        if(time <= 0){
            endGame();
        }

    },1000);
}

function spawnItem(){

    const item = document.createElement("div");
    item.classList.add("item");

    const isPest = Math.random() < 0.7;

    item.textContent = isPest ? "🐛" : "💧";

    const x = Math.random() * (gameArea.clientWidth - 60);
    const y = Math.random() * (gameArea.clientHeight - 60);

    item.style.left = x + "px";
    item.style.top = y + "px";

    item.addEventListener("click", () => {

        if(!gameRunning) return;

        if(isPest){
            score += 10;
        }else{
            score += 5;
        }

        scoreText.textContent = score;
        item.remove();
    });

    gameArea.appendChild(item);

    setTimeout(() => {
        if(item.parentNode){
            item.remove();
        }
    }, 2000);
}

function endGame(){

    gameRunning = false;

    clearInterval(spawnInterval);
    clearInterval(timerInterval);

    message.innerHTML =
        `🌾 Colheita concluída!<br>
        Você fez ${score} pontos!`;

}
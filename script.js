const tractor = document.getElementById("tractor");
const game = document.getElementById("game");
const scoreText = document.getElementById("score");

let score = 0;
let tractorX = 220;

document.addEventListener("keydown", (e) => {

    if(e.key === "ArrowLeft"){
        tractorX -= 25;
    }

    if(e.key === "ArrowRight"){
        tractorX += 25;
    }

    if(tractorX < 0) tractorX = 0;
    if(tractorX > 450) tractorX = 450;

    tractor.style.left = tractorX + "px";
});

function createItem(){

    const item = document.createElement("div");
    item.classList.add("item");

    const good = Math.random() > 0.3;

    item.innerHTML = good ? "🌽" : "🪨";

    item.style.left = Math.random()*450 + "px";
    item.style.top = "0px";

    game.appendChild(item);

    let pos = 0;

    const fall = setInterval(() => {

        pos += 5;
        item.style.top = pos + "px";

        const itemX = item.offsetLeft;
        const itemY = pos;

        const tractorY = 520;

        if(
            itemY > tractorY &&
            itemX > tractorX - 30 &&
            itemX < tractorX + 50
        ){

            if(good){
                score++;
                scoreText.textContent = score;
            }else{
                alert("Fim de jogo! Pontuação: " + score);
                location.reload();
            }

            item.remove();
            clearInterval(fall);
        }

        if(pos > 600){
            item.remove();
            clearInterval(fall);
        }

    }, 30);
}

setInterval(createItem, 1000);
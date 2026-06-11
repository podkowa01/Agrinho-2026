let money = 100;
let food = 50;
let nature = 100;

function update(){
document.getElementById("money").innerText = money;
document.getElementById("food").innerText = food;
document.getElementById("nature").innerText = nature;

if(nature <= 0){
document.getElementById("message").innerText =
"❌ Sua fazenda destruiu o meio ambiente!";
}

if(food >= 200){
document.getElementById("message").innerText =
"🏆 Parabéns! Você venceu com uma fazenda sustentável!";
}
}

function organic(){
food += 20;
money += 10;
nature += 5;

update();
}

function fertilizer(){
food += 40;
money += 20;
nature -= 25;

update();
}

function trees(){
nature += 20;
money -= 10;

update();
}

function harvest(){
food += 30;
money += 30;
nature -= 10;

update();
}
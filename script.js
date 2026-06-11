let money = 100;
let food = 50;
let nature = 100;

function updateScreen() {
  document.getElementById("money").textContent = money;
  document.getElementById("food").textContent = food;
  document.getElementById("nature").textContent = nature;

  const message = document.getElementById("message");

  if(nature <= 0){
    message.textContent = "❌ Sua fazenda destruiu o meio ambiente!";
    disableButtons();
  } else if(food >= 200){
    message.textContent = "🏆 Parabéns! Você venceu com uma fazenda sustentável!";
    disableButtons();
  } else {
    message.textContent = "";
  }
}

function disableButtons(){
  const buttons = document.querySelectorAll("button");
  buttons.forEach(btn => {
    btn.disabled = true;
    btn.style.opacity = "0.5";
  });
}

function organic(){
  money += 10;
  food += 20;
  nature += 5;
  updateScreen();
}

function fertilizer(){
  money += 20;
  food += 40;
  nature -= 25;
  updateScreen();
}

function trees(){
  money -= 10;
  nature += 20;
  updateScreen();
}

function harvest(){
  money += 30;
  food += 30;
  nature -= 10;
  updateScreen();
}

// Atualiza a tela ao carregar
updateScreen();
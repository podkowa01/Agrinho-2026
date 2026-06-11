// Variáveis de Estado do Jogo
let money = 100;
let score = 0;
let health = 100;
let currentProblem = null;

// Dicionário de problemas da lavoura com impactos e textos informativos
const problems = {
    pest: {
        name: "Infestação de Lagartas",
        alertText: "⚠️ Lagartas atacando as folhas! Prejuízo na colheita e saúde caindo.",
        class: "pest-active",
        damage: 1.5,
        loss: 2 // reduz ganho da colheita
    },
    drought: {
        name: "Estiagem / Seca Severa",
        alertText: "⚠️ Falta de chuva! O solo está rachando e as plantas murchando.",
        class: "drought-active",
        damage: 2.0,
        loss: 3
    },
    erosion: {
        name: "Erosão por Chuva Forte",
        alertText: "⚠️ Enxurrada levando a camada fértil do solo por falta de cobertura!",
        class: "erosion-active",
        damage: 1.2,
        loss: 1
    },
    nutrients: {
        name: "Deficiência Nutricional",
        alertText: "⚠️ Folhas amareladas! Falta de nitrogênio e matéria orgânica no solo.",
        class: "nutrients-active",
        damage: 0.8,
        loss: 1
    }
};

// Elementos do DOM
const moneyEl = document.getElementById("money");
const scoreEl = document.getElementById("score");
const healthEl = document.getElementById("health");
const fieldEl = document.getElementById("crop-field");
const statusTextEl = document.getElementById("crop-status-text");
const alertEl = document.getElementById("problem-alert");
const btnHarvest = document.getElementById("btn-harvest");

// Evento de Colheita (Ganha moedas e sacas)
btnHarvest.addEventListener("click", () => {
    let baseGainMoney = 10;
    let baseGainSacas = 1;

    if (currentProblem) {
        // Se houver problema, a colheita rende menos
        baseGainMoney = Math.max(2, baseGainMoney - problems[currentProblem].loss);
        baseGainSacas = 0; 
        alert("Lavoura com problemas! Resolva a crise para voltar a colher sacas cheias.");
    } else {
        score += baseGainSacas;
    }

    money += baseGainMoney;
    updateUI();
});

// Sorteia um problema aleatório a cada 8 segundos (se não houver um ativo)
setInterval(() => {
    if (!currentProblem && Math.random() > 0.3) {
        const keys = Object.keys(problems);
        currentProblem = keys[Math.floor(Math.random() * keys.length)];
        triggerProblem(currentProblem);
    }
}, 8000);

// Loop de dano no solo (roda a cada 1 segundo)
setInterval(() => {
    if (currentProblem) {
        health -= problems[currentProblem].damage;
        if (health <= 0) {
            health = 0;
            alert("A saúde da sua lavoura chegou a zero! Faça o manejo correto para recuperar o solo.");
        }
        updateUI();
    } else {
        // Recuperação natural lenta do solo quando saudável
        if (health < 100) {
            health = Math.min(100, health + 0.5);
            updateUI();
        }
    }
}, 1000);

// Ativa o visual de problema na tela
function triggerProblem(id) {
    const prob = problems[id];
    fieldEl.className = `field ${prob.class}`;
    statusTextEl.innerText = prob.name;
    alertEl.innerText = prob.alertText;
    alertEl.classList.remove("hidden");
    updateUI();
}

// Resolve o problema clicando no botão da loja correspondente
function resolveProblem(id, cost) {
    if (currentProblem === id && money >= cost) {
        money -= cost;
        currentProblem = null;
        
        // Remove alertas visuais
        fieldEl.className = "field healthy";
        statusTextEl.innerText = "Sua lavoura está limpa, protegida e crescendo forte!";
        alertEl.classList.add("hidden");
        
        // Bônus ecológico por resolver o problema corretamente
        health = Math.min(100, health + 20); 
        
        updateUI();
    }
}

// Atualiza a interface (textos, cores dos botões se tem dinheiro ou não)
function updateUI() {
    moneyEl.innerText = Math.floor(money);
    scoreEl.innerText = score;
    healthEl.innerText = Math.floor(health);

    // Gerencia botões da loja de acordo com o dinheiro e o problema ativo
    checkButtonState("btn-pest", "pest", 30);
    checkButtonState("btn-drought", "drought", 50);
    checkButtonState("btn-erosion", "erosion", 40);
    checkButtonState("btn-nutrients", "nutrients", 25);
}

function checkButtonState(btnId, problemId, cost) {
    const btn = document.getElementById(btnId);
    if (currentProblem === problemId && money >= cost) {
        btn.removeAttribute("disabled");
        btn.classList.add("ready");
    } else {
        btn.setAttribute("disabled", "true");
        btn.classList.remove("ready");
    }
}

// Inicialização técnica
updateUI();
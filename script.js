// Configuração do Estado do Jogo
var money = 100;
var score = 0;
var health = 100;
var currentProblem = null;

// Lista de problemas do Agrinho
var listofProblems = {
    "pest": {
        name: "Ataque de Pragas (Lagarta-do-Cartucho)",
        alertText: "⚠️ Lagartas devorando as folhas! A qualidade da colheita caiu.",
        className: "pest-active",
        damage: 1.5,
        loss: 4
    },
    "drought": {
        name: "Estiagem Severa (Falta de Chuva)",
        alertText: "⚠️ Solo seco! Sem água, as plantas estão murchando.",
        className: "drought-active",
        damage: 2.0,
        loss: 5
    },
    "erosion": {
        name: "Erosão e Degradação do Solo",
        alertText: "⚠️ Chuva forte lavando a terra por falta de palhada protetora!",
        className: "erosion-active",
        damage: 1.2,
        loss: 3
    },
    "nutrients": {
        name: "Exaustão de Nutrientes",
        alertText: "⚠️ Terra infértil! Planta amarelada com falta de nitrogênio.",
        className: "nutrients-active",
        damage: 1.0,
        loss: 2
    }
};

// Seleção de Elementos da Interface
var moneyEl = document.getElementById("money");
var scoreEl = document.getElementById("score");
var healthEl = document.getElementById("health");
var fieldEl = document.getElementById("crop-field");
var statusTextEl = document.getElementById("crop-status-text");
var alertEl = document.getElementById("problem-alert");
var btnHarvest = document.getElementById("btn-harvest");

// Clique no botão colher
if (btnHarvest) {
    btnHarvest.onclick = function() {
        var baseGainMoney = 15;
        var baseGainSacas = 1;

        if (currentProblem) {
            // Penalidade financeira se colher com praga ou seca ativa
            baseGainMoney = Math.max(2, baseGainMoney - listofProblems[currentProblem].loss);
            baseGainSacas = 0;
            alert("Manejo Incorreto! Trate o problema da lavoura na loja abaixo para voltar a colher sacas cheias.");
        } else {
            score += baseGainSacas;
        }

        money += baseGainMoney;
        updateGameUI();
    };
}

// Sorteador de crises (Roda a cada 6 segundos)
setInterval(function() {
    if (!currentProblem) {
        if (Math.random() > 0.3) {
            var keys = ["pest", "drought", "erosion", "nutrients"];
            var randomKey = keys[Math.floor(Math.random() * keys.length)];
            currentProblem = randomKey;
            applyProblem(randomKey);
        }
    }
}, 6000);

// Ciclo de dano no solo (Roda a cada 1 segundo)
setInterval(function() {
    if (currentProblem) {
        health -= listofProblems[currentProblem].damage;
        if (health <= 0) {
            health = 0;
            alert("A saúde da terra zerou! Use as soluções tecnológicas para recuperar o solo.");
        }
        updateGameUI();
    } else {
        if (health < 100) {
            health = Math.min(100, health + 0.5); // Recuperação lenta natural
            updateGameUI();
        }
    }
}, 1000);

// Aplica a crise visualmente
function applyProblem(id) {
    var prob = listofProblems[id];
    if (fieldEl && statusTextEl && alertEl) {
        fieldEl.className = "field " + prob.className;
        statusTextEl.innerText = prob.name;
        alertEl.innerText = prob.alertText;
        alertEl.classList.remove("hidden");
    }
    updateGameUI();
}

// Resolve o problema clicando no botão da loja correspondente
function resolveProblem(id, cost) {
    if (currentProblem === id) {
        if (money >= cost) {
            money -= cost;
            currentProblem = null;
            
            if (fieldEl && statusTextEl && alertEl) {
                fieldEl.className = "field healthy";
                statusTextEl.innerText = "Sua lavoura está limpa, protegida e crescendo forte!";
                alertEl.classList.add("hidden");
            }
            
            health = Math.min(100, health + 25); // Bônus por aplicar manejo sustentável
            updateGameUI();
        } else {
            alert("Você não tem moedas suficientes para essa tecnologia agrícola!");
        }
    }
}

// Atualiza os dados na tela
function updateGameUI() {
    if (moneyEl) moneyEl.innerText = Math.floor(money);
    if (scoreEl) scoreEl.innerText = score;
    if (healthEl) healthEl.innerText = Math.floor(health);

    // Validação de botões da loja
    manageShopButton("btn-pest", "pest", 30);
    manageShopButton("btn-drought", "drought", 50);
    manageShopButton("btn-erosion", "erosion", 40);
    manageShopButton("btn-nutrients", "nutrients", 25);
}

function manageShopButton(btnId, problemId, cost) {
    var btn = document.getElementById(btnId);
    if (btn) {
        if (currentProblem === problemId && money >= cost) {
            btn.removeAttribute("disabled");
            btn.classList.add("ready");
        } else {
            btn.setAttribute("disabled", "true");
            btn.classList.remove("ready");
        }
    }
}

// Inicialização inicial
updateGameUI();
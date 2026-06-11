// Variáveis Globais de Controle da Fazenda
var money = 100;
var score = 0;
var health = 100;
var currentProblem = null;

// Configuração técnica dos problemas rurais enfrentados no Agrinho
var listofProblems = {
    "pest": {
        name: "Ataque de Pragas (Lagarta-do-Cartucho)",
        alertText: "⚠️ Lagartas devorando as folhas! A qualidade da colheita despencou.",
        className: "pest-active",
        damage: 1.5,
        loss: 3
    },
    "drought": {
        name: "Estiagem Severa (Falta de Chuva)",
        alertText: "⚠️ Solo seco! Sem água, os nutrientes não chegam à planta.",
        className: "drought-active",
        damage: 2.0,
        loss: 4
    },
    "erosion": {
        name: "Erosão e Degradação Hidrica",
        alertText: "⚠️ Enxurrada lavando o solo! Falta palhada de proteção na terra.",
        className: "erosion-active",
        damage: 1.2,
        loss: 2
    },
    "nutrients": {
        name: "Exaustão de Nutrientes do Solo",
        alertText: "⚠️ Terra infértil! Planta amarelada com severa falta de nitrogênio.",
        className: "nutrients-active",
        damage: 1.0,
        loss: 2
    }
};

// Captura segura dos elementos HTML
var moneyEl = document.getElementById("money");
var scoreEl = document.getElementById("score");
var healthEl = document.getElementById("health");
var fieldEl = document.getElementById("crop-field");
var statusTextEl = document.getElementById("crop-status-text");
var alertEl = document.getElementById("problem-alert");
var btnHarvest = document.getElementById("btn-harvest");

// Função Executada ao Clicar em "Colher"
if (btnHarvest) {
    btnHarvest.onclick = function() {
        var baseGainMoney = 15;
        var baseGainSacas = 1;

        if (currentProblem) {
            // Penalidade financeira se o produtor colher com a lavoura doente
            baseGainMoney = Math.max(3, baseGainMoney - listofProblems[currentProblem].loss);
            baseGainSacas = 0; 
            alert("Atenção: Trate o problema da sua lavoura para conseguir colher sacas cheias de alta qualidade!");
        } else {
            score += baseGainSacas;
        }

        money += baseGainMoney;
        updateGameUI();
    };
}

// Sorteador de crises ecológicas e biológicas na lavoura (Roda a cada 7 segundos)
setInterval(function() {
    if (!currentProblem) {
        var chance = Math.random();
        if (chance > 0.4) {
            var keys = ["pest", "drought", "erosion", "nutrients"];
            var randomKey = keys[Math.floor(Math.random() * keys.length)];
            currentProblem = randomKey;
            applyProblemToField(randomKey);
        }
    }
}, 7000);

// Ciclo contínuo de dano temporal e recuperação da saúde da lavoura
setInterval(function() {
    if (currentProblem) {
        health -= listofProblems[currentProblem].damage;
        if (health <= 0) {
            health = 0;
            alert("Crise Máxima! A saúde da terra zerou. Aplique o manejo tecnológico adequado imediatamente!");
        }
        updateGameUI();
    } else {
        // Regeneração gradual biológica se o manejo estiver correto
        if (health < 100) {
            health = Math.min(100, health + 0.5);
            updateGameUI();
        }
    }
}, 1000);

// Altera o cenário da lavoura para o estado problemático sorteado
function applyProblemToField(id) {
    var prob = listofProblems[id];
    if (fieldEl && statusTextEl && alertEl) {
        fieldEl.className = "field " + prob.className;
        statusTextEl.innerText = prob.name;
        alertEl.innerText = prob.alertText;
        alertEl.classList.remove("hidden");
    }
    updateGameUI();
}

// Trata o problema aplicando a tecnologia de manejo correta
function resolveProblem(id, cost) {
    if (currentProblem === id) {
        if (money >= cost) {
            money -= cost;
            currentProblem = null;
            
            // Restaura o ambiente visual saudável
            if (fieldEl && statusTextEl && alertEl) {
                fieldEl.className = "field healthy";
                statusTextEl.innerText = "Sua lavoura está limpa, protegida e crescendo forte!";
                alertEl.classList.add("hidden");
            }
            
            // Recompensa em saúde do solo pelo tratamento correto
            health = Math.min(100, health + 25);
            updateGameUI();
        } else {
            alert("Saldo insuficiente! Continue colhendo o que puder para juntar moedas.");
        }
    }
}

// Sincroniza todas as variáveis lógicas com a interface do usuário (UI)
function updateGameUI() {
    if (moneyEl) moneyEl.innerText = Math.floor(money);
    if (scoreEl) scoreEl.innerText = score;
    if (healthEl) healthEl.innerText = Math.floor(health);

    // Valida os botões da loja
    manageShopButton("btn-pest", "pest", 30);
    manageShopButton("btn-drought", "drought", 50);
    manageShopButton("btn-erosion", "erosion", 40);
    manageShopButton("btn-nutrients", "nutrients", 25);
}

// Ativa ou desativa os botões baseado na crise atual e no dinheiro do jogador
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

// Inicializa a interface no carregamento da página
updateGameUI();
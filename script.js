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
        name: "Deficiência Nut
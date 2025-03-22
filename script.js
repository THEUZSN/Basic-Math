let pontuacao = 0;
let tempo = 60;
let cronometro;
let respostaCorreta;
let botoesBloqueados = false;

// Inicia o jogo
function iniciarJogo() {
    pontuacao = 0;
    tempo = 60;
    botoesBloqueados = false;
    document.getElementById("pontuacao").textContent = "Pontuação: " + pontuacao; // Atualiza o texto com o valor da pontuação
    document.getElementById("tempo").textContent = "Tempo: " + tempo; // Atualiza o texto com o valor do tempo
    gerarPergunta();
    clearInterval(cronometro);
    cronometro = setInterval(atualizarTempo, 1000);
}

// Atualiza tempo
function atualizarTempo() {
    tempo--;
    document.getElementById("tempo").textContent = "Tempo: " + tempo; // Atualiza o texto com o valor do tempo
    if (tempo === 0) {
      let audio = new Audio('./sounds/game_over.wav');
        audio.play();
        clearInterval(cronometro);
        alert("Tempo esgotado! Sua pontuação: " + pontuacao);
        iniciarJogo();
    }
}

function gerarPergunta() {
    const numero1 = Math.floor(Math.random() * 10) + 1;
    const numero2 = Math.floor(Math.random() * 10) + 1;
    const operadores = ["+", "-", "*", "/"];
    const operador = operadores[Math.floor(Math.random() * operadores.length)];

    let pergunta, resposta;
    switch (operador) {
        case "+":
            pergunta = `${numero1} + ${numero2}`;
            resposta = numero1 + numero2;
            break;
        case "-":
            pergunta = `${numero1} - ${numero2}`;
            resposta = numero1 - numero2;
            break;
        case "*":
            pergunta = `${numero1} × ${numero2}`;
            resposta = numero1 * numero2;
            break;
        case "/":
            let dividendo = numero1 * numero2;
            pergunta = `${dividendo} ÷ ${numero1}`;
            resposta = dividendo / numero1;
            break;
    }

    document.getElementById("pergunta").textContent = `Quanto é ${pergunta}?`;
    respostaCorreta = resposta;

    // Gerar opções de resposta
    let opcoes = [resposta, resposta + 1, resposta - 1, resposta + (Math.random() < 0.5 ? 10 : -10)];
    opcoes = embaralharArray(opcoes);

    // Adiciona opções aos botões
    const botoes = document.querySelectorAll(".botao-opcao");
    botoes.forEach((botao, index) => {
        botao.textContent = opcoes[index];
        botao.setAttribute("data-valor", opcoes[index]);
        botao.disabled = false;
    });

    botoesBloqueados = false;
}

// Embaralha as opções para evitar padrões
function embaralharArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Verifica a resposta
function verificarResposta(botao) {
    if (botoesBloqueados) return; // Impede que o usuário clique enquanto os botões estão bloqueados

    const respostaUsuario = parseFloat(botao.getAttribute("data-valor"));
    const botoes = document.querySelectorAll(".botao-opcao");

    if (respostaUsuario === respostaCorreta) {
        pontuacao++;
        let audio = new Audio('./sounds/correct.wav');
        audio.play();
        document.getElementById("pontuacao").textContent = "Pontuação: " + pontuacao; // Atualiza o texto com o valor da pontuação
        document.getElementById("mensagem").textContent = "Correto!";
    } else {
      let audio = new Audio('./sounds/error.mp3');
        audio.play();
        if (pontuacao > 0) {
            pontuacao--;
        }
        document.getElementById("pontuacao").textContent = "Pontuação: " + pontuacao; // Atualiza o texto com o valor da pontuação
        document.getElementById("mensagem").textContent = "Errado!";
    }

    // Desabilita todos os botões após a escolha
    botoes.forEach((botao) => {
        botao.disabled = true;
    });

    // Permite uma nova pergunta apos um atraso
    botoesBloqueados = true;
    setTimeout(() => {
        gerarPergunta();
    }, 1000);
}

// Inicia o game
window.onload = iniciarJogo;
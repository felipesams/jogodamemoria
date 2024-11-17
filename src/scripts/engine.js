const cards = [
    "http://127.0.0.1:5500/src/images/ace_of_hearts1.png",
    "http://127.0.0.1:5500/src/images/ace_of_hearts1.png",
    "http://127.0.0.1:5500/src/images/king_of_diamonds1.png",
    "http://127.0.0.1:5500/src/images/king_of_diamonds1.png",
    "http://127.0.0.1:5500/src/images/queen_of_hearts1.png",
    "http://127.0.0.1:5500/src/images/queen_of_hearts1.png",
    "http://127.0.0.1:5500/src/images/jack_of_spades1.png",
    "http://127.0.0.1:5500/src/images/jack_of_spades1.png",
    "http://127.0.0.1:5500/src/images/ace_of_diamonds1.png",
    "http://127.0.0.1:5500/src/images/ace_of_diamonds1.png",
    "http://127.0.0.1:5500/src/images/ace_of_clubs1.png",
    "http://127.0.0.1:5500/src/images/ace_of_clubs1.png",
    "http://127.0.0.1:5500/src/images/ace_of_spades1.png",
    "http://127.0.0.1:5500/src/images/ace_of_spades1.png",
    "http://127.0.0.1:5500/src/images/joker1.png",
    "http://127.0.0.1:5500/src/images/joker1.png"
];

let openCards = [];
let shuffledCards = cards.sort(() => Math.random() - 0.5);

// Criar os elementos do jogo
for (let i = 0; i < shuffledCards.length; i++) {
    let box = document.createElement("div");
    box.className = "item";



    let img = document.createElement("img");
    img.src = shuffledCards[i];  // Caminho da imagem
    img.alt = "Carta de baralho";

    // Log para verificar se a imagem foi criada corretamente
    img.onload = function() {
        console.log("Imagem carregada com sucesso:", img.src);
    };

    img.onerror = function() {
        console.error("Erro ao carregar a imagem:", img.src);
    };

    box.appendChild(img);
    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box);
}
// Função de clique
function handleClick() {
    // Garantir que não há mais de duas cartas abertas e que a carta não foi virada antes
    if (openCards.length < 2 && !this.classList.contains("boxOpen") && !this.classList.contains("boxMatch")) {
        this.classList.add("boxOpen");
        openCards.push(this);
    }

    // Se duas cartas foram abertas, verifica se são correspondentes
    if (openCards.length === 2) {
        setTimeout(checkMatch, 500); // Verificar as correspondências após meio segundo
    }
}

// Verificar correspondência
function checkMatch() {
    if (
        openCards[0] &&
        openCards[1] &&
        openCards[0].querySelector("img").src === openCards[1].querySelector("img").src
    ) {
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
    } else {
        openCards[0]?.classList.remove("boxOpen");
        openCards[1]?.classList.remove("boxOpen");
    }
    openCards = [];
    
    // Verificar se todas as cartas foram encontradas
    if (document.querySelectorAll(".boxMatch").length === cards.length) {
        alert("Você venceu!");
    }
}

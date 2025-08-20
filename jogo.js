const board = document.getElementById("board");
const winnerText = document.getElementById("winner");
const turnText = document.getElementById("turnText");

let playerX = "Jogador X";
let playerO = "Jogador O";
let currentPlayer = "X";
let cells = Array(9).fill(null);
let scoreX = 0;
let scoreO = 0;

// Inicia o jogo com nomes
function startGame() {
    const inputX = document.getElementById("playerX").value;
    const inputO = document.getElementById("playerO").value;

    playerX = inputX || "Jogador X";
    playerO = inputO || "Jogador O";

    document.getElementById("menu").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");

    renderBoard();
    updateTurnText();
}

// cria tabuleiro
function renderBoard() {
    board.innerHTML = "";
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", play);
        board.appendChild(cell);
    }
}

function play(e) {
    const index = e.target.dataset.index;

    if (!cells[index]) {
        cells[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        e.target.classList.add("taken");
        e.target.classList.add(currentPlayer.toLowerCase());

        if (checkWinner()) {
            const winnerName = currentPlayer === "X" ? playerX : playerO;
            winnerText.textContent = `🔥 ${winnerName} venceu! 🔥`;
            updateScore(currentPlayer);
            board.querySelectorAll(".cell").forEach(c => c.removeEventListener("click", play));
        } else if (cells.every(cell => cell)) {
            winnerText.textContent = "😮 Deu velha! Empate!";
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            updateTurnText();
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
        [0, 4, 8], [2, 4, 6]           // diagonais
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
    });
}

function resetGame() {
    cells.fill(null);
    winnerText.textContent = "";
    currentPlayer = "X";
    renderBoard();
    updateTurnText();
}

function updateTurnText() {
    const currentName = currentPlayer === "X" ? playerX : playerO;
    turnText.textContent = `Vez de: ${currentName} (${currentPlayer})`;
}

function updateScore(winner) {
    if (winner === "X") {
        scoreX++;
        document.getElementById("scoreX").textContent = `${playerX}: ${scoreX} vitórias`;
    } else {
        scoreO++;
        document.getElementById("scoreO").textContent = `${playerO}: ${scoreO} vitórias`;
    }
}

//startGame → inicia o jogo com nomes.

//renderBoard → monta o tabuleiro.

//play → trata cada jogada.

//checkWinner → verifica vitória.

//resetGame → reinicia o jogo.

//updateTurnText → mostra de quem é a vez.

//updateScore → atualiza o ranking local.
let player1 = "";
let player2 = "";
let currentPlayer = "";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// DOM elements
const submitBtn = document.getElementById("submit");
const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const playerInputsDiv = document.querySelector(".player-inputs");
const gameBoardDiv = document.querySelector(".game-board");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Handle player name submission
submitBtn.addEventListener("click", () => {
  player1 = player1Input.value.trim();
  player2 = player2Input.value.trim();

  if (player1 === "" || player2 === "") {
    alert("Please enter both player names!");
    return;
  }

  // Hide input section and show game
  playerInputsDiv.classList.add("hidden");
  gameBoardDiv.classList.remove("hidden");

  currentPlayer = player1;
  messageDiv.textContent = `${currentPlayer}, you're up`;
});

// Handle clicks on board cells
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (!gameActive || board[index] !== "") return;

    board[index] = currentPlayer === player1 ? "x" : "o";
    cell.textContent = board[index];

    if (checkWinner()) {
      messageDiv.textContent = `${currentPlayer} congratulations you won!`;
      gameActive = false;
      return;
    }

    if (board.every(c => c !== "")) {
      messageDiv.textContent = "It's a draw!";
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === player1 ? player2 : player1;
    messageDiv.textContent = `${currentPlayer}, you're up`;
  });
});

function checkWinner() {
  return winningCombinations.some(combo => {
    const [a, b, c] = combo;
    return (
      board[a] !== "" &&
      board[a] === board[b] &&
      board[a] === board[c]
    );
  });
}

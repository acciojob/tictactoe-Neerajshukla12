let player1 = "";
let player2 = "";
let currentPlayer = "";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// DOM Elements
const submitBtn = document.getElementById("submit");
const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");
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

  // Hide input form and show game board
  playerInputsDiv.classList.add("hidden");
  gameBoardDiv.classList.remove("hidden");

  currentPlayer = player1;
  messageDiv.textContent = `${currentPlayer}, you're up!`;
});

// Handle cell click
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (!gameActive || board[index] !== "") return;

    board[index] = currentPlayer === player1 ? "X" : "O";
    cell.textContent = board[index];

    if (checkWinner()) {
      messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
      gameActive = false;
      return;
    }

    if (board.every(cell => cell !== "")) {
      messageDiv.textContent = "It's a draw!";
      gameActive = false;
      return;
    }

    // Switch turn
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    messageDiv.textContent = `${currentPlayer}, you're up!`;
  });
});

// Check for winner
function checkWinner() {
  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return (
      board[a] !== "" &&
      board[a] === board[b] &&
      board[a] === board[c]
    );
  });
}

function resetGameStatus() {
  activePlayer = 0;
  currentRound = 1;
  document.querySelector("#game-over h2").innerHTML =
    'You won, <span id="winner-name"># WINNER PLAYER NAME #</span>!';
  gameOverElement.style.display = "none";

  let gameBoardIndex = 0;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      gameData[row][col] = 0;
      const gameBoardItem = gameBoardElement.children[gameBoardIndex];
      gameBoardItem.textContent = "";
      gameBoardItem.classList.remove("disabled");
      gameBoardIndex++;
    }
  }
}

function startNewGame() {
  if (!players[0].name || !players[1].name) {
    alert("Please set custom player names for both players!");
    return;
  }

  resetGameStatus();

  gameAreaElement.style.display = "block";
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  const selectedGameFieldElement = event.target;
  const selectedRow = +selectedGameFieldElement.dataset.row - 1;
  const selectedColumn = +selectedGameFieldElement.dataset.col - 1;

  if (gameData[selectedRow][selectedColumn] > 0) {
    alert("Please select an empty field!");
    return;
  }

  const activeSymbol = players[activePlayer].symbol;
  selectedGameFieldElement.textContent = activeSymbol;
  selectedGameFieldElement.classList.add("disabled");

  gameData[selectedRow][selectedColumn] = activePlayer + 1;

  const winnerId = checkForGameOver();
  if (winnerId !== 0) {
    endGame(winnerId);
    return;
  }

  currentRound++;
  switchPlayer();
}

function checkForGameOver() {
  // Check for rows equality
  for (let row = 0; row < 3; row++) {
    if (
      gameData[row][0] > 0 &&
      gameData[row][0] === gameData[row][1] &&
      gameData[row][1] === gameData[row][2]
    ) {
      return gameData[row][0];
    }
  }

  // Check for columns equality
  for (let col = 0; col < 3; col++) {
    if (
      gameData[0][col] > 0 &&
      gameData[0][col] === gameData[1][col] &&
      gameData[1][col] === gameData[2][col]
    ) {
      return gameData[0][col];
    }
  }

  // Diagonal: top left to bottom right
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }

  // Diagonal: top right to bottom left
  if (
    gameData[0][2] > 0 &&
    gameData[0][2] === gameData[1][1] &&
    gameData[1][1] === gameData[2][0]
  ) {
    return gameData[0][2];
  }

  // Check for draw
  if (currentRound === 9) {
    return -1;
  }

  // Still no winner
  return 0;
}

function endGame(winnerId) {
  if (winnerId === -1) {
    document.querySelector("#game-over h2").textContent = "It's a draw!";
  } else {
    document.getElementById("winner-name").textContent =
      players[winnerId - 1].name;
  }
  gameOverElement.style.display = "block";
}

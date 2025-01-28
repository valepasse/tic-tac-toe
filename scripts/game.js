function startNewGame() {
  if (!players[0].name || !players[1].name) {
    alert("Please set custom player names for both players!");
    return;
  }

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

  switchPlayer();
}

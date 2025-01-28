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

  if (selectedGameFieldElement.classList.contains("disabled")) {
    return;
  }

  selectedGameFieldElement.textContent = players[activePlayer].symbol;
  selectedGameFieldElement.classList.add("disabled");
  switchPlayer();
}

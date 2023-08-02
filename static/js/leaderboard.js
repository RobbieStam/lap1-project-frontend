const url = "https://staging-countries.onrender.com/scores";

const list = document.querySelector("#ranking");

function addPlayer(player) {
  const li = document.createElement("li");
  const name = player['name'];
  li.textContent = `${name} - ${player.score}`;
  list.appendChild(li);
}

function fetchScores(data) {
  const players = data;
  let listLength = 10;
  if (players.length < 10) {
    listLength = players.length;
  }

  for (let i = 0; i < players.length; i++) {
    addPlayer(players[i]);
  }
}

function displayScores() {
  fetch(url)
  .then(resp => resp.json())
  .then(fetchScores);
}

displayScores();
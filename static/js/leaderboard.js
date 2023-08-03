const url = "https://capitals-quiz.onrender.com/";

const capitalsList = document.querySelector(".ranking-capitals");
const flagsList = document.querySelector(".ranking-flags");
const countriesList = document.querySelector(".ranking-countries");
const lists = [capitalsList, flagsList, countriesList];

let board = 0; // Use to switch boards once completed

function addCapitalsPlayer(player) {
  const li = document.createElement("li");
  const name = player['name'];
  li.textContent = `${name} - ${player.score}`;

  capitalsList.appendChild(li)
  
}

function addFlagsPlayer(player) {
  const li = document.createElement("li");
  const name = player['name'];
  li.textContent = `${name} - ${player.score}`;

  flagsList.appendChild(li)
  
}

function addCountriesPlayer(player) {
  const li = document.createElement("li");
  const name = player['name'];
  li.textContent = `${name} - ${player.score}`;

  countriesList.appendChild(li)
  
}

function fetchCapitalScores(data) {
  const players = data;
  let listLength = 5;
  if (players.length < listLength) {
    listLength = players.length;
  }
  for (let i = 0; i < listLength; i++) {
    addCapitalsPlayer(players[i]);
  }
}

function fetchFlagScores(data) {
  const players = data;
  let listLength = 5;
  if (players.length < listLength) {
    listLength = players.length;
  }
  for (let i = 0; i < listLength; i++) {
    addFlagsPlayer(players[i]);
  }
}

function fetchCountryScores(data) {
  const players = data;
  let listLength = 5;
  if (players.length < listLength) {
    listLength = players.length;
  }
  for (let i = 0; i < listLength; i++) {
    addCountriesPlayer(players[i]);
  }
}

const displayFlagScores = () => {
  fetch(`${url}flags_scores`)
  .then(resp => resp.json())
  .then(fetchFlagScores);
}

function displayCapitalScores() {
  fetch(`${url}capitals_scores`)
  .then(resp => resp.json())
  .then(fetchCapitalScores);
}

function displayCountryScores() {
  fetch(`${url}countries_scores`)
  .then(resp => resp.json())
  .then(fetchCountryScores);
}

function displayAll() {
  displayCapitalScores()
  displayFlagScores()
  displayCountryScores()
}

displayAll();
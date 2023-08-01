const url = "https://capitals-quiz.onrender.com/countries";

let currentCapital;
let score = 0;
const scoreText = document.querySelector("#score");

function displayScore() {
  scoreText.textContent = `Score: ${score}`
}

function getRandomCountry(countries) {
  const max = countries.length;
  const randIdx = Math.floor(Math.random() * max);
  return countries[randIdx];
}

function fetchCountry(data) {

  const country = getRandomCountry(data);

  const textElement = document.querySelector("#question");
  textElement.textContent = country['name'];

  currentCapital = country['capital'].toLowerCase();
  console.log(currentCapital);
}

function displayCountry() {
  fetch(url)
  .then(resp => resp.json())
  .then(fetchCountry);
}

function checkAnswer(e) {
  e.preventDefault();
  const input = e.target.answer.value.toLowerCase();
  if (input === currentCapital) {
    score++;
    console.log(score)
    console.log("correct")
  }
  e.target.answer.value = '';
  displayScore();
  displayCountry();
}

const form = document.querySelector('#country-guess');
form.addEventListener('submit', checkAnswer);

displayScore();
displayCountry();
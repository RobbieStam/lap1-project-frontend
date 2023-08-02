const url = "https://staging-countries.onrender.com/countries";

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
  const countryName = country['name']

  const textElement = document.querySelector("#question");
  textElement.textContent = `What is the capital of ${countryName}?`;

  currentCapital = country['capital'];
  console.log(currentCapital);
}

function displayCountry() {
  fetch(url)
  .then(resp => resp.json())
  .then(fetchCountry);
}

function checkAnswer(e) {
  e.preventDefault();
  const input = e.target.answer.value;
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

function displayTimer(timer, timerElement) {
  let minutes = Math.floor(timer / 60);
  let seconds = Math.floor(timer % 60); //can maybe remove 10?

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  timerElement.textContent= `${minutes}:${seconds}`;
}

function startTimer() {
  const timerElement = document.querySelector('#timer');
  let timer = 90; // set duration

  displayTimer(timer, timerElement); // initialise display
  
  // countdown
  setInterval(function () {
    displayTimer(timer, timerElement);

    if (--timer < 0) {
      timer = 0;
    }
  }, 1000)
}

displayScore();
displayCountry();
startTimer();
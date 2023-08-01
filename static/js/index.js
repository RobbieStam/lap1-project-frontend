const url = "https://capitals-quiz.onrender.com/countries";

let currentCapital, currentCountry;
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

  currentCapital = country['capital'];
  currentCountry = country['name'];
  console.log(currentCapital);
}

function displayCountry() {
  fetch(url)
  .then(resp => resp.json())
  .then(fetchCountry);
}

function displayAnswerMessage(isCorrect) {
  const answerMessage = document.querySelector('#response');
  if (isCorrect) {
    answerMessage.textContent = `Correct answer!`;
    answerMessage.style.color="blue";
  } else {
    answerMessage.textContent = `Incorrect, ${currentCapital} is the capital of ${currentCountry}`;
    answerMessage.style.color="firebrick";
  }
}

function checkAnswer(e) {
  e.preventDefault();
  const input = e.target.answer.value;
  if (input.toLowerCase() === currentCapital.toLowerCase()) {
    score++;
    displayAnswerMessage(true);
  } else {
    displayAnswerMessage(false);
  }
  e.target.answer.value = '';
  displayScore();
  displayCountry();
}

const form = document.querySelector('#country-guess');
form.addEventListener('submit', checkAnswer);

displayScore();
displayCountry();
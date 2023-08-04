const url = "https://capitals-quiz.onrender.com/countries/random";

let currentCapital, currentCountry;
let score = 0;
const scoreText = document.querySelector("#score");

function displayScore() {
  scoreText.textContent = `Score: ${score}`
}

function fetchCountry(data) {

  const country = data;

  const textElement = document.querySelector("#question");
  textElement.textContent = country['name'];

  currentCapital = country['capital'];
  currentCountry = country['name'];
  // console.log(currentCapital);
}

function displayCountry() {
  fetch(url)
  .then(resp => resp.json())
  .then(fetchCountry);
}

function displayAnswerMessage(isCorrect) {
  answerMessage.style.visibility = 'visible';
  if (isCorrect) {
    answerMessage.textContent = `Correct answer!`;
    answerMessage.style.color = 'green';
  } else {
    answerMessage.textContent = `Incorrect, ${currentCapital} is the capital of ${currentCountry}`;
    answerMessage.style.color = 'firebrick';
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

function displayTimer(timer, timerElement) {
  let minutes = Math.floor(timer / 60);
  let seconds = Math.floor(timer % 60);

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  timerElement.textContent= `${minutes}:${seconds}`;
}

function startTimer() {
  const timerElement = document.querySelector('#timer');
  let timer = 30; // set duration

  displayTimer(timer, timerElement); // initialise display
  
  // countdown
  var changeTimer = setInterval(function () {
    displayTimer(timer, timerElement);

    if (--timer < 0) {
      timer = 0;

      endGame();
      clearInterval(changeTimer);
    }
  }, 1000)
}

async function postScore(e) {
  const name = e.target.name.value;
  const finalScore = score;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      score: finalScore
    })
  }

  const response = await fetch(`https://capitals-quiz.onrender.com/capitals_scores`, options)
  console.log(response)
  if (response.status === 201) {
    console.log(`201 true`)
  }
}

function startGame() {
  replayButton.style.visibility = "hidden";
  answerMessage.style.visibility = "hidden";
  submitButton.removeAttribute("disabled");
  score = 0;
  displayScore();
  displayCountry();
  startTimer();
}

function endGame() {
  // Get name and score
  dialog.showModal();

  submitButton.setAttribute("disabled", true);

  replayButton.style.visibility = "visible";
}

const answerMessage = document.querySelector('#response');

const form = document.querySelector('#country-guess');
form.addEventListener('submit', checkAnswer);

const dialog = document.getElementById("dialog");
const dialogEntry = document.getElementById("name");
dialogEntry.addEventListener("submit", postScore);

// Form cancel button closes the dialog box
const cancelButton = document.getElementById("cancel");
cancelButton.addEventListener("click", () => dialog.close("nameNotGiven"));

const replayButton = document.getElementById("replay");
replayButton.addEventListener("click", startGame)

const submitButton = document.querySelector('.submit-btn');

startGame();
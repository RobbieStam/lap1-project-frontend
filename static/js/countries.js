const url = "https://staging-countries.onrender.com/countries/random";

let currentCapital, currentCountry;
let score = 0;
const scoreText = document.querySelector("#score");

function displayScore() {
  scoreText.textContent = `Score: ${score}`
}

// function getRandomCountry(countries) {
//   const max = countries.length;
//   const randIdx = Math.floor(Math.random() * max);
//   return countries[randIdx];
// }

function fetchCountry(data) {

  const country = data;

  const textElement = document.querySelector("#question");
  textElement.textContent = country['capital'];

  currentCapital = country['capital'];
  currentCountry = country['name'];
  console.log(currentCountry);
}

function displayCountry() {
  fetch(url)
  .then(resp => resp.json())
  .then(fetchCountry);
}

function displayAnswerMessage(isCorrect) {
  const answerMessage = document.querySelector('#response');
  answerMessage.style.visibility = 'visible';
  if (isCorrect) {
    answerMessage.textContent = `Correct answer!`;
    answerMessage.style.color = 'blue';
  } else {
    answerMessage.textContent = `Incorrect, ${currentCapital} is the capital of ${currentCountry}`;
    answerMessage.style.color = 'firebrick';
  }
}

function checkAnswer(e) {
  e.preventDefault();
  const input = e.target.answer.value;
  if (input.toLowerCase() === currentCountry.toLowerCase()) {
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
  let seconds = Math.floor(timer % 60); //can maybe remove 10?

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  timerElement.textContent= `${minutes}:${seconds}`;
}

function startTimer() {
  const timerElement = document.querySelector('#timer');
  let timer = 5; // set duration

  displayTimer(timer, timerElement); // initialise display
  
  // countdown
  var changeTimer = setInterval(function () {
    displayTimer(timer, timerElement);

    if (--timer < 0) {
      timer = 0;
      // Get name and score
      dialog.showModal();
      clearInterval(changeTimer);
    }
  }, 1000)
}

// async function postScore(e) {
//   const name = e.target.name.value;
//   const finalScore = score;

//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       name: name,
//       score: finalScore
//     })
//   }

//   const response = await fetch(`https://staging-countries.onrender.com/scores`, options)
//   console.log(response)
//   if (response.status === 201) {
//     console.log(`201 true`)
//   }
// }

const form = document.querySelector('#country-guess');
form.addEventListener('submit', checkAnswer);

const dialog = document.getElementById("dialog");
const dialogEntry = document.getElementById("name");
//dialogEntry.addEventListener("submit", postScore);

// Form cancel button closes the dialog box
const cancelButton = document.getElementById("cancel");
cancelButton.addEventListener("click", () => dialog.close("nameNotGiven"));

displayScore();
displayCountry();
startTimer();
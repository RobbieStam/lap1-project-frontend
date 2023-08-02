const flagIMG = document.getElementById("flag");
const scoreText = document.querySelector("#score");
let score = 0,
currentCountry;

async function getFlag() {
    try {
      const response = await fetch("https://staging-countries.onrender.com/countries/random")
      const data = await response.json();
      const flag = data.flag;
      currentCountry = data.name;
      console.log(flag);
      console.log(currentCountry);
      flagIMG.src = flag;
      return flag;
    } catch (error) {
      console.log(error);
    }
}
function displayScore() {
  scoreText.textContent = `Score: ${score}`
}

function checkAnswer(e) {
  e.preventDefault();
  const input = e.target.answer.value;
  if (input === currentCountry) {
    score++;
    console.log("correct")
  }
  e.target.answer.value = '';
  displayScore();
  getFlag();
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
const form = document.querySelector('#flag-guess');
form.addEventListener('submit', checkAnswer);

getFlag();
displayScore();
startTimer();

const flagIMG = document.getElementById("flag");
const scoreText = document.querySelector("#score");
let score = 0,
currentCountry,
sharedFlags = ["Bonaire, Sint Eustatius and Saba", "Bouvet Island", "United States Minor Outlying Islands", "Saint Martin (French part)", "Svalbard and Jan Mayen"];

// Retrieves a random country and its associated flag, but only stores the name and flag info
async function getFlag() {
    try {
      const response = await fetch("https://staging-countries.onrender.com/countries/random")
      const data = await response.json();
      const flag = data.flag;
      currentCountry = data.name.toLowerCase();
      flagIMG.src = flag;
      console.log(currentCountry);
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
  const input = e.target.answer.value.toLowerCase();
  if (input === currentCountry) {
    score++;
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

function checkShared() {
  for(let i = 0; i < sharedFlags.length; i++) {
    if(currentCountry === sharedFlags[i].toLowerCase()) {
      // Code in here to allow for the Flag to be Sovereign Country name
    }
  }
}

getFlag();
displayScore();
startTimer();

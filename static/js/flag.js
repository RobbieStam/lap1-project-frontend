const flagIMG = document.getElementById("flag");
const scoreText = document.querySelector("#score");
let alt = [];
let score = 0,
currentCountry,
sharedFlags = ["Bouvet Island", "United States Minor Outlying Islands", "Saint Martin (French part)", "Svalbard and Jan Mayen", "Heard Island and McDonald Islands"];
let alias = "";

// Retrieves a random country and its associated flag, and stores flag, name and alternate names as variables
async function getFlag() {
    try {
      const response = await fetch("https://staging-countries.onrender.com/countries/random")
      const data = await response.json();
      currentCountry = data.name.toLowerCase();
      flagIMG.src = data.flag;
      checkShared();
      if(data.alt) {
        alt = data.alt;
        console.log(alt);
      }
      console.log(currentCountry);
      return data.flag;
    } catch (error) {
      console.log(error);
    }
}
function displayScore() {
  scoreText.textContent = `Score: ${score}`
}
// Checks the users answer, checks if the flag is shared by a sovereign country and also allows for alternate answers to be valid: ie; "United Kingdom of Great Britain and Northern Ireland" will accept "United Kingdom" or "UK" as a valid answer
function checkAnswer(e) {
  e.preventDefault();
  const input = e.target.answer.value.toLowerCase();
  if(alt.length > 0) {
    for(let i = 0; i < alt.length; i++) {
      switch (input) {
        case alt[i].toLowerCase():
          score++;
          alt = [];
          break;
        case currentCountry:
          score++;
          alt = [];
          break;
        case alias.toLowerCase():
          score++;
          alt = [];
          break;
        default:
          alt = [];
      }
    }
  } else if(input === currentCountry || input === alias.toLowerCase()){
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

// Function to check if the territory shares a flag with a sovereign nation, if so assigns it an appropriate alias (since the territory name does NOT change)
function checkShared() {
  for(let i = 0; i < sharedFlags.length; i++) {
    if(currentCountry === sharedFlags[i].toLowerCase()) {
      switch(sharedFlags[i]) {
        case "Bouvet Island":
          alias = "Norway";
          break;
        case "United States Minor Outlying Islands":
          alias = "United States";
          break;
        case "Saint Martin (French part)":
          alias = "France";
          break;
        case "Svalbard and Jan Mayen":
          alias = "Norway";
          break;
        case "Heard Island and McDonald Islands":
          alias = "Australia";
          break;
        default:
          console.log("Something has gone wrong.");
      }
      console.log("country shares a flag");
    }
  }
}

getFlag();
displayScore();
startTimer();

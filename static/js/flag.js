const flagIMG = document.getElementById("flag");
const scoreText = document.querySelector("#score");
let alt = [],
usedFlags = [],
score = 0,
currentCountry,
sharedFlags = ["Bouvet Island", "United States Minor Outlying Islands", "Saint Martin (French part)", "Svalbard and Jan Mayen", "Heard Island and McDonald Islands"],
alias = "";

function startGame() {
  score = 0;
  replayButton.style.visibility = "hidden";
  answerMessage.style.visibility = "hidden";
  submitButton.removeAttribute("disabled");
  getFlag();
  displayScore();
  startTimer();
}
// Retrieves a random country and its associated flag, and stores flag, name and alternate names as variables
async function getFlag() {
    try {
      const response = await fetch("https://capitals-quiz.onrender.com/countries/random")
      const data = await response.json();
      currentCountry = data.name;
      flagIMG.src = data.flag;
      checkShared();
      if(data.alt) {
        alt = data.alt;
      }
      // console.log(currentCountry);
      return data.flag;
    } catch (error) {
      console.log(error);
    }
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

  const response = await fetch("https://capitals-quiz.onrender.com/flags_scores", options)
  console.log(response)
  if (response.status === 201) {
    console.log(`201 true`)
  }
}
function displayScore() {
  scoreText.textContent = `Score: ${score}`
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
function endGame() {
  // Get name and score
  dialog.showModal();

  submitButton.setAttribute("disabled", true);

  replayButton.style.visibility = "visible";
}

function checkAlt(input) {
  for (let i = 0; i< alt.length; i++) {
    if (input === alt[i].toLowerCase()) {
      score++;
      displayAnswerMessage(true);
      break;
    } else {
      displayAnswerMessage(false);
    }
  }
}
// Checks the users answer, checks if the flag is shared by a sovereign country and also allows for alternate answers to be valid: ie; "United Kingdom of Great Britain and Northern Ireland" will accept "United Kingdom" or "UK" as a valid answer
function checkAnswer(e) {
  e.preventDefault();
  const input = e.target.answer.value.toLowerCase();
  if(!input) {
    displayAnswerMessage(false);
  } 
  if(input === currentCountry.toLowerCase()) {
    score ++;
    displayAnswerMessage(true);
  } else  if (alt.length > 0) {
    checkAlt(input);
  } else if (input && input === alias.toLowerCase()) {
    score ++;
    displayAnswerMessage(true);
  } else {
      displayAnswerMessage(false);
  }
  e.target.answer.value = '';
  displayScore();
  getFlag();
}

function displayAnswerMessage(isCorrect) {
  answerMessage.style.visibility = 'visible';
  if (isCorrect) {
    answerMessage.textContent = `Correct answer!`;
    answerMessage.style.color = 'green';
  } else {
    answerMessage.textContent = `Incorrect, it was the flag of ${currentCountry}`;
    answerMessage.style.color = 'firebrick';
  }
}
// Function to check if the territory shares a flag with a sovereign nation, if so assigns it an appropriate alias (since the territory name does NOT change)
function checkShared() {
  for(let i = 0; i < sharedFlags.length; i++) {
    if(currentCountry === sharedFlags[i].toLowerCase()) {
      switch(sharedFlags[i]) {
        case "Bouvet Island": case "Svalbard and Jan Mayen":
          alias = "Norway";
          break;
        case "United States Minor Outlying Islands":
          alias = "United States";
          break;
        case "Saint Martin (French part)":
          alias = "France";
          break;
        case "Heard Island and McDonald Islands":
          alias = "Australia";
          break;
        default:
          console.log("something has gone wrong");
      }
    }
  }
}

const answerMessage = document.querySelector('#response');
const form = document.querySelector('#flag-guess');
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

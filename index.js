const url = "https://capitals-quiz.onrender.com/countries";

function getRandomCountry(countries) {
  const max = countries.length;
  const randIdx = Math.floor(Math.random() * max);
  return countries[randIdx];
}

function fetchCountry(data) {

  const country = getRandomCountry(data);

  const textElement = document.querySelector("#question");
  textElement.textContent = country['name'];
}

function displayCountry() {
  fetch(url)
  .then(resp => resp.json())
  .then(fetchCountry);
}

displayCountry();

const score = document.querySelector("#score")

const randomScore = () => Math.floor(Math.random() *100);

score.textContent = `Score: ${randomScore()}`



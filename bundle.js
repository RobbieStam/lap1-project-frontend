(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const url = "https://capitals-quiz.onrender.com/countries";

let currentCapital;
let score = 0;
const scoreText = document.querySelector("#score");

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

function displayScore() {
  scoreText.textContent = `Score: ${score}`
}

displayScore();
displayCountry();
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IHVybCA9IFwiaHR0cHM6Ly9jYXBpdGFscy1xdWl6Lm9ucmVuZGVyLmNvbS9jb3VudHJpZXNcIjtcblxubGV0IGN1cnJlbnRDYXBpdGFsO1xubGV0IHNjb3JlID0gMDtcbmNvbnN0IHNjb3JlVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2NvcmVcIik7XG5cbmZ1bmN0aW9uIGdldFJhbmRvbUNvdW50cnkoY291bnRyaWVzKSB7XG4gIGNvbnN0IG1heCA9IGNvdW50cmllcy5sZW5ndGg7XG4gIGNvbnN0IHJhbmRJZHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXgpO1xuICByZXR1cm4gY291bnRyaWVzW3JhbmRJZHhdO1xufVxuXG5mdW5jdGlvbiBmZXRjaENvdW50cnkoZGF0YSkge1xuXG4gIGNvbnN0IGNvdW50cnkgPSBnZXRSYW5kb21Db3VudHJ5KGRhdGEpO1xuXG4gIGNvbnN0IHRleHRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNxdWVzdGlvblwiKTtcbiAgdGV4dEVsZW1lbnQudGV4dENvbnRlbnQgPSBjb3VudHJ5WyduYW1lJ107XG5cbiAgY3VycmVudENhcGl0YWwgPSBjb3VudHJ5WydjYXBpdGFsJ107XG4gIGNvbnNvbGUubG9nKGN1cnJlbnRDYXBpdGFsKTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheUNvdW50cnkoKSB7XG4gIGZldGNoKHVybClcbiAgLnRoZW4ocmVzcCA9PiByZXNwLmpzb24oKSlcbiAgLnRoZW4oZmV0Y2hDb3VudHJ5KTtcbn1cblxuZnVuY3Rpb24gY2hlY2tBbnN3ZXIoZSkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IGlucHV0ID0gZS50YXJnZXQuYW5zd2VyLnZhbHVlO1xuICBpZiAoaW5wdXQgPT09IGN1cnJlbnRDYXBpdGFsKSB7XG4gICAgc2NvcmUrKztcbiAgICBjb25zb2xlLmxvZyhzY29yZSlcbiAgICBjb25zb2xlLmxvZyhcImNvcnJlY3RcIilcbiAgfVxuICBlLnRhcmdldC5hbnN3ZXIudmFsdWUgPSAnJztcbiAgZGlzcGxheVNjb3JlKCk7XG4gIGRpc3BsYXlDb3VudHJ5KCk7XG59XG5cbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY291bnRyeS1ndWVzcycpO1xuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBjaGVja0Fuc3dlcik7XG5cbmZ1bmN0aW9uIGRpc3BsYXlTY29yZSgpIHtcbiAgc2NvcmVUZXh0LnRleHRDb250ZW50ID0gYFNjb3JlOiAke3Njb3JlfWBcbn1cblxuZGlzcGxheVNjb3JlKCk7XG5kaXNwbGF5Q291bnRyeSgpOyJdfQ==

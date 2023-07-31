const score = document.querySelector("#score")

const randomScore = () => Math.floor(Math.random() *100);

score.textContent = `Score: ${randomScore()}`



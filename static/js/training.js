function getCountry() {
    const textElement = document.querySelector("#front");
    const capitalElement = document.querySelector("#back");
    const url = "https://capitals-quiz.onrender.com/countries/random"
    fetch(url)
        .then(resp => resp.json())
        .then(country => {
            textElement.textContent = country["name"]
            capitalElement.textContent = country["capital"]
        });
    }   
  getCountry();
  
  function getCountry2() {
    const textElement = document.querySelector("#front2");
    const capitalElement = document.querySelector("#back2");
    const url = "https://capitals-quiz.onrender.com/countries/random"
    fetch(url)
        .then(resp => resp.json())
        .then(country => {
            textElement.textContent = country["name"]
            capitalElement.textContent = country["capital"]
        });
    }   
  getCountry2();
  
  function getCountry3() {
    const textElement = document.querySelector("#front3");
    const capitalElement = document.querySelector("#back3");
    const url = "https://capitals-quiz.onrender.com/countries/random"
    fetch(url)
        .then(resp => resp.json())
        .then(country => {
            textElement.textContent = country["name"]
            capitalElement.textContent = country["capital"]
        });
    }   
  getCountry3();
  
const flagIMG = document.getElementById("flag");

async function getFlag() {
    try {
      const response = await fetch("https://staging-countries.onrender.com/countries/random")
      const data = await response.json();
      const flag = data.flag;
      console.log(flag);
      console.log("success");
      flagIMG.src = flag;
      return flag;
    } catch (error) {
      console.log(error);
    }
}
getFlag();

const finalScore = document.querySelector("#finalScore");
const displayScore = localStorage.getItem("displayScore");

finalScore.innerText = `Score : ${displayScore}`;

const allBtns = document.querySelectorAll("#btn");
console.log(allBtns);

allBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    let difficulty = this.innerText;
    console.log(difficulty);
    localStorage.setItem("difficulty", this.value);
    return window.location.assign("./quizz.html");
  });
});

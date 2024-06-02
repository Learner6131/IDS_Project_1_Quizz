const question = document.querySelector("#question");
const choices = document.querySelectorAll(".choice-text");
const progressText = document.querySelector("#progressText");
const progressBarFull = document.querySelector("#progressBarFull");
const scoreText = document.querySelector("#score");
const display = document.getElementById("display");
const ol = document.querySelector("ol");

console.log(choices);
console.log(question);

let currentQuestion = [];
let acceptingAns = false;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];

let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

const CORREECT_POINTS = 10;
const MAX_QUESTION = 5;

const categeory = localStorage.getItem("categeory");
const difficulty = localStorage.getItem("difficulty");

let c = 0;

if (categeory == "MATHS") {
  c = 19;
} else if (categeory == "SPORTS") {
  c = 21;
} else if (categeory == "COMPUTERS") {
  c = 18;
} else if (categeory == "HISTORY") {
  c = 23;
} else if (categeory == "ANIMALS") {
  c = 27;
} else if (categeory == "ARTS") {
  c = 25;
}
let URL = `https://opentdb.com/api.php?amount=10&category=${c}&difficulty=${difficulty}&type=multiple`;

let questions = [];

fetch(URL)
  .then((res) => {
    return res.json();
  })
  .then((questionsData) => {
    console.log(questionsData.results);
    questions = questionsData.results.map((questionData) => {
      const displayQuestion = {
        question: questionData.question,
      };

      const answerChoices = [...questionData.incorrect_answers];
      displayQuestion.answer = Math.floor(Math.random() * 3) + 1;
      answerChoices.splice(
        displayQuestion.answer - 1,
        0,
        questionData.correct_answer
      );

      answerChoices.forEach((choice, index) => {
        displayQuestion["choice" + (index + 1)] = choice;
      });
      console.log(displayQuestion);
      return displayQuestion;
    });
    startGame();
  })
  .catch((err) => {
    console.error(err);
  });

function startGame() {
  questionCounter = 0;
  score = 0;
  availableQuestion = [...questions];

  getNewQuestion();
}

function getNewQuestion() {
  if (availableQuestion.length == 0 || questionCounter >= MAX_QUESTION) {
    localStorage.setItem("displayScore", score);
    return window.location.assign("./end.html");
  }
  start();
  questionCounter++;

  //Display the question number
  progressText.innerText = `Question : ${questionCounter} / ${MAX_QUESTION}`;

  //progressBar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTION) * 100}%`;

  const questionIdx = Math.floor(Math.random() * availableQuestion.length);
  currentQuestion = availableQuestion[questionIdx];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestion.splice[(questionIdx, 1)];
  acceptingAns = true;

  choices.forEach((choice) => {
    choice.addEventListener("click", (event) => {
      console.log(event.target);

      if (!acceptingAns) return;

      acceptingAns = false;
      stop();
      const selectedAns = event.target.dataset["number"];

      const applyClass =
        selectedAns == currentQuestion.answer ? "correct" : "incorrect";
      if (applyClass === "correct") {
        incrementScore(CORREECT_POINTS);
      }
      event.target.parentElement.classList.add(applyClass);

      setTimeout(() => {
        event.target.parentElement.classList.remove(applyClass);
        getNewQuestion();
      }, 250);
    });
  });
}

function incrementScore(num) {
  score += num;
  scoreText.innerText = score;
}

function start() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(update, 10);
    isRunning = true;
  }
  console.log(startTime);
}
function stop() {
  if (isRunning) {
    clearInterval(timer);
    elapsedTime = Date.now() - startTime;
    isRunning = false;
  }
  let li = document.createElement("li");
  li.innerText = display.innerText;

  ol.appendChild(li);
  reset();
}

function reset() {
  clearInterval(timer);
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  display.textContent = "00:00:00:00";
}
function update() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;

  let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
  let seconds = Math.floor((elapsedTime / 1000) % 60);
  let milliseconds = Math.floor((elapsedTime % 1000) / 10);

  hours = String(hours).padStart(2, "0");
  minutes = String(minutes).padStart(2, "0");
  seconds = String(seconds).padStart(2, "0");
  milliseconds = String(milliseconds).padStart(2, "0");

  display.innerText = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

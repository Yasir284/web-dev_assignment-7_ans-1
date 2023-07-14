let quizCard = document.querySelector(".quiz-card");
let submitBtn = document.querySelector(".submit");
let nextBtn = document.querySelector(".next");
let select = document.querySelector("select");
let ansStatus = document.querySelector(".ans-status");
let scoreTemplate = document.querySelector(".score-template");
let correctAns = 0;
let questionNo = 0;

let questions = [
  {
    id: 1,
    question: "Which country is known for its tulip fields?",
    options: ["Netherlands", "Italy", "Japan", "Australia"],
    answer: "Netherlands",
    active: true,
  },
  {
    id: 2,
    question: 'Who wrote the novel "Pride and Prejudice"?',
    options: [
      "Jane Austen",
      "Charles Dickens",
      "William Shakespeare",
      "F. Scott Fitzgerald",
    ],
    answer: "Jane Austen",
    active: false,
  },
  {
    id: 3,
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Fe", "Cu"],
    answer: "Au",
    active: false,
  },
];

function setQuestion(questionNo) {
  quizCard.querySelector(".question").innerText =
    questions[questionNo].question;
  select.querySelectorAll("option").forEach((e, i) => {
    if (e.value !== "select") {
      e.value = questions[questionNo].options[i - 1];
      e.innerText = questions[questionNo].options[i - 1];
    }
  });

  select.value = "select";
}
setQuestion(questionNo);

submitBtn.addEventListener("click", function () {
  if (select.value === "select") {
    return alert("Select the answer first");
  }

  let activeQuestion = questions.filter((e) => e.active)[0];

  if (select.value === activeQuestion.answer) {
    correctAns++;
    ansStatus.classList.add("right");
    ansStatus.querySelector("span").innerText = "Correct answer";
  } else if (select.value !== activeQuestion.answer) {
    ansStatus.classList.add("wrong");
    ansStatus.querySelector("span").innerText = "Wrong answer";
  }

  submitBtn.style.display = "none";
  if (questionNo === questions.length - 1) {
    nextBtn.innerText = "Show result";
  }
  nextBtn.style.display = "block";
  select.setAttribute("disabled", true);

  setTimeout(() => {
    if (ansStatus.classList.contains("right")) {
      ansStatus.classList.remove("right");
    }

    if (ansStatus.classList.contains("wrong")) {
      ansStatus.classList.remove("wrong");
    }
  }, 2000);
});

nextBtn.addEventListener("click", function () {
  if (questionNo === questions.length - 1) return showResult();
  questionNo++;
  questions.forEach((e, i) => {
    if (questionNo === i) {
      e.active = true;
      activeQuestion = e;
    } else e.active = false;
  });

  setQuestion(questionNo);

  select.removeAttribute("disabled");
  nextBtn.style.display = "none";
  submitBtn.style.display = "block";
});

function showResult() {
  quizCard.innerHTML = "";

  let div = scoreTemplate.content.cloneNode(true);
  div.querySelector(".right-questions").querySelector("span").innerText =
    correctAns;
  div.querySelector(".wrong-questions").querySelector("span").innerText =
    questions.length - correctAns;

  div.querySelector(".final-result").querySelector("span").innerText =
    correctAns == 0 ? "Failed" : "Pass";

  quizCard.append(div);
}

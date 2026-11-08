
document.addEventListener("DOMContentLoaded", function () {
  const progress = document.getElementById("quizProgress");
  const question = document.getElementById("quizQuestion");
  const answers = document.getElementById("quizAnswers");
  const feedback = document.getElementById("quizFeedback");
  const nextButton = document.getElementById("quizNext");
  const result = document.getElementById("quizResult");
  const scoreText = document.getElementById("quizScore");
  const restartButton = document.getElementById("quizRestart");

  if (!progress || !question || !answers || !feedback ||
      !nextButton || !result || !scoreText || !restartButton) {
    return;
  }

  const questions = [
    {
      question: "What is the name of Coraline's new home?",
      options: [
        "Pink Palace Apartments",
        "Blue Castle",
        "The Other House",
        "Moonlight Mansion"
      ],
      correct: 0
    },
    {
      question: "What does the Other Mother want Coraline to have?",
      options: [
        "Blue hair",
        "Button eyes",
        "A magic key",
        "A new dress"
      ],
      correct: 1
    },
    {
      question: "Which animal can talk in the Other World?",
      options: [
        "A mouse",
        "A dog",
        "A black cat",
        "A bird"
      ],
      correct: 2
    },
    {
      question: "Who is Coraline's neighbor and friend?",
      options: [
        "Wybie Lovat",
        "Mr. Bobinsky",
        "Charlie Jones",
        "The Other Father"
      ],
      correct: 0
    },
    {
      question: "Where are the ghost children trapped?",
      options: [
        "In the garden",
        "Behind the mirror",
        "Inside the kitchen",
        "Under the stairs"
      ],
      correct: 1
    }
  ];

  let currentQuestion = 0;
  let score = 0;
  let answered = false;

  function showQuestion() {
    const current = questions[currentQuestion];

    answered = false;
    progress.hidden = false;
    question.hidden = false;
    answers.hidden = false;
    result.hidden = true;
    nextButton.hidden = true;

    progress.textContent =
      "Question " + (currentQuestion + 1) +
      " of " + questions.length;

    question.textContent = current.question;
    feedback.textContent = "";
    answers.innerHTML = "";

    current.options.forEach(function (option, index) {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "quiz-answer";
      button.textContent = option;

      button.addEventListener("click", function () {
        checkAnswer(index);
      });

      answers.appendChild(button);
    });
  }

  function checkAnswer(selectedIndex) {
    if (answered) return;

    answered = true;

    const correctIndex = questions[currentQuestion].correct;
    const buttons = answers.querySelectorAll(".quiz-answer");

    buttons.forEach(function (button, index) {
      button.disabled = true;

      if (index === correctIndex) {
        button.classList.add("correct");
      }

      if (index === selectedIndex && index !== correctIndex) {
        button.classList.add("incorrect");
      }
    });

    if (selectedIndex === correctIndex) {
      score++;
      feedback.textContent = "Correct! Well done!";
    } else {
      feedback.textContent =
        "Not quite! The correct answer is: " +
        questions[currentQuestion].options[correctIndex];
    }

    nextButton.textContent =
      currentQuestion === questions.length - 1
        ? "See Results"
        : "Next Question";

    nextButton.hidden = false;
  }

  function showResult() {
    progress.hidden = true;
    question.hidden = true;
    answers.hidden = true;
    nextButton.hidden = true;
    feedback.textContent = "";

    result.hidden = false;

    scoreText.textContent =
      "You answered " + score + " out of " +
      questions.length + " questions correctly!";
  }

  nextButton.addEventListener("click", function () {
    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });

  restartButton.addEventListener("click", function () {
    currentQuestion = 0;
    score = 0;
    showQuestion();
  });

  showQuestion();
});

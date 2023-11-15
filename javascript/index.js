const initButton = document.querySelector('.survey-button');
const answerButtons = document.querySelectorAll(".answer-button");
const finalMessage = document.querySelector("#final-message");
const surveyRaz = document.querySelector("#survey-raz");
let score = 0;


surveyRaz.addEventListener("click", (event) => {
  location.reload();
})
// calculate score and display the result
const endSurvey = (score) => {
  console.log(score);
  scoreArray = {
    1: "Débutant. Recommandé : Python Level 1",
    2: "Débutant. Recommandé : Python Level 1",
    3: "Débutant intermédiaire. Recommandé : Python Level 1",
    4: "Intermédiaire. Recommandé : Python Level 2",
    5: "Intermédiaire avancé. Recommandé : Python Level 3",
    6: "Aucune formation supplémentaire n'est nécessaire à ce stade"
  };
  finalMessage.lastElementChild.innerText = scoreArray[score];
  document.querySelectorAll('.question').forEach((question) => {
    question.classList.add('d-none');
  })
  finalMessage.classList.remove("d-none");
  setTimeout(() => finalMessage.classList.add('visible-question'), 10);
}


// Initiate the survey
const initSurvey = (introText) => {
  const firstQuestion = document.querySelector('#survey-first-question');
  introText.classList.add('d-none');
  firstQuestion.classList.remove('d-none');
  setTimeout(() => firstQuestion.classList.add('visible-question'), 10);
}

const continueToNextQuestion = (answerButton) => {
  const currentQuestion = answerButton.parentElement;
  const nextQuestion = currentQuestion.nextElementSibling;

  currentQuestion.classList.remove('visible-question');
  setTimeout(() => {
    currentQuestion.classList.add('d-none');
    if (nextQuestion) {
      nextQuestion.classList.remove('d-none');
      setTimeout(() => nextQuestion.classList.add('visible-question'), 10);
    }
  }, 500); // Attendre la fin de l'animation
}


// Launch the survey by clicking on the introduction button
initButton.addEventListener('click', (event) => {
  initSurvey(event.currentTarget.parentElement);
})

answerButtons.forEach((button) => {
  // Listen to event on each answer for each question
  button.addEventListener('click', (event) => {
    // check if data-value is 1 or 0
    if (event.currentTarget.dataset.value === '1') {
      // if value is 1 go to next question
      score += 1;
      if (event.currentTarget.parentElement.id != "last-question") {
        continueToNextQuestion(event.currentTarget);
      } else {
        event.currentTarget.parentElement.classList.add("d-none");
        endSurvey(score);
      }
    } else {
      // if value is 0 calculate score and display mesage
      event.currentTarget.parentElement.classList.add("d-none");
      endSurvey(score);
    }
  })
})

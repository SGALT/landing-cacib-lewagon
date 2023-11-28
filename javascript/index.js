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
  const scoreArray = {
    1: "<h2>Résultat du quizz: Débutant</h2><h3>Recommandé : Python Level 1</h3><a href='#level-1' id='detailslink' class='btn btn-wagon'>Détails</a>",
    2: "<h2>Résultat du quizz: Débutant</h2><h3>Recommandé : Python Level 1</h3><a href='#level-1' id='detailslink' class='btn btn-wagon'>Détails</a>",
    3: "<h2>Résultat du quizz: Débutant intermédiaire</h2><h3>Recommandé : Python Level 1</h3><a href='#level-1' id='detailslink' class='btn btn-wagon'>Détails</a>",
    4: "<h2>Résultat du quizz : Intermédiaire</h2><h3>Recommandé : Python Level 2</h3><a href='#level-2' id='detailslink' class='btn btn-wagon'>Détails</a>",
    5: "<h2>Résultat du quizz : Intermédiaire avancé</h2><h3>Recommandé : Python Level 3</h3><a href='#level-3' id='detailslink' class='btn btn-wagon'>Détails</a>",
    6: "<h2>Aucune formation supplémentaire n'est nécessaire à ce stade</h2>"
  };
  const scoreArrayEn = {
    1: "<h2> Result of the quizz: Beginner</h2><h3>Recommended: Python Level 1</h3><a href='#level-1' id='detailslink' class='btn btn-wagon'>Details</a>",
    2: "<h2> Result of the quizz: Beginner</h2><h3>Recommended: Python Level 1</h3><a href='#level-1' id='detailslink' class='btn btn-wagon'>Details</a>",
    3: "<h2> Result of the quizz: Moderate Beginner</h2><h3>Recommended: Python Level 1</h3><a href='#level-1' id='detailslink' class='btn btn-wagon'>Details</a>",
    4: "<h2> Result of the quizz: Intermediate</h2><h3>Recommended: Python Level 2</h3><a href='#level-2' id='detailslink' class='btn btn-wagon'>Details</a>",
    5: "<h2> Result of the quizz: Advanced Intermediate</h2><h3>Recommended: Python Level 3</h3><a href='#level-3' id='detailslink' class='btn btn-wagon'>Details</a>",
    6: "<h2>No further training is necessary at this stage</h2>"
  };
  if (finalMessage.dataset.language === "fr") {
    finalMessage.lastElementChild.innerHTML = scoreArray[score];
  } else {
    finalMessage.lastElementChild.innerHTML = scoreArrayEn[score];
  }
  document.querySelectorAll('.question').forEach((question) => {
    question.classList.add('d-none');
  })
  finalMessage.classList.remove("d-none");
  setTimeout(() => finalMessage.classList.add('visible-question'), 10);
  document.getElementById('detailslink').addEventListener('click', (event) => {
    event.preventDefault();
    const modal = document.getElementById("exampleModal");
    const bsModal = bootstrap.Modal.getInstance(modal);
    bsModal.hide();
    setTimeout(() => {
      location.href = document.getElementById('detailslink').href
    }, 500);
  })
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




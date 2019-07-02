'use strict'

/* User story:
This quiz app allows users to take a quiz on a topic about Game of Thrones.
The app starts with an introduction page and by clicking the start button, the user is redirected to the first set of multiple choice questions on the quiz.
If the user gets the selected answer correct, an image will appear with the text: Correct! And a button that directs the user to the next question.
If the user does not get the selected answer correct, the correct answer appears, and a button directs the user to the next question.
Through each question, the user knows which question they are on and what their score is.
Finally, once they are done all 10 questions, a button appears asking them to play again, and it redirects the user to the start of the quiz. */

//console.log(store);


// the first index position of my array store
let questionIndex = 0;
let score = 0;

// this function handles when users click the first start
// button, it directs them to the first set of questions, my HTML form.
function handleStartButton() {
  $('#js-start-button').on('click', event => {
    questionPage(questionIndex);
  });
}

// this function gathers the set of questions and answers from 'store'
// to display once the user clicks start.

function questionPage(questionIndex) {
  const question = store[questionIndex].question;
  const answers = store[questionIndex].answers;
  const userQuestionIndex = questionIndex + 1;
  const formHtml = `
      <form class="quizForm">
        <fieldset>
          <legend>${question}</legend>
          <div class="radiogroup">
            <input class="inputSize" type="radio" name="option" id="gOt" value="${answers[0]}" checked>
            <label for="gOt">${answers[0]}</label>
            <br>
          </div>
          <div class="radiogroup">
            <input type="radio" name="option" id="gOt2" value="${answers[1]}">
            <label for="gOt2">${answers[1]}</label>
            <br>
          </div>
          <div class="radiogroup">
            <input type="radio" name="option" id="gOt3" value="${answers[2]}">
            <label for="gOt3">${answers[2]}</label>
            <br>
          </div>
          <div class="radiogroup">
            <input type="radio" name="option" id="gOt4" value="${answers[3]}">
            <label for="gOt4">${answers[3]}</label>
          </div>
        </fieldset>
        <button class="submitButton" type="submit">Submit</button>
      </form>
      <div class="questionOrder">Question: ${userQuestionIndex} of 10</div>
      <div class="scoreOrder">Score: ${score} out of 10</div>`;
  //console.log(question);
  //console.log(answers);
  $('.container').html(formHtml);
}

// this function handles the submit button, after the user has selected an // answer, if their answer is correct, their score increases and an image
// appears, if their answer is incorrect, their score does not increase
// and a different image appears.

function handleSubmitButton() {
  $('.container').on('submit', '.quizForm', event => {
    event.preventDefault();
    //console.log('Form submitted!')
    const answerSelected = $('input:checked').val();
    const userIsCorrect = checkUserAnswer(answerSelected)
    if (userIsCorrect) {
      score++;
      generateCorrectFeedback();
    } else {
      generateIncorrectFeedback();
    }
    questionIndex++;
  });
}

// this function matches the correct answer to the correctAnswer key in my
// data value 'store'
function checkUserAnswer(answerSelected) {
  if (answerSelected === store[questionIndex].correctAnswer) {
    return true;
  } else {
    return false;
  }
}

function generateCorrectFeedback() {
  const correctFeedback = `
    <main role="main">
      <h2 class="feedbackText correctText">Correct! You got it.</h2>
      <button class="nextButton" type="submit">Next</button>
    </main>`;
  $('.container').html(correctFeedback);
}

function generateIncorrectFeedback() {
  const incorrectFeedback = `
    <main role="main">
      <h2 class="feedbackText incorrectText">Nope! The answer is: ${store[questionIndex].correctAnswer}.</h2>
      <button class="nextButton" type="submit">Next</button>
    </main>`;
  $('.container').html(incorrectFeedback);
}

function handleNextButton() {
  $('.container').on('click', '.nextButton', event => {
    // console.log(questionIndex);
    if (questionIndex < 10) {
      questionPage(questionIndex);
    } else {
      displayResults();
    };
  });
}

function displayResults() {
  const finalResults = `
    <main role="main">
      <h2 class="finalScore">Final score: ${score} out of 10</h2>
      <button class="playAgainButton" type="submit">Play again?</button>
    </main>`
  $('.container').html(finalResults);
}

function handlePlayAgainButton() {
  $('.container').on('click', '.playAgainButton', event => {
    score = 0;
    questionIndex = 0;
    questionPage(questionIndex);
  });
}


// callback function
function createQuiz() {
  handleStartButton();
  handleSubmitButton();
  handleNextButton();
  handlePlayAgainButton();
}

// don't execute until DOM is loaded

$( document ).ready(function() {
  createQuiz();
});
// shortened version: $(createQuiz);

// figure out CSS input buttons

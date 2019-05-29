'use strict';

const quizQuestions = [
  {
    question: 'What’s the name of Arya Stark’s sword?',
    correct: 2,
    answers: ['Longclaw', 'Oathkeeper', 'Needle', 'Ice']
  },
  {
    question: 'What does the word Khaleesi refer to?',
    correct: 1,
    answers: ['One of Daenerys Targaryen’s captured cities', 'A title given to the wife of a Dothraki warlord', 'All Men Must Die', 'The name of the Night King']
  },
  {
    question: 'Who\'s family motto is "Winter is Coming"?',
    correct: 0,
    answers: ['House Stark', 'House  Lannister', 'House Tyrell', 'House Targaryen']
  },
  {
    question: 'Which character besides Jon Snow has also died and been resurrected by a Red Priest?',
    correct: 2,
    answers: ['Gendry Waters', 'The Hound', 'Beric Dondarrion', 'Robb Stark']
  },
  {
    question: 'Arya’s direwolf is named…?',
    correct: 1,
    answers: ['Visenya', 'Nymeria', 'Aemon', 'Viserion']
  },
  {
    question: 'What is The Tyrell ancestral home?',
    correct: 1,
    answers: ['Winterfell', 'Highgarden', 'The Vale', 'Stormlands']
  },
  {
    question: 'What did Tyrion Lannister murder his father, Tywin, with?',
    correct: 1,
    answers: ['A dagger', 'A crossbow', 'Poisoned wine', 'He strangled him with a necklace']
  },
  {
    question: 'Aside from Valyrian Steel, what else can kill White Walkers?',
    correct: 3,
    answers: ['A raven', 'Greyscale', 'Ice', 'Dragonglass']
  },
  {
    question: 'Which king did Jamie Lannister slay to earn his “Kingslayer” nickname?',
    correct: 2,
    answers: ['King Robert Baratheon', 'King Aegon I Targaryen', 'King Aerys II Targaryen', 'King Joffrey Baratheon']
  },
  {
    question: 'Who are Jon Snow\'s Real Parents?',
    correct: 2,
    answers: ['Wylla and Eddard Stark', 'Elia Martell and Viserys Targaryen', 'Lyanna Stark and Rhaegar Targaryen', 'Cersie Lannister and Robert Baratheon']
  },
];

const STORE = {
  view: 'intro',
  questions: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
  currentQuestion: 0,
  correctResponses: 0,
};

/*function shuffle(arr) {
  for (let i = arr.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
  } 

  return arr;
} */

function selectQuestions() {
  let Questions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  //shuffle(randomQuestions);

  let questionArr = Questions.splice(0, 10);

  for (let i = 0; i < questionArr.length; i++) {
    STORE.questions[i] = (quizQuestions[questionArr[i]]);
  }

  STORE.view = 'questions';

  render();
}

function render() {
  if (STORE.view === 'intro') {
    console.log('Intro');

    renderIntro();
  }

  else if (STORE.view === 'questions') {
    console.log('questions');
    renderQuestions();
  }

  else if (STORE.view === 'results') {
    console.log('results');
    renderResults();
  }
}

function renderIntro() {
  $('.js-container').html(`<h1>Game of Thrones Quiz!</h1>
  <p class="intro">Can you achieve the Iron Throne or are you destined to join the Night's Watch along the Wall?
  <br>Click the button to get started. You'll have to answer 10 multiple choice questions, 
  without skipping the tough ones. 
  <br>When you're finished, click the button to move on and see if you got it right. At the end, we'll tell you how well you did.<br><br>Valar Dohaeris!</p>
  <button class="start-quiz" id="start-quiz">START</button>`);
  $('.js-container').on('click', '.start-quiz', function () {
    STORE.view = 'questions';


    selectQuestions();

  });
}

function renderQuestions() {
  $('.js-container').children().remove();

  // let thisQuestions = selectRandomQuestions();
  // console.log(thisQuestions);

  // for (let i = 0; i < thisQuestions.length; i++) {
  //   STORE.questions[i] = (quizQuestions[thisQuestions[i]]);
  // }


  console.log(STORE.questions);

  $('.js-container').html(`
    <p>${STORE.currentQuestion + 1. + ')'} ${STORE.questions[STORE.currentQuestion].question}</p>
    <label class='answer'>
    <input val="0" type="radio" name="choice" required>
    <span>${STORE.questions[STORE.currentQuestion].answers[0]}</span>
    </label>
  <br>
  
    <label class='answer'>
      <input val="1" type="radio" name="choice" required>
      <span>${STORE.questions[STORE.currentQuestion].answers[1]}</span>
    </label>
    <br>
  
    <label class='answer'>
      <input val="2" type="radio" name="choice" required>
      <span>${STORE.questions[STORE.currentQuestion].answers[2]}</span>
    </label>
    <br>
  
    <label class='answer'>
      <input val="3" type="radio" name="choice" required>
      <span>${STORE.questions[STORE.currentQuestion].answers[3]}</span>
    </label>
    <br>
      
    <button type="submit" id="submit" class="js-question-submit" data-popup-open="popup-feedback">Submit</button>`);


}

function handeleSubmit() {
  $('.js-container').on('click', '.js-question-submit', function (event) {
    const userChoice = parseInt($('input[name=choice]:checked').attr('val'));
    console.log(userChoice);
    console.log(typeof (userChoice));
    //Call this function to check if the result is correct, 
    checkAnswer(userChoice);
  });

}

function checkAnswer(choice) {

  let correctAnswerObject = STORE.questions[STORE.currentQuestion];
  console.log(correctAnswerObject);
  let correctAnswer = correctAnswerObject.correct;
  console.log(correctAnswer);
  let feedback = $('.popup');

  if (choice === correctAnswer) {

    STORE.correctResponses++;
    STORE.currentQuestion++;
    $('.popup').addClass('show');
    feedback.find('h2').text('Correct!');
    feedback.find('img').attr('src', 'https://media.giphy.com/media/1tGN00iMCj3Mc/giphy.gif');

  } else if ($('input[name=choice]:checked').length === 0) {

    $('.popup').addClass('show');
    feedback.find('h2').text('MAKE A DECISION');
    feedback.find('img').attr('src', 'https://media.giphy.com/media/TKS2lI2E3z8PscvHs6/giphy.gif');

  } else if (choice !== correctAnswer) {

    STORE.currentQuestion++;
    $('.popup').addClass('show');
    feedback.find('h2').text('Sorry, that wasn\'t correct.');
    feedback.find('img').attr('src', 'https://media.giphy.com/media/KEPQfFa3CtzCE/giphy.gif');

  }


  if (STORE.currentQuestion === STORE.questions.length) {
    STORE.view === 'results';
    renderResults();
  } else {
    renderQuestions();
  }
}

function renderResults() {
  $('.js-container').children().remove();
  $('.js-container').html(`<h2 class="result">Your score: ${STORE.correctResponses} out of ${STORE.questions.length} right</h2>
  <button class="start-over" id="start-over">Start Quiz Over</button>`);

}

function resetQuiz() {
  STORE.currentQuestion = 0;
  STORE.correctResponses = 0;
  STORE.view = 'intro';
  renderIntro();
}

function handleResetQuiz() {
  $('.js-container').on('click', '.start-over', function (event) {
    resetQuiz();
  });
}

function toggleX() {
  $('#x').on('click', '.popup-close', function (event) {
    console.log('toggleX ran');
    $('.popup').removeClass('show')
  });
}

$(function main() {
  render();
  handeleSubmit();
  handleResetQuiz();
  toggleX();
})


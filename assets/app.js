// Element Global Variables
const timer = document.querySelector('#timer');
const mainBox = document.querySelector('#main-box');
const startButton = document.querySelector('#start-button')
const answerButtons = document.querySelector('.custom-button')

// Questions Array
const questions = [
  {
    id: 0,
    question: 'Function and var are known as: ',
    answers: ['Keywords','Data types','Declaration Statements','Prototypes'],
    correctIndex: 2
  },
  {
    id: 1,
    question: 'SECOND QUESTION: ',
    answers: ['Keywords','Data types','Declaration Statements','Prototypes'],
    correctIndex: 2
  }
]

// declare timer and quiz objects.
const timer1 = new Timer(600, timer);
const quiz1 = new Quiz(questions);
// build high scores table
mainBox.appendChild(quiz1.buildHighScores());

// Start Button Click event Listener - clear elements, start timer and build first question
startButton.addEventListener('click', () => {
  mainBox.innerHTML = '';
  startButton.remove();
  timer1.startTimer();
  quiz1.generateQuestion();
})


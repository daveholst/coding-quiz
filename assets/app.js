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
    question: 'Which company developed JavaScript?',
    answers: ['Netscape','Bell Labs','Sun Microsystems','IBM'],
    correctIndex: 0
  },
  {
    id: 2,
    question: 'The _______ method of an Array object adds elements to the end of an array.',
    answers: ['.pop()','.shift()','.push()','.unshift()'],
    correctIndex: 2
  },
  {
    id: 3,
    question: 'What is the correct syntax for referring to an external script called "LFC.js"?',
    answers: ['<script src="LFC.js">','<script source="LFC.js">','<script ref="LFC.js">','<script type="LFC.js">'],
    correctIndex: 0
  },
  {
    id: 4,
    question: 'Inside which HTML element do we put the JavaScript?',
    answers: ['<meta>','<style>','<body>','<script>'],
    correctIndex: 3
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


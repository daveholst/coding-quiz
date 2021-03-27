// Element Variables
const timer = document.querySelector('#timer');
const mainBox = document.querySelector('#main-box');
const startButton = document.querySelector('#start-button')

// shorthand WEBAPI

const questions = [
  {
    id: 0,
    question: 'Function and var are known as: ',
    answers: ['Keywords','Data types','Declaration Statements','Prototypes'],
    correctIndex: 2
  },
  {
    id: 1,
    question: 'Function and var are known as: ',
    answers: ['Keywords','Data types','Declaration Statements','Prototypes'],
    correctIndex: 2
  }
]


// class for timer object - takes time (sec) as argument
class Timer {
  constructor(startValue,target) {
    this.startValue = startValue;
    this.currentVal = startValue;
    this.targetElement = target;
  }
  // method - current Value to string (05:00)
  toString(timerVal = this.currentVal) {
    return new Date(timerVal * 1000).toISOString().substr(14, 5)
  }

  // method - startTimer & update element
  startTimer(interval = 1000) {
      this.targetElement.innerText = this.toString();
    setInterval(() => {
      this.currentVal -= 1;
      let stringTime = this.toString();
      this.targetElement.innerText = stringTime;
      // create event on end

    }, interval);
  }

}

class Score {
  constructor(questions) {
    this.questions = questions;
    this.scoreID = Math.floor(Math.random() * 100000000);
    this.userInputs = [];
  }

  get answersIndex() {

    let answersArray = [];
    this.questions.forEach(question => {
    answersArray.push(question.correctIndex)
    });
    return answersArray;
  }
}


// function to generate question page
function questionPageGenerator(questionInput, score) {
  // deconstruct variable for ease of reading
  const { id, question, answers, correctIndex } = questionInput;
  //create question
  let questionNumElement = document.createElement('h3')
  let questionElement = document.createElement('h4');
  questionNumElement.innerText = `Question ${id + 1}`;
  questionElement.innerText = question;
  mainBox.appendChild(questionNumElement);
  mainBox.appendChild(questionElement);
  //create answer list

  for (let i = 0; i < answers.length; i++) {
    const answer = answers[i];
    newButton = document.createElement('button');
    newButton.classList.add("custom-button");
    newButton.setAttribute('id', `button ${i}`)
    newButton.innerText = answer;
    mainBox.appendChild(newButton);
  }
  // listen for click
  mainBox.addEventListener('click',(event) => {
    buttonIndex = parseInt(event.target.id.slice(-1));
    score.userInputs.push(buttonIndex);
    // console.log(score.userInputs);
  })




}

function startQuiz() {
  //create timer
  const timer1 = new Timer(300, timer);
  const score1 = new Score(questions);
  // const timer1 = new Timer;
  timer1.startTimer();
  // clear out highscore div

  // remove start-button

  // test generator
  questionPageGenerator(questions[0],score1)

}


// TESTING
// timer1.startTimer();
// questionPageGenerator(questions[0]);

// Button Click event Listener
startButton.addEventListener('click', startQuiz)
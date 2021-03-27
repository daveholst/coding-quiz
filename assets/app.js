// Element Variables
const timer = document.querySelector('#timer');
const mainBox = document.querySelector('#main-box');

// shorthand WEBAPI

const questions = {
  question1: {
    id: 1,
    question: 'Function and var are known as: ',
    answers: ['Keywords','Data types','Declaration Statements','Prototypes'],
    correctIndex: 2
  },
  question2: {
    id: 2,
    question: 'Function and var are known as: ',
    answers: ['Keywords','Data types','Declaration Statements','Prototypes'],
    correctIndex: 2
  },
}


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
    setInterval(() => {
      this.currentVal -= 1;
      let stringTime = this.toString();
      this.targetElement.innerText = stringTime;
      // create event on end

    }, interval);
  }

}



// function to generate question page
function questionPageGenerator(questionInput) {
  // deconstruct variable for ease of reading
  const { id, question, answers, correctIndex } = questionInput;
  //create question
  let questionElement = document.createElement('h3');
  questionElement.innerText = question;
  mainBox.appendChild(questionElement);
  //create answer list

  for (let i = 1; i <= answers.length; i++) {
    const answer = answers[i];
    newButton = document.createElement('button')
    newButton.classList.add("custom-button")
  }


}

function startQuiz() {
  //create timer
  const timer = new Timer;
  timer.startTimer();
  // clear out highscore div

  // test generator
  questionPageGenerator(questions.question1)

}


// TESTING
const Timer1 = new Timer(300, timer);
Timer1.startTimer();
questionPageGenerator(questions.question1);


// Element Variables
const timer = document.querySelector('#timer');
const mainBox = document.querySelector('#main-box');
const startButton = document.querySelector('#start-button')
const answerButtons = document.querySelector('.custom-button')

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
    question: 'SECOND QUESTION: ',
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

class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.scoreID = Math.floor(Math.random() * 100000000);
    this.userInputs = [];
    this.currentQuestion = 0;
    this.lastQuestion = questions.length - 1;
  }

  get answersIndex() {

    let answersArray = [];
    this.questions.forEach(question => {
    answersArray.push(question.correctIndex)
    });
    return answersArray;
  }

  generateQuestion(questionNum = this.currentQuestion) {
    const { userInputs } = this;
    const { id, question, answers, correctIndex } = this.questions[questionNum];
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
      let newButton = document.createElement('button');
      newButton.classList.add("custom-button");
      newButton.setAttribute('id', `button-${i}`);
      newButton.innerText = answer;
      mainBox.appendChild(newButton);
    }
    //add listeners on first question
      for (let i = 0; i < answers.length; i++) {
        const button = document.querySelector(`#button-${i}`);

        button.addEventListener('click', (event) => {
          let buttonIndex = parseInt(event.target.id.slice(-1));
          console.log(buttonIndex);
          userInputs.push(buttonIndex);
          // check if incorrect
          if (!this.isCorrect(id, buttonIndex)) {
            timer1.currentVal -= 30;
          }
          console.log(this.isCorrect(id, buttonIndex));
          //check if not last question
          if (this.currentQuestion < this.lastQuestion) {
            this.currentQuestion++;
            mainBox.innerHTML = '';
            this.generateQuestion(this.currentQuestion);
          } else {
            //goto scores page? gen of method
          }
        });
      }


  //   answerButtons.addEventListener('click', (event) => {
  //     let buttonIndex = parseInt(event.target.id.slice(-1));
  //     console.log(buttonIndex);
  //     userInputs.push(buttonIndex);
  //     // check if incorrect
  //     if (!this.isCorrect(id, buttonIndex)) {
  //       timer1.currentVal -= 30;
  //     }
  //     console.log(this.isCorrect(id, buttonIndex));
  //     if (this.currentQuestion < this.lastQuestion) {
  //       this.currentQuestion++;
  //       mainBox.innerHTML = '';
  //       this.generateQuestion(this.currentQuestion);
  //     } else {
  //       //goto scores page? gen of method
  //     }
  //   }, { once: true });
  }

  // is answer correct checker method
  isCorrect(questionIndex, inputIndex) {

    if (this.answersIndex[questionIndex] === inputIndex) {
      return true;
    } else {
      return false;
    }
  }



}




const timer1 = new Timer(300, timer);
const quiz1 = new Quiz(questions);

function startQuiz() {
  //create timer
  // const timer1 = new Timer;
  timer1.startTimer();
  quiz1.generateQuestion();
  // clear out highscore div

  // remove start-button

  // test generator


}


// TESTING
// timer1.startTimer();
// questionPageGenerator(questions[0]);

// Button Click event Listener
startButton.addEventListener('click', () => {
  startButton.remove();
  startQuiz();
})

//Mainbox event listener
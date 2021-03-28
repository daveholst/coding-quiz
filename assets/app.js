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
    this.timerID;
  }
  // method - current Value to string (05:00)
  toString(timerVal = this.currentVal) {
    return new Date(timerVal * 1000).toISOString().substr(14, 5)
  }

  // method - startTimer & update element
  startTimer(interval = 1000) {
      this.targetElement.innerText = this.toString();
    this.timerID = setInterval(() => {
      this.currentVal -= 1;
      let stringTime = this.toString();
      this.targetElement.innerText = stringTime;
      // create event on end

    }, interval);
  }

  stopTimer() {
    clearInterval(this.timerID)

  }

}

// class for quiz - all related functions attached as methods.
class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.scoreID = Math.floor(Math.random() * 100000000);
    this.userInputs = [];
    this.currentQuestion = 0;
    this.lastQuestion = questions.length - 1;
    this.resultsList = [];
    this.totalScore = 0;
    this.userName = 'Anonymous';
  }

  get answersIndex() {

    let aIndex = [];
    this.questions.forEach(question => {
    aIndex.push(question.correctIndex)
    });
    return aIndex;
  }

  get scoresRef() {
    localStorage.getItem('scoresList')
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
            timer1.stopTimer();
            console.log('end');
            this.resultsGenerator();
            this.resultsPageGenerator();
          }
        });
      }
  }

  // is answer correct checker method
  isCorrect(questionIndex, inputIndex) {
    if (this.answersIndex[questionIndex] === inputIndex) {
      return true;
    } else {
      return false;
    }
  }

  //results page generator -- returns results list (got correct? true/false)
  resultsGenerator() {
    const userAnswers = this.userInputs;
    const correctAnswers = this.answersIndex;
    for (let i = 0; i < userAnswers.length; i++) {
      if (userAnswers[i] === correctAnswers[i]) {
        this.resultsList.push(true);
        this.totalScore++;
      } else {
        this.resultsList.push(false);
      }
    }
    return this.resultsList;
  }
  //write results to local storage
  resultsPageGenerator() {
    //remove timer
    timer.remove();
    //clear main-box
    mainBox.innerHTML = '';
    // build and write heading
    let resultsElement = document.createElement('h3');
    resultsElement.innerText = 'Your Results';
    mainBox.appendChild(resultsElement);
    // build and write score
    let scoreElement = document.createElement('h3');
    scoreElement.innerText = `You acheived a score of ${this.totalScore} with ${timer1.toString()} remaining.`;
    mainBox.appendChild(scoreElement);
    // score name saver
    let scoreInput = document.createElement('input');
    scoreInput.setAttribute('type', 'text');
    scoreInput.setAttribute('id', 'score-input');
    scoreInput.setAttribute('placeholder', 'name');
    scoreInput.setAttribute('maxlength', '10');
    mainBox.appendChild(scoreInput);
      //event listener to update obj
    scoreInput.addEventListener('change', () => {
      this.userName = scoreInput.value;
      console.log(this.userName);
    })
    // save button
    let saveButton = document.createElement('button');
    saveButton.innerText = 'Save Result';
    saveButton.setAttribute('id', 'save-button');
    mainBox.appendChild(saveButton);
    saveButton.addEventListener('click', () => {
      this.resultsToLocal();
    }, { once: true });
    // reults tabe heading
    let resultsHeading = document.createElement('h3');
    resultsHeading.innerText = 'Results Breakdown';
    // results table
    for (let i = 0; i < this.resultsList.length; i++) {
      const question = `Q${this.questions[i].id + 1}: ${this.questions[i].question}`;
      const answer = this.questions[i].answers[this.answersIndex[i]];
      const resultHeading = document.createElement('h5')
        resultHeading.innerText = question;
        mainBox.appendChild(resultHeading);
      const result = this.resultsList[i];
      let resultElement = document.createElement('p')
      resultElement.innerText = answer;
      resultElement.setAttribute('class', result ? 'result-true' : 'result-false')
      mainBox.appendChild(resultElement);
    }
    // add try again button
    let tryAgainButton = document.createElement('button');
    tryAgainButton.innerText = 'Try Again';
    tryAgainButton.setAttribute('id', 'try-again-button');
    mainBox.appendChild(tryAgainButton);

  }
  // write results to local storage
  resultsToLocal() {
    // if no local score-ids, create one
    if (!localStorage.getItem('scores-ids')) {
      localStorage.setItem('scores-ids', (JSON.stringify([])))
    }
    // build object to save
    const scoreObject = {
      id: this.scoreID,
      name: this.userName,
      score: this.totalScore,
    }
    // save to local
      //create temp copy
    let tempCopy = JSON.parse(localStorage.getItem('scores-ids'));
      //push in new score object
    tempCopy.push(scoreObject);
      //stringify and send to local
    localStorage.setItem('scores-ids', (JSON.stringify(tempCopy)));
    console.log(localStorage.getItem('scores-ids'));
  }
  // get sorted results in array from local storage
  resultsFromLocal() {
    function sortByScore(a, b) {
      const scoreA = a.score;
      const scoreB = b.score;
      let comparison = 0;
      if (scoreA < scoreB) {
        comparison = 1;
      } else if (scoreA > scoreB) {
        comparison = -1;
      }
      return comparison;
    }
    const unsortedCopy = JSON.parse(localStorage.getItem('scores-ids'));
    return unsortedCopy.sort(sortByScore);
  }


  //build high scores element
  buildHighScores() {
    const scores = this.resultsFromLocal();
    let highScoreElement = document.createElement('div');
    highScoreElement.setAttribute('id', 'high-scores');
    scores.forEach(score => {;
      let scoreElement = document.createElement('h5');
      scoreElement.innerText = `$`
    });
  }

}



// declare timer and quiz objects.
const timer1 = new Timer(300, timer);
const quiz1 = new Quiz(questions);
// build high scores table



// Button Click event Listener
startButton.addEventListener('click', () => {
  startButton.remove();
  timer1.startTimer();
  quiz1.generateQuestion();
})

//Mainbox event listener
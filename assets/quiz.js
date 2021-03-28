// class for quiz generation
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
    //add listeners on questions
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
    highScoreElement.setAttribute('id', 'high-scores-container');
    scores.forEach(score => {;
      let scoreElement = document.createElement('h5');
      scoreElement.setAttribute('class', 'high-score')
      scoreElement.innerText = `${score.name} || ${score.score}pts`
      highScoreElement.appendChild(scoreElement)
    });
    return highScoreElement;
  }

}
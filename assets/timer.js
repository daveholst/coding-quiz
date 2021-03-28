class Timer {
  constructor(startValue,target) {
    this.startValue = startValue;
    this.currentVal = startValue;
    this.targetElement = target;
    this.timerID;
  }
  // current Value to string (05:00)
  toString(timerVal = this.currentVal) {
    if (timerVal >= 0) {
      return new Date(timerVal * 1000).toISOString().substr(14, 5)
    } else {
      return '00:00'
    }
  }
  // startTimer & update element
  startTimer(interval = 1000) {
      this.targetElement.innerText = this.toString();
    this.timerID = setInterval(() => {
      this.currentVal -= 1;
      let stringTime = this.toString();
      this.targetElement.innerText = stringTime;
      // create event on end
      if (this.currentVal <= 0) {
        this.stopTimer();
        quiz1.resultsPageGenerator();
      }
    }, interval);
  }
  // pauseTimer
  stopTimer() {
    clearInterval(this.timerID)
  }

}
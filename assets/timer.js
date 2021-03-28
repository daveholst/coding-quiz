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
var secs;
var timerID = null;
var timerRunning = false;
var delay = 1000;
var timerlbl = document.getElementById("timer-lbl");

function stopClock() {
    if (timerRunning)
        clearTimeout(timerID);
    timerRunning = false;
}

function startTimer() {
    if (secs == 0) {
        stopClock();
        window.location.reload();
    }
    else {
      timerlbl.innerHTML = 'Page reloading in ' + secs + ' ' + owl.pluralize("second", secs);
      secs = secs - 1;
      timerRunning = true;
      timerID = self.setTimeout("startTimer()", delay);
    }
}

function initializeTimer(seconds) {
    secs = seconds;
    stopClock();
    startTimer();
}

initializeTimer(30);

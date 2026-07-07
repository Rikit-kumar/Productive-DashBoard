const timer = document.querySelector('#timer');
const startBtn = document.querySelector('#startBtn');
const pauseBtn = document.querySelector('#pauseBtn');
const resetBtn = document.querySelector('#resetBtn');

const FOCUS_TIME = 25 * 60;

let timeLeft = FOCUS_TIME;
let timerInterval = null;
let isRunning = false;
let currentMode = "focus";

function updateDisplay() {
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    timer.textContent = `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function startTimer(){
    if(isRunning)return;
    isRunning = true;

    timerInterval = setInterval(() => {
        timeLeft--;
        updateDisplay();

        if(timeLeft <=0){
            clearInterval(timerInterval);
            isRunning = false;
            alert("🎉 Pomodoro Completed!");
            resetTimer();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    timeLeft = FOCUS_TIME;
    updateDisplay();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay();
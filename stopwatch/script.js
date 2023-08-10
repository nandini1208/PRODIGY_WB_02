const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapList = document.getElementById('lapList');

let startTime;
let elapsedTime = 0;
let intervalId;

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

function start() {
    if (!intervalId) {
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 10);
        toggleButtons();
    }
}

function pause() {
    clearInterval(intervalId);
    intervalId = null;
    toggleButtons();
}

function reset() {
    clearInterval(intervalId);
    intervalId = null;
    elapsedTime = 0;
    updateTimeDisplay(elapsedTime);
    lapList.innerHTML = '';
    toggleButtons();
}

function lap() {
    if (intervalId) {
        const lapTime = Date.now() - startTime;
        const lapItem = document.createElement('li');
        lapItem.textContent = formatTime(lapTime);
        lapList.appendChild(lapItem);
    }
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    updateTimeDisplay(elapsedTime);
}

function updateTimeDisplay(time) {
    timeDisplay.textContent = formatTime(time);
}

function formatTime(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = (time % 1000).toFixed(0);
    return `${padZero(minutes)}:${padZero(seconds)}:${padZero(milliseconds, 3)}`;
}

function padZero(number, length = 2) {
    return number.toString().padStart(length, '0');
}

function toggleButtons() {
    startButton.disabled = intervalId !== null;
    pauseButton.disabled = intervalId === null;
    resetButton.disabled = intervalId !== null;
    lapButton.disabled = intervalId === null;
}

// Initialize the app by disabling appropriate buttons
toggleButtons();

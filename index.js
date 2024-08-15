let [minutes, seconds, milliseconds] = [0, 0, 0];
let display = document.getElementById('display');
let timer = null;
let isRunning = false;
const lapsContainer = document.getElementById('laps');
const bg = document.getElementsByClassName('outer-circle');

function updateDisplay() {
    let m = minutes < 10 ? '0' + minutes : minutes;
    let s = seconds < 10 ? '0' + seconds : seconds;
    let ms = milliseconds < 10 ? '0' + milliseconds : milliseconds < 100 ? '0' + milliseconds : milliseconds;
    display.innerHTML = `${m}:${s}:${ms}`;
    bg.classList.add("animation-bg")
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    timer = setInterval(() => {
        milliseconds += 10;
        if (milliseconds === 1000) {
            milliseconds = 0;
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
        }
        updateDisplay();
    }, 10);
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    [minutes, seconds, milliseconds] = [0, 0, 0];
    updateDisplay();
    lapsContainer.innerHTML = '';  
}

function recordLap() {
    if (!isRunning) return;  
    const lapTime = document.createElement('div');
    lapTime.className = 'lap-time';
    lapTime.innerText = `${lapsContainer.children.length + 1}  ${display.innerHTML}`;
    lapsContainer.appendChild(lapTime);
}

function clearLaps() {
    lapsContainer.innerHTML = '';
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);
document.getElementById('clear-laps').addEventListener('click', clearLaps);

const clock = document.getElementById("clock");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const resetBtn = document.getElementById("reset-btn");

let minutes = 0;
let seconds = 0;
let hours = 0;

function stopwatch() {
    seconds += 1;
    
    if (seconds === 60) {
        minutes += 1;
        seconds = 0;
    }

    if (minutes === 60) {
        hours += 1;
        minutes = 0;
    }

    if (hours !== 0) {
        clock.textContent = hours + "h " + 
                            minutes + "min " + 
                            seconds + "s";
    } else if (minutes !== 0) {
        clock.textContent = minutes + "min " +
                            seconds + "s ";
    } else {
        clock.textContent = seconds + "s ";
    }

}

let interval = null;

startBtn.addEventListener("click", () => {
    if (interval) {
        return;
    }

    interval = setInterval(stopwatch, 1000);
});

stopBtn.addEventListener("click", () => {
    if (!interval) {
        return;
    }

    clearInterval(interval);
    interval = null;
});

resetBtn.addEventListener("click", () => {
    clearInterval(interval);
    interval = null;

    clock.textContent = "0s";
    seconds = 0;
    minutes = 0;
    hours = 0;
});

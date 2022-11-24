const lapBtn = document.querySelector(".lap");
const resetBtn = document.querySelector(".reset");
const startBtn = document.querySelector(".start");
const stopBtn = document.querySelector(".stop");
const resumeBtn = document.querySelector(".resume");

const lapsElement = document.querySelector(".laps ol");

const minElement = document.querySelector(".min");
const secElement = document.querySelector(".sec");
const milisecElement = document.querySelector(".milisec");

let min = 00;
let sec = 00;
let milisec = 00;

let isStarted = false;

const startTimer = () => {
    if(!isStarted) {
        isStarted = true;
        interval = setInterval(() => {
            milisec ++;
            if (milisec >= 99) {
                sec ++;
                milisec = 00;
            }
            if (sec >= 60) {
                min ++;
                sec = 00;
            }

            milisecElement.innerHTML = milisec.valueOf() > 9 ? milisec : '0' + milisec;
            secElement.innerHTML = sec.valueOf() > 9 ? sec : '0' + sec;
            minElement.innerHTML = min.valueOf() > 9 ? min : '0' + min;
        }, 10)

        startBtn.classList.add("disable");
        stopBtn.classList.remove("disable");
        lapBtn.classList.remove("initial-lap")
    }
}

const stopTimer = () => {
    if(isStarted) {
        isStarted = false;
        clearInterval(interval)

        stopBtn.classList.add("disable");
        lapBtn.classList.add("disable");
        resumeBtn.classList.remove("disable");
        resetBtn.classList.remove("disable");
    }

}

const resumeTimer = () => {
    if (!isStarted) {
        startTimer()

        resumeBtn.classList.add("disable");
        resetBtn.classList.add("disable");
        startBtn.classList.add("disable");
        stopBtn.classList.remove("disable");
        lapBtn.classList.remove("disable");
    }
}

const resetTimer = () => {
    if(!isStarted) {
        min = 00;
        sec = 00;
        milisec = 00;

        milisecElement.innerHTML = "00";
        secElement.innerHTML = "00";
        minElement.innerHTML = "00";

        lapsElement.innerHTML = "";

        resumeBtn.classList.add("disable");
        resetBtn.classList.add("disable");
        lapBtn.classList.add("initial-lap");
        startBtn.classList.remove("disable");
        lapBtn.classList.remove("disable");
    }
}

const lapTimer = () => {
    if (isStarted) {
        const milisecLap = milisecElement.innerHTML;
        const secLap = secElement.innerHTML;
        const minLap = minElement.innerHTML;

        let liElement = document.createElement("li");
        liElement.innerHTML = minLap + ":" + secLap + "." + milisecLap;

        lapsElement.appendChild(liElement);
    }
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resumeBtn.addEventListener("click", resumeTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", lapTimer);
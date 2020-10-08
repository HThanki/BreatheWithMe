const goButton = document.getElementById('go');
const nameTextField = document.getElementById('name');
const startAgainButton = document.getElementById('startAgain');
const playPauseButton = document.getElementById('playPause');

const duration1radio = document.getElementById('duration1');
const duration2radio = document.getElementById('duration2');
const duration3radio = document.getElementById('duration3');


let totalBreathingSeconds = 30;
let intervalHandle = null;
const page1Div = document.getElementById('page1');
const page2Div = document.getElementById('page2');
const page3Div = document.getElementById('page3');

const page3UserName = document.getElementById('page3Name');

const breathPhase = document.getElementById('breathingPhase');
const breathCount = document.getElementById('breathingCount');
const timeRemainingElement = document.getElementById('timeRemaining');

const breathingPhases = ['Inhale','HoldIn','Exhale', 'HoldOut'];


let currentBreathingPhase = 0;
let currentBreathingCount = 5;

function updatePage2() {
    
    if (currentBreathingCount <= 1) {
        currentBreathingCount = 5;
        currentBreathingPhase = (currentBreathingPhase + 1) % 4;
    }
    currentBreathingCount = currentBreathingCount -1;

    breathPhase.innerHTML = breathingPhases[currentBreathingPhase];
    breathCount.innerHTML = `${currentBreathingCount}`;

    totalBreathingSeconds = totalBreathingSeconds - 1;

    if (totalBreathingSeconds <=0) {
        clearInterval(intervalHandle);
        intervalHandle = null;
        page2Div.style.display = 'none';
        page3Div.style.display = 'block';
    };

    const minutesRemaining = Math.floor(totalBreathingSeconds/60);
    let secondsRemaining = totalBreathingSeconds % 60;

    if (secondsRemaining < 10) {
        secondsRemaining = `0${secondsRemaining}`;        
    }

    timeRemainingElement.innerHTML = `Time Remaining: ${minutesRemaining}:${secondsRemaining}`;
};

function onGoButtonClick() {
    page3UserName.innerHTML = nameTextField.value;
    if (duration1radio.checked){
        totalBreathingSeconds = parseInt(duration1radio.value)
    } else if (duration2radio.checked){
        totalBreathingSeconds = parseInt(duration2radio.value)
    } else if (duration3radio.checked){
        totalBreathingSeconds = parseInt(duration3radio.value)
    } else {
        totalBreathingSeconds = 60;
    }

    page1Div.style.display = 'none';
    page2Div.style.display = 'block';
    intervalHandle = setInterval(updatePage2, 1000);
};

function onStartAgain() {
    page3Div.style.display = 'none';
    page1Div.style.display = 'block';
}

function onPlayPauseClicked() {
    if (intervalHandle !== null) { //playing
        clearInterval(intervalHandle);
        intervalHandle = null;
    } else {
        intervalHandle = setInterval(updatePage2, 1000);
    }
};

goButton.addEventListener("click", onGoButtonClick);
startAgainButton.addEventListener("click", onStartAgain);
playPauseButton.addEventListener("click", onPlayPauseClicked);
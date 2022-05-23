const buttonPlay = document.querySelector('.play')
const buttonPause = document.querySelector('.pause')
const buttonStop = document.querySelector('.stop')
const buttonPlus = document.querySelector('.increase')
const buttonMinus = document.querySelector('.decrease')
const modeRain = document.querySelector('.rain')
const modeForest = document.querySelector('.forest')
const modeCafeteria = document.querySelector('.cafeteria')
const modeCampfire = document.querySelector('.campfire')
const minutesDisplay = document.querySelector('.minutes')
let secondsDisplay = document.querySelector('.seconds')
const soundForest = new Audio ('./Sounds/Floresta.wav')
const soundRain = new Audio ('./Sounds/Chuva.wav')
const soundCafeteria = new Audio ('./Sounds/Cafeteria.wav')
const soundCampfire = new Audio ('./Sounds/Lareira.wav')
let soundOn = soundRain

function selectMode (mode, sound) {
    let modeCheck = mode.classList.contains('on')
    if (modeCheck) {
        mode.classList.remove('on')
        soundOn.pause()
        return
    }

    modeRain.classList.remove('on')
    modeForest.classList.remove('on')
    modeCafeteria.classList.remove('on')
    modeCampfire.classList.remove('on')
    mode.classList.add('on')

    soundOn.pause()
    soundOn = sound
    soundOn.play()
    soundOn.loop = true
}

function countdown () {
    timerTimeout = setTimeout(function () {
        let minutes = Number(minutesDisplay.textContent)
        let seconds = Number(secondsDisplay.textContent)

        if (seconds <= 0 && minutes <= 0) {
            seconds = 00
            minutes = 25
            minutesDisplay.textContent = String(minutes).padStart(2, "0")
            secondsDisplay.textContent = String(seconds).padStart(2, "0")
            buttonPlay.classList.remove('hide')
            buttonPause.classList.add('hide')
            return
        }
        
        if (seconds <= 0) {
            seconds = 60
            --minutes
        }


        secondsDisplay.textContent = String(seconds - 1).padStart(2, "0")
        minutesDisplay.textContent = String(minutes).padStart(2, "0")

        countdown()
    }, 1000)
}

function reset () {
    buttonPlay.classList.remove('hide')
    buttonPause.classList.add('hide')
    clearTimeout(timerTimeout)
    minutesDisplay.textContent = '25'
    secondsDisplay.textContent = '00'
}

buttonPlay.addEventListener('click', function() {
    buttonPlay.classList.add('hide')
    buttonPause.classList.remove('hide')
    countdown()
})

buttonPause.addEventListener('click', function() {
    buttonPlay.classList.remove('hide')
    buttonPause.classList.add('hide')
    clearTimeout(timerTimeout)
})

buttonStop.addEventListener('click', function() {
    reset()
})

buttonPlus.addEventListener('click', function() {
    let minutes = minutesDisplay.textContent
    minutesDisplay.textContent = Number(minutes) + 5
})

buttonMinus.addEventListener('click', function() {
    let minutes = minutesDisplay.textContent
    if (minutes < 5) {
        reset()
    }
    else {
        minutesDisplay.textContent = Number(minutes) - 5
    }
})

modeRain.addEventListener('click', function() {
    selectMode(modeRain, soundRain)
})

modeForest.addEventListener('click', function() {
    selectMode(modeForest, soundForest)
})

modeCafeteria.addEventListener('click', function() {
    selectMode(modeCafeteria, soundCafeteria)
})

modeCampfire.addEventListener('click', function() {
    selectMode(modeCampfire, soundCampfire)
})
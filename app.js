const breakLength = document.getElementById('break-length')
const sessionLength = document.getElementById('session-length')
const breakIncrement = document.getElementById('break-increment')
const breakDecrement = document.getElementById('break-decrement')
const sessionIncrement = document.getElementById('session-increment')
const sessionDecrement = document.getElementById('session-decrement')
const sessionTimeLeft = document.getElementById('time-left')
const playPause = document.getElementById('start_stop')
const resetButton = document.getElementById('reset')
const timerMinutes = document.getElementById('timer-minutes')
const timerSeconds = document.getElementById('timer-seconds')
const timerLabel = document.getElementById('timer-label')
const beep = document.getElementById('beep')

let isSession = true
let isBreak = false
breakDatum = 5 * 60
sessionDatum = 25 * 60

let stopButton = false

class Clock {
    constructor(breakLength, sessionLength) {
        this.breakLength = breakLength
        this.sessionLength = sessionLength
    }

    increaseBreakLength() {
        if(breakDatum == 3600) return
        breakDatum += 60
        breakLength.textContent = breakDatum / 60
    }

    decreaseBreakLength() {
        if(breakDatum == 60) return
        breakDatum -= 60
        breakLength.textContent = breakDatum / 60
        
    }

    increaseSessionLength() {
        if(sessionDatum == 3600) return
        sessionDatum += 60
        sessionLength.textContent = sessionDatum / 60
        if(timerMinutes.textContent < 9) {
            timerMinutes.textContent = '0' + Math.floor(sessionDatum / 60)
        } else {
            timerMinutes.textContent = Math.floor(sessionDatum / 60)
        } 
        timerSeconds.textContent = sessionDatum % 60 + '0'
    }

    decreaseSessionLength() {
        if(sessionDatum == 60) return
        sessionDatum -= 60
        sessionLength.textContent = sessionDatum / 60
        if(timerMinutes.textContent < 11) {
            timerMinutes.textContent = '0' + Math.floor(sessionDatum / 60)
        } else {
            timerMinutes.textContent = Math.floor(sessionDatum / 60)
        }
        timerSeconds.textContent = sessionDatum % 60 + '0'
    }

    updateSessionTimer() {
        if(timerMinutes.textContent < 11) {
            timerMinutes.textContent = '0' + Math.floor(sessionDatum / 60)
        } else {
            timerMinutes.textContent = Math.floor(sessionDatum / 60)
        }
        if(timerSeconds.textContent < 11 && timerSeconds.textContent > 0) {
            timerSeconds.textContent = '0' + sessionDatum % 60
        } else if(sessionDatum % 60 == 0) {
            timerSeconds.textContent = '00'
        } else {
            timerSeconds.textContent = sessionDatum % 60
        }
    }

    updateBreakTimer() {
        if(timerMinutes.textContent < 11) {
            timerMinutes.textContent = '0' + Math.floor(breakDatum / 60)
        } else {
            timerMinutes.textContent = Math.floor(breakDatum / 60)
        }
        console.log(breakDatum)
        if(timerSeconds.textContent < 11 && timerSeconds.textContent > 0) {
            timerSeconds.textContent = '0' + breakDatum % 60
        } else if(breakDatum % 60 == 0) {
            timerSeconds.textContent = '00'
        } else {
            timerSeconds.textContent = breakDatum % 60
        }
    }

    startStop() {
        stopButton = !stopButton
        let timer =  setInterval(() => {
            if(stopButton && isSession && sessionDatum > 0){
                timerLabel.textContent = 'Session'
                sessionDatum -= 1
                this.updateSessionTimer()
            } else if(sessionDatum == 0) {
                beep.play()
                sessionDatum = sessionLength.textContent * 60
                timerLabel.textContent = 'Break'
                this.updateBreakTimer()
                isSession = false
                isBreak = true
                clearInterval(timer)
                stopButton = !stopButton
                this.startStop()
            } else if (stopButton && isBreak && breakDatum > 0) {
                breakDatum -= 1
                this.updateBreakTimer()
                console.log(timerSeconds.textContent)
            } else if(breakDatum == 0) {
                beep.play()
                breakDatum = breakLength.textContent * 60
                timerLabel.textContent = 'Session'
                this.updateSessionTimer()
                isSession = true
                isBreak = false
                clearInterval(timer)
                stopButton = !stopButton
                this.startStop()
            } else if (stopButton == false) {
                clearInterval(timer)
            }
        }, 1000); 
    }
   
    reset() {
        stopButton = true
        isSession = true
        isBreak = false
        beep.load()
        timerLabel.textContent = 'Session'
        this.startStop()
        sessionLength.textContent = 25
        timerMinutes.textContent = 25
        timerSeconds.textContent = '00'
        breakLength.textContent = 5
        sessionDatum = 1500
        breakDatum = 300
    }
}


const clock = new Clock(breakLength, sessionLength)


breakIncrement.addEventListener('click', () => {
    clock.increaseBreakLength()
})

breakDecrement.addEventListener('click', () => {
    clock.decreaseBreakLength()
})

sessionIncrement.addEventListener('click', () => {
    clock.increaseSessionLength()
})

sessionDecrement.addEventListener('click', () => {
    clock.decreaseSessionLength()
})

playPause.addEventListener('click', () => {
    clock.startStop()
})

resetButton.addEventListener('click', () => {
    clock.reset()
})

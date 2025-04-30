const squares = document.querySelectorAll('.square');
const score = document.querySelector('#score');
const timeLeft = document.querySelector('#time-left');
const difficultySelect = document.querySelector('#difficulty');

let result = 0;
let currentTime = 60;
let hitPosition;
let timerId;
let countdownTimerId;
let difficulty = 'easy';
let baseInterval = 1000;

function randomSquare() {
    squares.forEach((square) => {
        square.classList.remove('emoji');
    });

    let randomSquare = squares[Math.floor(Math.random() * squares.length)];
    randomSquare.classList.add('emoji');
    hitPosition = randomSquare.id;
}

function moveEmoji(interval) {
    clearInterval(timerId);
    timerId = setInterval(randomSquare, interval);
}

function countdown() {
    currentTime--;
    timeLeft.textContent = currentTime;

    if (difficulty === 'hard') {
        const dynamicInterval = Math.max(100, 1000 - (60 - currentTime) * 14); // 60 - currentTime = secondi trascorsi
        moveEmoji(dynamicInterval);
    }

    if (currentTime === 0) {
        clearInterval(timerId);
        clearInterval(countdownTimerId);
        alert('Game Over! Your score is ' + result);
    }
}

squares.forEach((square) => {
    square.addEventListener('mousedown', () => {
        if (square.id === hitPosition) {
            result++;
            score.textContent = result;
            hitPosition = null;
        }
    });
});

difficultySelect.addEventListener('change', () => {
    difficulty = difficultySelect.value;
});

function startGame() {
    result = 0;
    currentTime = 60;
    score.textContent = result;
    timeLeft.textContent = currentTime;

    if (difficulty === 'easy') baseInterval = 1000;
    else if (difficulty === 'medium') baseInterval = 500;
    else if (difficulty === 'hard') baseInterval = 1000;

    moveEmoji(baseInterval);
    countdownTimerId = setInterval(countdown, 1000);
}

// Avvia il gioco dopo una piccola attesa per permettere la selezione della difficoltà
setTimeout(startGame, 1000);

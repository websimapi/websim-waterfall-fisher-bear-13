export function bindUI() {
    const startScreen = document.getElementById('start-screen');
    const gameOverScreen = document.getElementById('game-over-screen');
    const scoreContainer = document.getElementById('score-container');
    const streakContainer = document.getElementById('streak-container');
    const scoreEl = document.getElementById('score');
    const streakEl = document.getElementById('streak');
    const finalScoreEl = document.getElementById('final-score');
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');

    startButton.addEventListener('click', () => {
        startScreen.classList.add('hidden');
        gameOverScreen.classList.add('hidden');
        scoreContainer.classList.remove('hidden');
        streakContainer.classList.remove('hidden');
    });

    restartButton.addEventListener('click', () => {
        startScreen.classList.add('hidden');
        gameOverScreen.classList.add('hidden');
        scoreContainer.classList.remove('hidden');
        streakContainer.classList.remove('hidden');
    });

    return { startScreen, gameOverScreen, scoreContainer, streakContainer, scoreEl, streakEl, finalScoreEl, startButton, restartButton };
}

export function updateUIValues({ score, streak }) {
    if (typeof score === 'number') document.getElementById('score').innerText = score;
    if (typeof streak === 'number') document.getElementById('streak').innerText = `x${streak}`;
}

export function showHUD() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('game-over-screen').classList.add('hidden');
    document.getElementById('score-container').classList.remove('hidden');
    document.getElementById('streak-container').classList.remove('hidden');
}

export function showGameOver() {
    document.getElementById('game-over-screen').classList.remove('hidden');
    document.getElementById('score-container').classList.add('hidden');
    document.getElementById('streak-container').classList.add('hidden');
}

export function showStart() {
    document.getElementById('start-screen').classList.remove('hidden');
}


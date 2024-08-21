//your JS code here. If required.



const submitBtn = document.getElementById('submit');
const board = document.getElementById('board');
const messageDiv = document.getElementById('message');
const cells = document.querySelectorAll('.cell');

let player1Name = '';
let player2Name = '';
let currentPlayer = '';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
let currentPlayerSymbol = 'X';

submitBtn.addEventListener('click', () => {
    player1Name = document.getElementById('player-1').value;
    player2Name = document.getElementById('player-2').value;
    if (player1Name === '' || player2Name === '') {
        alert('Please enter names for both players');
        return;
    }

    currentPlayer = player1Name;
    board.style.display = 'block';
    document.querySelector('.player-form').style.display = 'none';
    updateMessage();
});

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.id) - 1;

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayerSymbol;
    clickedCell.textContent = currentPlayerSymbol;
    clickedCell.classList.add('disabled');

    if (checkWinner()) {
        gameActive = false;
        updateMessage(true);
        return;
    }

    if (isDraw()) {
        gameActive = false;
        messageDiv.textContent = "It's a draw!";
        return;
    }

    switchPlayer();
    updateMessage();
}

function switchPlayer() {
    currentPlayer = (currentPlayer === player1Name) ? player2Name : player1Name;
    currentPlayerSymbol = (currentPlayerSymbol === 'X') ? 'O' : 'X';
}

function updateMessage(isWinner = false) {
    if (isWinner) {
        messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
    } else {
        messageDiv.textContent = `${currentPlayer}, you're up!`;
    }
}

function checkWinner() {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return true;
        }
    }
    return false;
}

function isDraw() {
    return gameState.every(cell => cell !== '');
}

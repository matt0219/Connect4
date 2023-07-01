$(document).ready(function() {
const rows = 6
const cols = 7
const player1 = 'red';
const player2 = 'yellow';
let currentPlayer = player1;
let board = [];

// Create the game board
for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
        board[i][j] = null;
    }
}
// Function to handle when a cell is clicked
function dropPiece(col) {
    for (let row = rows - 1; row >= 0; row--) {
        if (board[row][col] === null) {
            board[row][col] = currentPlayer;
            const cell = $('.row').eq(row).children().eq(col);
            cell.css('background-color', currentPlayer);
            if (checkWin(row, col)) {
                alert('Player ${currentPlayer} wins!');
                resetGame();
            } else if (checkDraw()) {
                alert("It's a draw!");
                resetGame()
            } else {
                currentPlayer = currentPlayer === player1 ? player2 : player1;
            }
            break;
            }

        }
    }

    // Function to check for a win
    function checkWin(row, col) {
        const directions = [
            [-1, 0], // Up
            [1, 0], // Down
            [0, -1], // Left 
            [0, 1], // Right
            [-1, -1], // Up-Left
            [-1, 1], // Up-Right
            [1, -1], // Down-Left
            [1, 1], // Down-Right 
        ];

        for (let i = 0; i < directions.length; i++) {
            let count = 1;
            const dx = directions[i][0];
            const dy = directions[i][1];

            // Check in both directions
            for (let j = 1; j <= 3; j++) {
                const newRow = row + j * dx;
                const newCol = col + j * dy;
                if (
                    newRow < 0 ||
                    newRow >= rows ||
                    newCol < 0 ||
                    newCol >= cols ||
                    board[newRow][newCol] !== currentPlayer
                ) {
                    break;
                }
                count++;
            }

            if ( count === 4) {
                return true;
            }
        }

        return false;
    }

    // Function to check for a draw
    function checkDraw() {
        for (let i = 0; i < cols; i++) {
            if (board[0][i] === null) {
                return false;
            }
        }
        return true;
    }

    // Function to reset the game
    function resetGame() {
        board = [];
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < cols; j++) {
                board[i][j] = null;
            }
        }
        $('.cell').css('background-color', 'white');
        currentPlayer = player1;
    }

    // Event Listener for cell click
    $('.cell').on('click', function () {
        const col = $(this).index();
        dropPiece(col);
    });
});
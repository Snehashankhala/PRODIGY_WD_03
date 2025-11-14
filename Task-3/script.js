const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const restartBtn = document.getElementById("restartBtn");

let circleTurn;

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startGame();

restartBtn.addEventListener("click", startGame);

function startGame() {
    circleTurn = false;

    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove("x");
        cell.classList.remove("circle");
        cell.addEventListener("click", handleClick, { once: true });
    });
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? "O" : "X";

    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        setTimeout(() => alert(`${currentClass} Wins!`), 100);
        endGame();
    } else if (isDraw()) {
        setTimeout(() => alert("Draw!"), 100);
        endGame();
    } else {
        swapTurns();
    }
}

function placeMark(cell, currentClass) {
    cell.innerText = currentClass;
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combo => {
        return combo.every(index => {
            return cells[index].innerText === currentClass;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.innerText === "X" || cell.innerText === "O";
    });
}

function endGame() {
    cells.forEach(cell => {
        cell.removeEventListener("click", handleClick);
    });
}

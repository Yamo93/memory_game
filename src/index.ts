import { words } from "./words.js";

// create a board with random data
const BOARD_WIDTH = 4;
const BOARD_HEIGHT = 4;

if (BOARD_WIDTH % 2 === 1 && BOARD_HEIGHT % 2 === 1) {
    throw new Error("Odd width and height, invalid board size");
}

const board: string[][] = [];
const randomWords: string[] = [];
for (let i = 0; i < (BOARD_WIDTH * BOARD_HEIGHT) / 2; i++) {
    const word = words[Math.floor(Math.random() * words.length)];
    randomWords.push(word, word);
}

for (let i = randomWords.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements at i and j
    [randomWords[i], randomWords[j]] = [randomWords[j], randomWords[i]];
}

for (let i = 0; i < BOARD_HEIGHT; i++) {
    const row: string[] = [];
    board.push(row);
    for (let j = 0; j < BOARD_WIDTH; j++) {
        const randomWord = randomWords.pop();
        if (randomWord) {
            row.push(randomWord);
        }
    }
}

console.log(board);
render(board);

// create a player state

// render board

// add event listeners

function render(board: string[][]): void {
    const boardEl = document.createElement("div");
    boardEl.setAttribute("id", "board");

    for (let i = 0; i < board.length; i++) {
        const row = board[i];
        const rowEl = document.createElement("div");
        rowEl.setAttribute("id", "row-" + i);
        rowEl.classList.add("row");
        for (let j = 0; j < row.length; j++) {
            const word = row[j];
            const wordWrapper = document.createElement("div");
            wordWrapper.classList.add("word-wrapper");
            const wordEl = document.createElement("p");
            wordWrapper.appendChild(wordEl);
            wordEl.textContent = word;
            wordEl.style.visibility = "hidden";
            wordEl.classList.add("word");
            rowEl.appendChild(wordWrapper);
        }
        boardEl.appendChild(rowEl);
    }

    document.body.appendChild(boardEl);
}
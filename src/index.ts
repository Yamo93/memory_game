import { words } from "./words.js";

// create a board with random data
const BOARD_WIDTH = 4;
const BOARD_HEIGHT = 4;

const playerPosition: [number, number] = [-1, -1];
const foundWords: Set<string> = new Set();

if (BOARD_WIDTH % 2 === 1 && BOARD_HEIGHT % 2 === 1) {
    throw new Error("Odd width and height, invalid board size");
}

const board: string[][] = [];
const randomWords: string[] = [];
for (let i = 0; i < (BOARD_WIDTH * BOARD_HEIGHT) / 2; i++) {
    const word = words[Math.floor(Math.random() * words.length)];
    randomWords.push(word, word);
}

// shuffle array
for (let i = randomWords.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

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

render(board);

function render(board: string[][]): void {
    document.body.innerHTML = "";

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
            wordWrapper.addEventListener("click", () => {
                const child = wordWrapper.firstElementChild;
                if (!child || !(child instanceof HTMLElement)) throw new Error("Child is missing or not an element");
                
                
                if (playerPosition[0] < 0 && playerPosition[1] < 0) {
                    playerPosition[0] = i;
                    playerPosition[1] = j;
                    hideAllWords();
                } else if (board[playerPosition[0]][playerPosition[1]] === word) {
                    // store found word
                    foundWords.add(word);
                    
                    // clear state
                    playerPosition[0] = -1;
                    playerPosition[1] = -1;
                } else if (playerPosition[0] === i && playerPosition[1] === j) {
                    // do nothing, invalid
                } else {
                    // clear state
                    playerPosition[0] = -1;
                    playerPosition[1] = -1;
                }
                child.style.visibility = "visible";
                evaluateWin();
            });

            wordWrapper.classList.add("word-wrapper");
            const wordEl = document.createElement("p");
            wordWrapper.appendChild(wordEl);
            wordEl.textContent = word;
            if (!foundWords.has(word)) wordEl.style.visibility = "hidden";
            wordEl.classList.add("word");
            rowEl.appendChild(wordWrapper);
        }
        boardEl.appendChild(rowEl);
    }

    document.body.appendChild(boardEl);
}

function hideAllWords(): void {
    document.querySelectorAll(".word").forEach(wordEl => {
        if (wordEl instanceof HTMLElement) {
            const text = wordEl.textContent;
            if (text && !foundWords.has(text)) {
                wordEl.style.visibility = "hidden";
            }
        }
    })
}

function evaluateWin(): void {
    console.log(foundWords);
}
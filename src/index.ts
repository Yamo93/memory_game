import { words } from "./words.js";

// create a board with random data
const BOARD_WIDTH = 6;
const BOARD_HEIGHT = 6;

if (BOARD_HEIGHT % 2 === 1 && BOARD_WIDTH % 2 === 1) {
    throw new Error("Odd width and height, invalid board size");
}

const board: string[][] = [];
for (let i = 0; i < BOARD_HEIGHT; i++) {
    const row: string[] = [];
    for (let j = 0; j < BOARD_WIDTH; j++) {
        const word = words[Math.floor(Math.random() * words.length - 1)];
        if (word) {
            // push doesnt work, allocate this to two random available places
            row.push(word);
        }
    }
    board.push(row);
}

console.log(board);

// populate words and randomize them

// create a player state

// render board

// add event listeners
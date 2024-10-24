import { words } from "./words.js";

// create a board with random data
const BOARD_WIDTH = 6;
const BOARD_HEIGHT = 6;

if (BOARD_WIDTH % 2 === 1 && BOARD_HEIGHT % 2 === 1) {
    throw new Error("Odd width and height, invalid board size");
}

const board: string[][] = [];
const randomWords: string[] = [];
for (let i = 0; i < (BOARD_WIDTH * BOARD_HEIGHT) / 2; i++) {
    const word = words[Math.floor(Math.random() * words.length)];
    randomWords.push(word, word);
}



console.log(randomWords);

console.log(board);

// populate words and randomize them

// create a player state

// render board

// add event listeners
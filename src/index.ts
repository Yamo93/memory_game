// create a board with random data
const BOARD_WIDTH = 7;
const BOARD_HEIGHT = 7;
const board: string[][] = [];
for (let i = 0; i < BOARD_HEIGHT; i++) {
    const row: string[] = [];
    for (let j = 0; j < BOARD_WIDTH; j++) {
        const word = "abc";
        row.push(word);
    }
    board.push(row);
}

console.log(board);

// populate words and randomize them

// create a player state

// render board

// add event listeners
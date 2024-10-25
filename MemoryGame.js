import { words } from "./words.js";
export class MemoryGame {
    constructor() {
        this.BOARD_WIDTH = 4;
        this.BOARD_HEIGHT = 4;
        this.NO_OF_WORDS = (this.BOARD_WIDTH * this.BOARD_HEIGHT) / 2;
        this.playerPosition = [-1, -1];
        this.foundWords = new Set();
        this._board = [];
        this.randomWords = [];
        if (this.BOARD_WIDTH % 2 === 1 && this.BOARD_HEIGHT % 2 === 1) {
            throw new Error("Odd width and height, invalid board size");
        }
    }
    board() {
        return this._board;
    }
    generateBoard() {
        this.clearBoard();
        this.generateRandomWords();
        this.shuffleRandomWords();
        this.populateBoardWithRandomWords();
    }
    populateBoardWithRandomWords() {
        for (let i = 0; i < this.BOARD_HEIGHT; i++) {
            const row = [];
            this._board.push(row);
            for (let j = 0; j < this.BOARD_WIDTH; j++) {
                const randomWord = this.randomWords.pop();
                if (randomWord) {
                    row.push(randomWord);
                }
            }
        }
    }
    shuffleRandomWords() {
        for (let i = this.randomWords.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.randomWords[i], this.randomWords[j]] = [this.randomWords[j], this.randomWords[i]];
        }
    }
    generateRandomWords() {
        for (let i = 0; i < this.NO_OF_WORDS; i++) {
            let word = words[Math.floor(Math.random() * words.length)];
            while (this.randomWords.includes(word)) {
                word = words[Math.floor(Math.random() * words.length)];
            }
            this.randomWords.push(word, word);
        }
    }
    clearBoard() {
        this._board.length = 0;
    }
    clear() {
        this.foundWords.clear();
        this.playerPosition[0] = -1;
        this.playerPosition[1] = -1;
    }
    playerWins() {
        return this.foundWords.size === this.NO_OF_WORDS;
    }
    updatePlayerPosition(word, { i, j }) {
        const samePositionSelected = this.playerPosition[0] === i && this.playerPosition[1] === j;
        const wordIsMatching = !samePositionSelected && this.isWordSelected() && this._board[this.playerPosition[0]][this.playerPosition[1]] === word;
        if (!this.isWordSelected()) {
            this.playerPosition[0] = i;
            this.playerPosition[1] = j;
        }
        else if (wordIsMatching) {
            // store found word
            this.foundWords.add(word);
            // clear state
            this.playerPosition[0] = -1;
            this.playerPosition[1] = -1;
        }
        else if (samePositionSelected) {
            // do nothing, invalid
        }
        else {
            // clear state
            this.playerPosition[0] = -1;
            this.playerPosition[1] = -1;
        }
    }
    isWordSelected() {
        return this.playerPosition[0] >= 0 && this.playerPosition[1] >= 0;
    }
    hasFoundWord(word) {
        return this.foundWords.has(word);
    }
}
//# sourceMappingURL=MemoryGame.js.map
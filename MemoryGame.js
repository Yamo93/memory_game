import { words } from "./words.js";
export class MemoryGame {
    ;
    constructor(boardWidth = 4, boardHeight = 4) {
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.playerPosition = [-1, -1];
        this.foundWords = new Set();
        this._board = [];
        this.randomWords = [];
        if (this.boardWidth % 2 === 1 && this.boardHeight % 2 === 1) {
            throw new Error("Odd width and height, invalid board size");
        }
        this.wordCount = (this.boardWidth * this.boardHeight) / 2;
    }
    get board() {
        return this._board;
    }
    generateBoard() {
        this.clearBoard();
        this.generateRandomWords();
        this.shuffleRandomWords();
        this.populateBoardWithRandomWords();
    }
    populateBoardWithRandomWords() {
        for (let i = 0; i < this.boardHeight; i++) {
            const row = [];
            this._board.push(row);
            for (let j = 0; j < this.boardWidth; j++) {
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
        for (let i = 0; i < this.wordCount; i++) {
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
        this.clearPlayerPosition();
    }
    playerWins() {
        return this.foundWords.size === this.wordCount;
    }
    updatePlayerPosition(word, { i, j }) {
        if (!this.isWordSelected()) {
            this.playerPosition[0] = i;
            this.playerPosition[1] = j;
            return;
        }
        if (this.isSameWordSelected(i, j)) {
            return;
        }
        if (this.isWordMatching(word)) {
            this.foundWords.add(word);
        }
        this.clearPlayerPosition();
    }
    clearPlayerPosition() {
        this.playerPosition[0] = -1;
        this.playerPosition[1] = -1;
    }
    isWordSelected() {
        return this.playerPosition[0] >= 0 && this.playerPosition[1] >= 0;
    }
    hasFoundWord(word) {
        return this.foundWords.has(word);
    }
    isSameWordSelected(i, j) {
        if (!this.isWordSelected()) {
            return false;
        }
        return this.playerPosition[0] === i && this.playerPosition[1] === j;
    }
    isWordMatching(word) {
        if (!this.isWordSelected()) {
            return false;
        }
        return this._board[this.playerPosition[0]][this.playerPosition[1]] === word;
    }
}
//# sourceMappingURL=MemoryGame.js.map
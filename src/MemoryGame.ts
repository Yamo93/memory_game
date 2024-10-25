import { words } from "./words";

export class MemoryGame {
    private readonly wordCount: number;;
    private readonly playerPosition: [number, number] = [-1, -1];
    private readonly foundWords: Set<string> = new Set();
    private readonly _board: string[][] = [];
    private readonly randomWords: string[] = [];

    constructor(readonly boardWidth = 4, readonly boardHeight = 4) {
        if (this.boardWidth % 2 === 1 && this.boardHeight % 2 === 1) {
            throw new Error("Odd width and height, invalid board size");
        }

        this.wordCount = (this.boardWidth * this.boardHeight) / 2;
    }

    get board(): ReadonlyArray<string[]> {
        return this._board;
    }

    generateBoard(): void {
        this.clearBoard();
        this.generateRandomWords();
        this.shuffleRandomWords();
        this.populateBoardWithRandomWords();
    }

    private populateBoardWithRandomWords(): void {
        for (let i = 0; i < this.boardHeight; i++) {
            const row: string[] = [];
            this._board.push(row);
            for (let j = 0; j < this.boardWidth; j++) {
                const randomWord = this.randomWords.pop();
                if (randomWord) {
                    row.push(randomWord);
                }
            }
        }
    }

    private shuffleRandomWords(): void {
        for (let i = this.randomWords.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.randomWords[i], this.randomWords[j]] = [this.randomWords[j], this.randomWords[i]];
        }
    }

    private generateRandomWords(): void {
        for (let i = 0; i < this.wordCount; i++) {
            let word = words[Math.floor(Math.random() * words.length)];
            while (this.randomWords.includes(word)) {
                word = words[Math.floor(Math.random() * words.length)];
            }
            this.randomWords.push(word, word);
        }
    }

    private clearBoard(): void {
        this._board.length = 0;
    }

    clear(): void {
        this.foundWords.clear();
        this.clearPlayerPosition();
    }

    playerWins(): boolean {
        return this.foundWords.size === this.wordCount;
    }

    updatePlayerPosition(word: string, { i, j }: { i: number, j: number }): void {
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

    private clearPlayerPosition(): void {
        this.playerPosition[0] = -1;
        this.playerPosition[1] = -1;
    }

    isWordSelected(): boolean {
        return this.playerPosition[0] >= 0 && this.playerPosition[1] >= 0;
    }

    hasFoundWord(word: string): boolean {
        return this.foundWords.has(word);
    }

    private isSameWordSelected(i: number, j: number): boolean {
        if (!this.isWordSelected()) {
            return false;
        }

        return this.playerPosition[0] === i && this.playerPosition[1] === j;
    }

    private isWordMatching(word: string): boolean {
        if (!this.isWordSelected()) {
            return false;
        }

        return this._board[this.playerPosition[0]][this.playerPosition[1]] === word;
    }
}
import { words } from "./words";

export class MemoryGame {
    private readonly BOARD_WIDTH = 4;
    private readonly BOARD_HEIGHT = 4;
    private readonly NO_OF_WORDS = (this.BOARD_WIDTH * this.BOARD_HEIGHT) / 2;
    private readonly playerPosition: [number, number] = [-1, -1];
    private readonly foundWords: Set<string> = new Set();
    private readonly _board: string[][] = [];
    private readonly randomWords: string[] = [];

    constructor() {
        if (this.BOARD_WIDTH % 2 === 1 && this.BOARD_HEIGHT % 2 === 1) {
            throw new Error("Odd width and height, invalid board size");
        }
    }

    board(): ReadonlyArray<string[]> {
        return this._board;
    }

    generateBoard(): void {
        this.clearBoard();
        this.generateRandomWords();
        this.shuffleRandomWords();
        this.populateBoardWithRandomWords();
    }

    private populateBoardWithRandomWords(): void {
        for (let i = 0; i < this.BOARD_HEIGHT; i++) {
            const row: string[] = [];
            this._board.push(row);
            for (let j = 0; j < this.BOARD_WIDTH; j++) {
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
        for (let i = 0; i < this.NO_OF_WORDS; i++) {
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
        this.playerPosition[0] = -1;
        this.playerPosition[1] = -1;
    }

    playerWins(): boolean {
        return this.foundWords.size === this.NO_OF_WORDS;
    }

    updatePlayerPosition(word: string, { i, j }: { i: number, j: number }): void {
        const samePositionSelected = this.playerPosition[0] === i && this.playerPosition[1] === j;
        const wordIsMatching = !samePositionSelected && this.isWordSelected() && this._board[this.playerPosition[0]][this.playerPosition[1]] === word;
        if (!this.isWordSelected()) {
            this.playerPosition[0] = i;
            this.playerPosition[1] = j;
        } else if (wordIsMatching) {
            // store found word
            this.foundWords.add(word);

            // clear state
            this.playerPosition[0] = -1;
            this.playerPosition[1] = -1;
        } else if (samePositionSelected) {
            // do nothing, invalid
        } else {
            // clear state
            this.playerPosition[0] = -1;
            this.playerPosition[1] = -1;
        }
    }

    isWordSelected(): boolean {
        return this.playerPosition[0] >= 0 && this.playerPosition[1] >= 0;
    }

    hasFoundWord(word: string): boolean {
        return this.foundWords.has(word);
    }
}
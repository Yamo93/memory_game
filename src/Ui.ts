import { MemoryGame } from "./MemoryGame";

export class Ui {
    constructor(readonly memoryGame: MemoryGame) {}

    render(): void {
        document.body.innerHTML = "";

        const boardEl = document.createElement("div");
        boardEl.setAttribute("id", "board");

        for (let i = 0; i < this.memoryGame.board().length; i++) {
            const row = this.memoryGame.board()[i];
            const rowEl = document.createElement("div");
            rowEl.classList.add("row");
            for (let j = 0; j < row.length; j++) {
                const word = row[j];
                const wordWrapper = document.createElement("div");
                wordWrapper.addEventListener("click", () => this.onWordClick(word, { i, j }, wordWrapper));

                wordWrapper.classList.add("word-wrapper");
                const wordEl = document.createElement("p");
                wordWrapper.appendChild(wordEl);
                wordEl.textContent = word;
                if (!this.memoryGame.hasFoundWord(word)) {
                    wordEl.style.visibility = "hidden";
                }
                wordEl.classList.add("word");
                rowEl.appendChild(wordWrapper);
            }
            boardEl.appendChild(rowEl);
        }

        const restartButtonEl = document.createElement("button");
        restartButtonEl.textContent = "Restart";
        restartButtonEl.addEventListener("click", () => {
            this.memoryGame.clear();
            this.hideAllWords();
            this.memoryGame.generateBoard();
            this.render();
        });
        document.body.appendChild(boardEl);
        document.body.appendChild(restartButtonEl);
    }

    private hideAllWords(): void {
        document.querySelectorAll(".word").forEach(wordEl => {
            if (wordEl instanceof HTMLElement) {
                const text = wordEl.textContent;
                if (text && !this.memoryGame.hasFoundWord(text)) {
                    wordEl.style.visibility = "hidden";
                }
            }
        })
    }

    private showWinMessage(): void {
        const winMessageEl = document.createElement("p");
        winMessageEl.classList.add("message");
        winMessageEl.textContent = "Congratulations, you won!";
        document.body.appendChild(winMessageEl);
    }

    private onWordClick(word: string, { i, j }: { i: number; j: number; }, wordWrapper: HTMLDivElement): void {
        if (this.memoryGame.playerWins()) {
            return;
        }
    
        this.memoryGame.update(word, { i, j });
    
        if (this.memoryGame.isWordSelected()) {
            this.hideAllWords();
        }
    
        const child = wordWrapper.firstElementChild;
        if (!child || !(child instanceof HTMLElement)) {
            throw new Error("Child is missing or not an element");
        }
    
        child.style.visibility = "visible";
    
        if (this.memoryGame.playerWins()) {
            this.showWinMessage();
        }
    }
}
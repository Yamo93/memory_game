import { MemoryGame } from "./MemoryGame";
import { words } from "./words"; // Assuming words is a list of strings

describe("MemoryGame", () => {
    test("should initialize with a valid board size", () => {
        const game = new MemoryGame();
        expect(game.board).toHaveLength(0); // Board should be empty initially
    });

    test("should throw error for invalid board size", () => {
        const invalidGame = () => new MemoryGame(3, 3); // Example with invalid dimensions
        expect(invalidGame).toThrow("Odd width and height, invalid board size");
    });

    test("should generate a board with random words", () => {
        const game = new MemoryGame();
        game.generateBoard();
        expect(game.board).toHaveLength(4);
        expect(game.board[0]).toHaveLength(4);
        expect(new Set(game.board.flat()).size).toBeLessThanOrEqual(words.length);
    });

    test("should contain pairs of words", () => {
        const game = new MemoryGame();
        game.generateBoard();
        const flatBoard = game.board.flat();
        const wordCount: { [key: string]: number } = {};

        flatBoard.forEach((word) => {
            wordCount[word] = (wordCount[word] || 0) + 1;
        });

        Object.values(wordCount).forEach((count) => {
            expect(count).toBeLessThanOrEqual(2);
        });
    });

    test("should update player position correctly", () => {
        const game = new MemoryGame();
        game.generateBoard();
        const wordAtPosition = game.board[0][0];
        game.updatePlayerPosition(wordAtPosition, { i: 0, j: 0 });
        expect(game.playerWins()).toBe(false);
    });

    test("should add found words to foundWords set", () => {
        const game = new MemoryGame();
        game.generateBoard();
        const wordAtPosition = game.board[0][0];
        game.updatePlayerPosition(wordAtPosition, { i: 0, j: 0 }); // First selection
        game.updatePlayerPosition(wordAtPosition, { i: 0, j: 1 }); // Second selection
        expect(game.hasFoundWord(wordAtPosition)).toBe(true);
    });

    test("should not allow selecting the same word twice", () => {
        const game = new MemoryGame();
        game.generateBoard();
        const wordAtPosition = game.board[0][0];
        game.updatePlayerPosition(wordAtPosition, { i: 0, j: 0 }); // First selection
        game.updatePlayerPosition(wordAtPosition, { i: 0, j: 0 }); // Second selection (same)
        expect(game.hasFoundWord(wordAtPosition)).toBe(false); // Should not be found
    });

    test("should clear the board correctly", () => {
        const game = new MemoryGame();
        game.generateBoard();
        game.clear();
        expect(game.playerWins()).toBe(false);
    });
});

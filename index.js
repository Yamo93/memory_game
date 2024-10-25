import { MemoryGame } from "./MemoryGame.js";
import { Ui } from "./Ui.js";
const memoryGame = new MemoryGame();
const ui = new Ui(memoryGame);
memoryGame.generateBoard();
ui.render();
//# sourceMappingURL=index.js.map
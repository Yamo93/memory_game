
import { MemoryGame } from "./MemoryGame";
import { Ui } from "./Ui";

const memoryGame = new MemoryGame();
const ui = new Ui(memoryGame);
memoryGame.generateBoard();
ui.render();

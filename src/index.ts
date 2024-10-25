
import { MemoryGame } from "./MemoryGame";
import { Ui } from "./Ui";

const memoryGame = new MemoryGame(4, 4);
const ui = new Ui(memoryGame);
memoryGame.generateBoard();
ui.render();

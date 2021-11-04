import "./console.style.css";

import Queue from "queue-fifo";
import PreGameConsole from "./pre-game-console/pre-game-console.component";
import GameConsole from "./game-console/game-console";

export interface consoleProps {
  isSelected: boolean;
  isConfirmed: boolean;
  setIsConfirmed: Function;
  setIsSelected: Function;
  movesQueueSt: Queue<string>;
  setMovesQueueSt: Function;
  setMovesQueueStSize: Function;
  setBotHp: Function;
  setPlayerHp: Function;
  playerHp: number;
  botHp: number;
  setShowComboScreen: Function;
}

function Console({
  isSelected,
  setIsConfirmed,
  isConfirmed,
  setIsSelected,
  movesQueueSt,
  setMovesQueueSt,
  setMovesQueueStSize,
  setBotHp,
  setPlayerHp,
  playerHp,
  botHp,
  setShowComboScreen,
}: consoleProps) {
  return (
    <section className="console">
      {!isConfirmed ? (
        <PreGameConsole
          isSelected={isSelected}
          setIsConfirmed={setIsConfirmed}
          setIsSelected={setIsSelected}
        ></PreGameConsole>
      ) : (
        <GameConsole
          movesQueueSt={movesQueueSt}
          setMovesQueueSt={setMovesQueueSt}
          setMovesQueueStSize={setMovesQueueStSize}
          setBotHp={setBotHp}
          setPlayerHp={setPlayerHp}
          botHp={botHp}
          playerHp={playerHp}
          setShowComboScreen={setShowComboScreen}
        ></GameConsole>
      )}
    </section>
  );
}

export default Console;

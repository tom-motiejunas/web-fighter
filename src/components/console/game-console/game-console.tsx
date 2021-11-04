import { useRef, useState, useContext } from "react";
import { userSettingsContext } from "../../../contexts/userSettings.context";

import { MoveLogic } from "../../../gameLogic";

import Queue from "queue-fifo";

interface Props {
  movesQueueSt: Queue<string>;
  setMovesQueueSt: Function;
  setMovesQueueStSize: Function;
  setBotHp: Function;
  setPlayerHp: Function;
  playerHp: number;
  botHp: number;
  setShowComboScreen: Function;
}

interface moveMapInterface {
  [key: number]: string;
}

interface outcomeInterface {
  whoWon: number;
  amount: number;
  newQueue: Queue<string>;
}

export default function GameConsole({
  movesQueueSt,
  setMovesQueueSt,
  setMovesQueueStSize,
  setBotHp,
  setPlayerHp,
  playerHp,
  botHp,
  setShowComboScreen,
}: Props) {
  let settings = useContext(userSettingsContext);

  const selectionRef = useRef<HTMLInputElement>(null);

  const [playerMove, setPlayerMove] = useState("");
  const [botMove, setBotMove] = useState("");
  const [roundOutcome, setRoundOutcome] = useState("");

  function endRound() {
    setTimeout(() => {
      if (!selectionRef.current) return;
      setPlayerMove("");
      selectionRef.current.value = "";
      selectionRef.current.disabled = false;
    }, Number(settings?.timeBetweenRounds[0]));
  }

  function randomBotMove(playerSelectedMove: string) {
    const moveMap: moveMapInterface = {
      0: "f",
      1: "c",
      2: "i",
    };
    const randomMove = moveMap[Math.floor(Math.random() * 3)];

    setBotMove(randomMove);
    movesQueueSt.enqueue(randomMove);

    setMovesQueueSt(movesQueueSt);
    setMovesQueueStSize(movesQueueSt.size());

    setPlayerMove(playerSelectedMove);
    if (!settings) return;

    let outcome: outcomeInterface = MoveLogic(
      playerSelectedMove,
      randomMove,
      movesQueueSt,
      Number(settings.attackDmg[0]),
      Number(settings.comboDmg[0]),
      setShowComboScreen
    );

    if (outcome.whoWon === 0) {
      setRoundOutcome("Round ended in a draw");
    } else if (outcome.whoWon === 1) {
      setRoundOutcome("You win this round");
      setBotHp(botHp - outcome.amount);
    } else {
      setRoundOutcome("You lost this round");
      setPlayerHp(playerHp - outcome.amount);
    }
    endRound();
  }

  function checkGameInput(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    if (!selectionRef.current) return;
    let playerSelectedMove = "";
    switch (selectionRef.current.value) {
      case "f":
        playerSelectedMove = "f";
        break;
      case "c":
        playerSelectedMove = "c";
        break;
      case "i":
        playerSelectedMove = "i";
        break;
      case "x":
        window.close();
        open(`${location}`, "_self")?.close();
      default:
        endRound();
        return;
    }
    selectionRef.current.disabled = true;
    movesQueueSt.enqueue(playerSelectedMove);
    setMovesQueueSt(movesQueueSt);
    randomBotMove(playerSelectedMove);
  }

  return (
    <div>
      <p>1st Player Turn</p>
      <br />
      <div className="input">
        <p>What's Your Move{">"}</p>
        <input
          type="text"
          name="inputChoice"
          onKeyPress={(e) => checkGameInput(e)}
          ref={selectionRef}
          autoFocus
        />
      </div>
      {playerMove ? (
        <div>
          <br />
          <p>
            Bot Move{">"}
            {botMove}
          </p>
          <br />
          <p>{roundOutcome}</p>
        </div>
      ) : null}
    </div>
  );
}

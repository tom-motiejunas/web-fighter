import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./back-to-menu.style.css";

import Queue from "queue-fifo";
import { useContext } from "react";
import { userSettingsContext } from "../../contexts/userSettings.context";

interface Props {
  movesQueueSt: Queue<string>;
  setMovesQueueSt: Function;
  setMovesQueueStSize: Function;
  setPlayerHp: Function;
  setBotHp: Function;
  setIsSelected: Function;
  setIsConfirmed: Function;
}

export default function BackToMenu({
  movesQueueSt,
  setMovesQueueSt,
  setMovesQueueStSize,
  setPlayerHp,
  setBotHp,
  setIsSelected,
  setIsConfirmed,
}: Props) {
  const settings = useContext(userSettingsContext);

  function restartGame() {
    movesQueueSt.clear();
    setMovesQueueSt(movesQueueSt);
    setMovesQueueStSize(0);
    setPlayerHp(settings?.maxHp[0]);
    setBotHp(settings?.maxHp[0]);
  }

  function backToMenu() {
    restartGame();
    setIsSelected(false);
    setIsConfirmed(false);
  }

  return (
    <button className="back-to-menu" onClick={backToMenu}>
      <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
    </button>
  );
}

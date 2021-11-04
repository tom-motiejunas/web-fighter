import "./gameOverScreen.style.css";

import Trophy from "../../assets/trophy.svg";
import Garbage from "../../assets/garbage.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";

import { userSettingsContext } from "../../contexts/userSettings.context";
import Queue from "queue-fifo";

interface Props {
  movesQueueSt: Queue<string>;
  setMovesQueueSt: Function;
  setMovesQueueStSize: Function;
  setPlayerHp: Function;
  setBotHp: Function;
  setIsSelected: Function;
  setIsConfirmed: Function;
  playerHp: Number;
}

function GameOverScreen({
  movesQueueSt,
  setMovesQueueSt,
  setMovesQueueStSize,
  playerHp,
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
    <section className="game-over-box">
      <div className="bg">
        <div>
          {playerHp <= 0 ? (
            <div className="outcome">
              <span>
                <img src={Garbage} alt="garbage-img" />
              </span>
              <h2>You Lost</h2>
            </div>
          ) : (
            <div className="outcome">
              <span>
                <img src={Trophy} alt="trophy-img" />
              </span>
              <h2>You Won!</h2>
            </div>
          )}

          <div className="choices">
            <button onClick={restartGame}>
              <FontAwesomeIcon
                icon={faRedo}
                className="fa-2x"
              ></FontAwesomeIcon>
            </button>
            <button onClick={backToMenu}>
              <FontAwesomeIcon
                icon={faUsers}
                className="fa-2x"
              ></FontAwesomeIcon>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GameOverScreen;

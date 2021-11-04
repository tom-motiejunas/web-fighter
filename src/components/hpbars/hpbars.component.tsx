import { useEffect, useRef, useContext } from "react";
import "./hpbars.style.css";

import { userSettingsContext } from "../../contexts/userSettings.context";

interface Props {
  playerHp: number;
  botHp: number;
}

function HPBars({ playerHp, botHp }: Props) {
  const settings = useContext(userSettingsContext);

  const playerHpRef = useRef<HTMLDivElement>(null);
  const botHpRef = useRef<HTMLDivElement>(null);

  let fullPlayerHp = Number(settings?.maxHp[0]),
    fullBotHp = Number(settings?.maxHp[0]);

  function changeHp(
    divRef: React.RefObject<HTMLDivElement>,
    fullHp: number,
    currHp: number
  ) {
    if (!divRef.current) return;
    let hpPerc = (100 * currHp) / fullHp;
    if (hpPerc < 0) {
      hpPerc = 0;
    }
    divRef.current.style.width = `${hpPerc}%`;
  }

  // When player hp changes
  useEffect(() => {
    changeHp(playerHpRef, fullPlayerHp, playerHp);
  }, [playerHp]);

  // When bot hp changes
  useEffect(() => {
    changeHp(botHpRef, fullBotHp, botHp);
  }, [botHp]);

  return (
    <nav className="hp-boxes">
      <div>
        <h2>Name</h2>
        <li>
          <div className="hp" ref={playerHpRef}></div>
        </li>
      </div>
      <div>
        <h2>Name</h2>
        <li>
          <div className="hp" ref={botHpRef}></div>
        </li>
      </div>
    </nav>
  );
}

export default HPBars;

import "./fighters.style.css";

import BotFighter from "../../assets/fighter-sprites/bot-sprite.svg";

interface Props {
  hoverCharacter: string;
}

function Fighters({ hoverCharacter }: Props) {
  return (
    <div className="fighter-box">
      <img src={hoverCharacter} alt="player-fighter-img" />
      <img src={BotFighter} alt="bot-fighter-img" />
    </div>
  );
}

export default Fighters;

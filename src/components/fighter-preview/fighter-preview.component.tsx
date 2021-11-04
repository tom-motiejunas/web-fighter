import "./fighter-preview.style.css";

interface Props {
  hoverCharacter: hoverCharacterInterface;
  isSelected: boolean;
}

interface hoverCharacterInterface {
  sprite: string;
  fighterName: string;
}

import botFighter from "../../assets/fighter-sprites/bot-sprite.svg";
import { useEffect, useRef } from "react";

function FighterPreview({ hoverCharacter, isSelected }: Props) {
  const fighterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSelected) {
      fighterRef.current?.classList.remove("selected");
      fighterRef.current?.classList.add("confirmed");
    } else {
      fighterRef.current?.classList.add("selected");
      fighterRef.current?.classList.remove("confirmed");
    }
  }, [isSelected]);

  return (
    <section className="fighter-container">
      <div className="first-fighter selected" ref={fighterRef}>
        <h2>{hoverCharacter.fighterName}</h2>
        <img src={hoverCharacter.sprite} alt="first-fighter-img" />
        <h2>Player 1</h2>
      </div>
      <div className="second-fighter confirmed">
        <h2>C++</h2>
        <img src={botFighter} alt="second-fighter-img" />
        <h2>BOT</h2>
      </div>
    </section>
  );
}

export default FighterPreview;

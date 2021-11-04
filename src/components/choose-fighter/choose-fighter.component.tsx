import "./choose-fighter.style.css";

import JSLogo from "../../assets/fighter-logos/js-logo.svg";
import PythonLogo from "../../assets/fighter-logos/python-logo.svg";
import JavaLogo from "../../assets/fighter-logos/java-logo.svg";
import ScratchLogo from "../../assets/fighter-logos/scratch-logo.png";
import CSharpLogo from "../../assets/fighter-logos/CSharp-logo.svg";

import jsFighter from "../../assets/fighter-sprites/js-sprite.png";
import javaFighter from "../../assets/fighter-sprites/java-sprite.png";
import cSharpFighter from "../../assets/fighter-sprites/csharp-sprite.png";
import scratchFighter from "../../assets/fighter-sprites/scratch-sprite.png";
import pythonFighter from "../../assets/fighter-sprites/python-sprite.png";
import { useEffect } from "react";

interface Props {
  setHoverCharacter: Function;
  setIsSelected: Function;
  isSelected: boolean;
}

function ChooseFighter({
  setHoverCharacter,
  setIsSelected,
  isSelected,
}: Props) {
  const fighterObject = {
    sprite: "",
    fighterName: "",
  };

  function changeHoverCharacter(character: string, characterName: string) {
    if (isSelected) return;
    fighterObject.sprite = character;
    fighterObject.fighterName = characterName;
    setHoverCharacter(fighterObject);
  }

  function makeSelection() {
    setIsSelected(true);
  }

  useEffect(() => {
    const allIcons = document.querySelectorAll(".fighter-list > li > img");
    if (isSelected) {
      allIcons.forEach((el) => el.classList.add("no-hover"));
    } else {
      allIcons.forEach((el) => el.classList.remove("no-hover"));
    }
  }, [isSelected]);

  return (
    <ul className="fighter-list">
      <li>
        <img
          src={JSLogo}
          alt="fighter-img"
          onMouseEnter={() => changeHoverCharacter(jsFighter, "JavaScript")}
          onClick={makeSelection}
        />
      </li>
      <li>
        <img
          src={PythonLogo}
          alt="fighter-img"
          onMouseEnter={() => changeHoverCharacter(pythonFighter, "Python")}
          onClick={makeSelection}
        />
      </li>
      <li>
        <img
          src={JavaLogo}
          alt="fighter-img"
          onMouseEnter={() => changeHoverCharacter(javaFighter, "Java")}
          onClick={makeSelection}
        />
      </li>
      <li>
        <img
          src={ScratchLogo}
          alt="fighter-img"
          onMouseEnter={() => changeHoverCharacter(scratchFighter, "Scratch")}
          onClick={makeSelection}
        />
      </li>
      <li>
        <img
          src={CSharpLogo}
          alt="fighter-img"
          onMouseEnter={() => changeHoverCharacter(cSharpFighter, "C#")}
          onClick={makeSelection}
        />
      </li>
    </ul>
  );
}

export default ChooseFighter;

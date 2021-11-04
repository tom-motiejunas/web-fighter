import "./help-screen.style.css";

import helpImg from "../../../assets/game-system.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

interface Props {
  setShowHelp: Function;
}

export default function HelpScreen({ setShowHelp }: Props) {
  const exitBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="help-bg">
      <div className="help-screen">
        <button
          className="exit-btn"
          onClick={() => setShowHelp(false)}
          ref={exitBtnRef}
        >
          <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
        </button>
        <img src={helpImg} alt="help-img" />
      </div>
    </div>
  );
}

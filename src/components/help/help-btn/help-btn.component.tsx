import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./help-btn.style.css";

interface Props {
  setShowHelp: Function;
}

export default function HelpButton({ setShowHelp }: Props) {
  return (
    <button className="help-btn" onClick={() => setShowHelp(true)}>
      <FontAwesomeIcon icon={faBook}></FontAwesomeIcon>
    </button>
  );
}

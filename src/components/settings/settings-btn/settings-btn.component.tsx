import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./settings-btn.style.css";

interface Props {
  setShowSettings: Function;
}

function Settings({ setShowSettings }: Props) {
  function showSettingsFunc() {
    setShowSettings(true);
  }
  return (
    <button className="setting-btn" onClick={showSettingsFunc}>
      <FontAwesomeIcon icon={faCog}></FontAwesomeIcon>
    </button>
  );
}

export default Settings;

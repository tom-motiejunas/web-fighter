import { useContext } from "react";
import { useRef, useState } from "react";

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { userSettingsContext } from "../../../contexts/userSettings.context";

import "./settings-screen.style.css";

interface Props {
  setShowSettings: Function;
  setPlayerHp: Function;
  setBotHp: Function;
}

function SettingsScreen({ setShowSettings, setPlayerHp, setBotHp }: Props) {
  let allInputs: NodeListOf<HTMLInputElement>;

  const settings = useContext(userSettingsContext);
  const [isBadInput, setIsBadInput] = useState(false);

  const exitBtnRef = useRef<HTMLButtonElement>(null);

  function checkValidation(e: React.ChangeEvent<HTMLInputElement>) {
    let allGood = true;
    allInputs = document.querySelectorAll(".settings-screen > div > input");
    allInputs.forEach((el) => {
      if (!exitBtnRef.current) return;
      if (+el.value <= 0) {
        el.classList.add("bad-input");
        exitBtnRef.current.disabled = true;
        allGood = false;
        setIsBadInput(true);
      } else {
        if (!settings) return;
        if (e.target.dataset.setting === "maxHp") {
          if (!e.target.value || +e.target.value === 0) return;
          console.log(e.target.value);
          setBotHp(+e.target.value);
          setPlayerHp(+e.target.value);
        }
        const setSetting = settings[`${e.target.dataset.setting}`][1];
        if (setSetting instanceof Function) setSetting(+e.target.value);

        el.classList.remove("bad-input");
      }
    });
    if (allGood) {
      if (!exitBtnRef.current) return;
      exitBtnRef.current.disabled = false;
      setIsBadInput(false);
    }
  }
  if (!settings) return null;

  return (
    <div className="settings-bg">
      <div className="settings-screen">
        <h2>OPTIONS</h2>
        <button
          className="exit-btn"
          onClick={() => setShowSettings(false)}
          ref={exitBtnRef}
        >
          <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
        </button>
        <div>
          <label htmlFor="maxHp">Max Hp</label>
          <input
            type="number"
            name="maxHp"
            data-setting="maxHp"
            defaultValue={Number(settings.maxHp[0])}
            onChange={(e) => checkValidation(e)}
          />
        </div>
        <div>
          <label htmlFor="delayBetweenRounds">Delay Between Rounds</label>
          <input
            type="number"
            name="delayBetweenRounds"
            data-setting="timeBetweenRounds"
            defaultValue={Number(settings.timeBetweenRounds[0])}
            onChange={(e) => checkValidation(e)}
          />
        </div>
        <div>
          <label htmlFor="attackDmg">Attack Damage</label>
          <input
            type="number"
            name="attackDmg"
            data-setting="attackDmg"
            defaultValue={Number(settings.attackDmg[0])}
            onChange={(e) => checkValidation(e)}
          />
        </div>
        <div>
          <label htmlFor="comboDmg">Combo Damage</label>
          <input
            type="number"
            name="comboDmg"
            data-setting="comboDmg"
            defaultValue={Number(settings.comboDmg[0])}
            onChange={(e) => checkValidation(e)}
          />
        </div>
        {isBadInput ? <span>All Values must be greater than zero</span> : null}
      </div>
    </div>
  );
}

export default SettingsScreen;

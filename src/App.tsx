import { useContext, useEffect, useState } from "react";
import "./App.css";

import ChooseFighter from "./components/choose-fighter/choose-fighter.component";
import FighterPreview from "./components/fighter-preview/fighter-preview.component";
import Console from "./components/console/console.component";
import Fighters from "./components/fighters/fighters.components";
import HPBars from "./components/hpbars/hpbars.component";
import InputShowcase from "./components/input-showcase/input-showcase.component";
import GameOverScreen from "./components/gameOverScreen/gameOverScreen.component";
import Settings from "./components/settings/settings-btn/settings-btn.component";
import SettingsScreen from "./components/settings/settings-screen/settings-screen.component";
import HelpButton from "./components/help/help-btn/help-btn.component";
import HelpScreen from "./components/help/help-screen/help-screen.component";
import ComboScreen from "./components/combo-screen/combo-screen.component";
import BackToMenu from "./components/back-to-menu/back-to-menu.component";

import unknownFighter from "./assets/fighter-sprites/question-mark.svg";
import fightBg1 from "./assets/backgrounds/fightBackground.jpg";
import fightBg2 from "./assets/backgrounds/fightBackground2.png";

import Queue from "queue-fifo";

import { userSettingsContext } from "./contexts/userSettings.context";

let randomBg: string;

function App() {
  const [hoverCharacter, setHoverCharacter] = useState({
    fighterName: "",
    sprite: unknownFighter,
  });

  const movesQueue = new Queue<string>();

  const [isSelected, setIsSelected] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const [movesQueueSt, setMovesQueueSt] = useState(movesQueue);
  const [movesQueueStSize, setMovesQueueStSize] = useState(0);

  const settings = useContext(userSettingsContext);
  const maxHp = Number(settings?.maxHp[0]);

  const [playerHp, setPlayerHp] = useState(maxHp);
  const [botHp, setBotHp] = useState(maxHp);

  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const [showComboScreen, setShowComboScreen] = useState("");

  const consoleProps = {
    isSelected: isSelected,
    setIsSelected: setIsSelected,
    setIsConfirmed: setIsConfirmed,
    isConfirmed: isConfirmed,
    movesQueueSt: movesQueueSt,
    setMovesQueueSt: setMovesQueueSt,
    setMovesQueueStSize: setMovesQueueStSize,
    setPlayerHp: setPlayerHp,
    playerHp: playerHp,
    setBotHp: setBotHp,
    botHp: botHp,
    setShowComboScreen: setShowComboScreen,
  };
  useEffect(() => {
    const bgNum = Math.floor(Math.random() * 2);
    const bgArr = [fightBg1, fightBg2];
    randomBg = bgArr[bgNum];
  }, []);
  return (
    <div className="App">
      {!isConfirmed ? (
        <div>
          <FighterPreview
            hoverCharacter={hoverCharacter}
            isSelected={isSelected}
          ></FighterPreview>
          <ChooseFighter
            setHoverCharacter={setHoverCharacter}
            setIsSelected={setIsSelected}
            isSelected={isSelected}
          ></ChooseFighter>
          <div className="side-btns">
            <Settings setShowSettings={setShowSettings}></Settings>
            <HelpButton setShowHelp={setShowHelp}></HelpButton>
          </div>

          {showSettings ? (
            <SettingsScreen
              setShowSettings={setShowSettings}
              setPlayerHp={setPlayerHp}
              setBotHp={setBotHp}
            />
          ) : null}
          {showHelp ? (
            <HelpScreen setShowHelp={setShowHelp}></HelpScreen>
          ) : null}
        </div>
      ) : (
        <div
          className="game-view"
          style={{ backgroundImage: `url(${randomBg})`, zIndex: 0 }}
        >
          <BackToMenu
            setMovesQueueSt={setMovesQueueSt}
            setMovesQueueStSize={setMovesQueueStSize}
            movesQueueSt={movesQueueSt}
            setPlayerHp={setPlayerHp}
            setBotHp={setBotHp}
            setIsSelected={setIsSelected}
            setIsConfirmed={setIsConfirmed}
          ></BackToMenu>
          <HPBars playerHp={playerHp} botHp={botHp}></HPBars>
          <Fighters hoverCharacter={hoverCharacter.sprite}></Fighters>
          <InputShowcase
            movesQueueSt={movesQueueSt}
            movesQueueStSize={movesQueueStSize}
          ></InputShowcase>
          {showComboScreen ? (
            <ComboScreen
              setShowComboScreen={setShowComboScreen}
              showComboScreen={showComboScreen}
            ></ComboScreen>
          ) : null}
        </div>
      )}
      <Console {...consoleProps}></Console>
      {playerHp <= 0 || botHp <= 0 ? (
        <GameOverScreen
          setMovesQueueSt={setMovesQueueSt}
          setMovesQueueStSize={setMovesQueueStSize}
          movesQueueSt={movesQueueSt}
          setPlayerHp={setPlayerHp}
          playerHp={playerHp}
          setBotHp={setBotHp}
          setIsSelected={setIsSelected}
          setIsConfirmed={setIsConfirmed}
        ></GameOverScreen>
      ) : null}
    </div>
  );
}

export default App;

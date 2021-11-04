import { useRef } from "react";

interface Props {
  isSelected: boolean;
  setIsConfirmed: Function;
  setIsSelected: Function;
}

export default function PreGameConsole({
  isSelected,
  setIsConfirmed,
  setIsSelected,
}: Props) {
  const selectionRef = useRef<HTMLInputElement>(null);

  function checkInput(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    if (!selectionRef.current) return;
    if (selectionRef.current.value.toLocaleLowerCase() === "y") {
      setIsConfirmed(true);
      selectionRef.current.disabled = true;
    } else if (selectionRef.current.value.toLocaleLowerCase() === "n") {
      setIsSelected(false);
    }
  }

  return (
    <div>
      <p>
        Web Fighter [Version 1.0.0] <br /> (c) Web Fighter Corporation. All
        rights reserved.
      </p>
      <br />
      <p>C:\Users\EpicFighter{">"}Start</p>
      <br />
      <p>Starting Program...</p>
      <br />
      <p>Welcome To Web Fighter</p>
      <br />
      <p>Player 1 Pick Your Fighter </p>
      <br />
      {isSelected ? (
        <div className="input">
          <p>Confirm Your Choice (Y/N){">"}</p>
          <input
            type="text"
            name="inputChoice"
            onKeyPress={(e) => checkInput(e)}
            ref={selectionRef}
            autoFocus
          />
        </div>
      ) : null}
    </div>
  );
}

import { useEffect, useRef } from "react";
import "./combo-screen.style.css";

interface Props {
  setShowComboScreen: Function;
  showComboScreen: String;
}

export default function ComboScreen({
  setShowComboScreen,
  showComboScreen,
}: Props) {
  const comboRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(showComboScreen);
    comboRef.current?.classList.add("appear");
    setTimeout(() => {
      comboRef.current?.classList.remove("appear");
      setShowComboScreen("");
    }, 3600);
  }, []);

  return (
    <div className="combo-screen" ref={comboRef}>
      <h2>COMBO!</h2>
      <div>
        {[...showComboScreen].map((char, index) => {
          return (
            <span className={`letter-${index}`}>{char.toUpperCase()}</span>
          );
        })}
      </div>
    </div>
  );
}

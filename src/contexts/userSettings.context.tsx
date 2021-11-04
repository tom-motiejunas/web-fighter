import { createContext, useState } from "react";

export interface userSettingsInterface {
  [maxHp: string]: (number | React.Dispatch<React.SetStateAction<number>>)[];
  timeBetweenRounds: (number | React.Dispatch<React.SetStateAction<number>>)[];
  attackDmg: (number | React.Dispatch<React.SetStateAction<number>>)[];
  comboDmg: (number | React.Dispatch<React.SetStateAction<number>>)[];
}
export const userSettingsContext = createContext<userSettingsInterface | null>(
  null
);

export default ({ children }: any) => {
  const [maxHp, setMaxHp] = useState(50);
  const [timeBetweenRounds, setTimeBetweenRounds] = useState(2000);
  const [attackDmg, setAttackDmg] = useState(5);
  const [comboDmg, setComboDmg] = useState(10);

  const initialSettings = {
    maxHp: [maxHp, setMaxHp],
    timeBetweenRounds: [timeBetweenRounds, setTimeBetweenRounds],
    attackDmg: [attackDmg, setAttackDmg],
    comboDmg: [comboDmg, setComboDmg],
  };

  return (
    <userSettingsContext.Provider value={initialSettings}>
      {children}
    </userSettingsContext.Provider>
  );
};

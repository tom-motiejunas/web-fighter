import Queue from "queue-fifo";

interface battleMapInterface {
  [key: string]: boolean;
}

function cloneQueue(queue: Queue<string>) {
  let data: Array<string> = [];
  let temp: string | null;

  while (queue.peek() !== null) {
    temp = queue.dequeue();
    if (temp) {
      data = [...data, temp];
    }
  }
  data.forEach((el) => queue.enqueue(el));
  return data;
}

// true - player wins false - bot wins
const battleMap: battleMapInterface = {
  if: true,
  fc: true,
  ci: true,
  ic: false,
  fi: false,
  cf: false,
};

function addAfterCombo(queue: Queue<string>, index: number) {
  let data: Array<string> = [];
  let temp: string | null;
  let i = 0;
  while (queue.peek() !== null) {
    temp = queue.dequeue();
    if (temp) {
      data = [...data, temp];
    }
  }
  data.reverse();
  data.forEach((el) => queue.enqueue(el));
  data = [];
  while (queue.peek() !== null) {
    i++;
    if (i === index - 2) {
      data = [...data, "#"];
    }
    temp = queue.dequeue();
    if (temp) {
      data = [...data, temp];
    }
  }
  data.reverse();
  data.forEach((el) => queue.enqueue(el));
}

export function MoveLogic(
  playerMove: string,
  botMove: string,
  movesQueueSt: Queue<string>,
  attackDmg: number,
  comboDmg: number,
  setShowComboScreen: Function
) {
  let amount = 0;
  // 0 - draw / 1 - player won / 2 - bot won
  let whoWon: number;
  if (battleMap[playerMove + botMove] === true) {
    whoWon = 1;
    amount += attackDmg;
  } else if (battleMap[playerMove + botMove] === false) {
    whoWon = 2;
    amount += attackDmg;
  } else {
    whoWon = 0;
  }

  let data = cloneQueue(movesQueueSt);

  const { dmg, newQueue } = checkCombos(
    data,
    movesQueueSt,
    comboDmg,
    setShowComboScreen
  );
  amount += dmg;
  return { whoWon: whoWon, amount: amount, newQueue: newQueue };
}

function checkCombos(
  data: string[],
  movesQueueSt: Queue<string>,
  comboDmg: number,
  setShowComboScreen: Function
) {
  let string = "";
  let stopCheckingSymbol = "#";
  let index = 0;
  data = data.reverse();
  let isCombo = false;
  for (let el of data) {
    index++;
    if (el === stopCheckingSymbol) {
      isCombo = false;
      break;
    }
    string = el + string;
    if (string.match(/fff|cic|fci|cif/)) {
      const found = string.match(/fff|cic|fci|cif/);
      addAfterCombo(movesQueueSt, index);
      isCombo = true;
      if (found) setShowComboScreen(found[0]);
      break;
    }
  }
  return isCombo
    ? { dmg: comboDmg, newQueue: movesQueueSt }
    : { dmg: 0, newQueue: movesQueueSt };
}

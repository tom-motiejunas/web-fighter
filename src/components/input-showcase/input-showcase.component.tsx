import Queue from "queue-fifo";
import { useEffect, useState } from "react";
import "./input-showcase.style.css";

interface Props {
  movesQueueSt: Queue<string>;
  movesQueueStSize: number;
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
  data.forEach((el) => {
    queue.enqueue(el);
  });
  return data;
}

function InputShowcase({ movesQueueSt, movesQueueStSize }: Props) {
  let data: Array<string> = [];
  const [renderData, setRenderData] = useState(data);
  useEffect(() => {
    data = cloneQueue(movesQueueSt);
    setRenderData(data);
  }, [movesQueueStSize]);

  return (
    <div className="input-box">
      {renderData.map((el, i) =>
        el !== "#" ? <span key={i}>{el}</span> : null
      )}
    </div>
  );
}

export default InputShowcase;

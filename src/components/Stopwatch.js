import { useEffect, useState } from "react";
import "../styles/Stopwatch.css";

function Stopwatch() {
  const [time, setTime] = useState(0);
  // const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    // if (running) {
    //   interval = setInterval(() => {
    //     setTime(prevTime => prevTime + 100);
    //   }, 100);
    //   console.log(time);
    // } else if (!running) {
    //   clearInterval(interval);
    // }
    interval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
    console.log(time);
    return () => clearInterval(interval);
  }, []);

  // function reportTime() {
  //   return time;
  // }

  return (
    <div className="stopwatch">{time}</div>
  );
}

export default Stopwatch;
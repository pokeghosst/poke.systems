import { createSignal, onCleanup } from "solid-js";

import "./Clock.css";

const Clock = () => {
  const [time, setTime] = createSignal(new Date().toLocaleTimeString());

  const updateClock = () => setTime(new Date().toLocaleTimeString());

  const interval = setInterval(updateClock, 1000);

  onCleanup(() => clearInterval(interval));

  return <div class="clock">{time()}</div>;
};

export default Clock;

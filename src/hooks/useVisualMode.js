
import {useState} from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // const transition = (newMode) => {
  //   return setMode(newMode) && setHistory([...history, newMode])
  // };

  function transition(newMode, replace = false) {
    if (replace) {
      history.pop();
      setHistory([...history, newMode])

    }
    setMode(newMode)
    setHistory([...history, newMode])
  }


  function back() {

    if (history.length > 1) {
      history.pop();
      const length = history.length - 1;

      setMode(history[length]);
    }
  };
  return {mode, transition, back};
}


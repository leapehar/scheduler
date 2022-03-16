
import {useState} from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // const transition = (newMode) => {
  //   return setMode(newMode) && setHistory([...history, newMode])
  // };

  function transition(newMode, replace = false) {
    if (replace) {
      // history.pop();
      // setHistory([...history, newMode])

      let newHistory = [...history];
      newHistory.pop();
      setHistory([...newHistory, newMode])


    }
    setMode(newMode)
    setHistory([...history, newMode])
  }


  function back() {

    if (history.length > 1) {
      // history.pop();
      // const length = history.length - 1;

      let newHistory = [...history];
      newHistory.pop();

      const length = newHistory.length - 1;

      // setMode(history[length]);

      setMode(newHistory[length]);
    }
  };
  return {mode, transition, back};
}


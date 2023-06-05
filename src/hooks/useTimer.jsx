import { useState, useEffect } from 'react';

export default function useTimer(seconds) {
  const [secondsLeft, setSecondsLeft] = useState(seconds);
  const [isStopped, setIsStopped] = useState(false);

  const toggleStopped = () => setIsStopped(!isStopped);

  useEffect(() => {
    let timeoutId;
    if (secondsLeft > 0 && !isStopped) {
      timeoutId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
    }

    return () => clearTimeout(timeoutId);

  }, [seconds, secondsLeft, isStopped])

  return [secondsLeft, isStopped, toggleStopped];
}
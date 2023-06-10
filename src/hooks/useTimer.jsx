import { useState, useEffect } from 'react';

export default function useTimer(seconds) {
  const [secondsLeft, setSecondsLeft] = useState(seconds);
  const [isStopped, setIsStopped] = useState(true);

  const toggleStopped = () => setIsStopped(!isStopped);

  const updateTime = (time) => {
    console.log('updating the time with value ', time);
    setSecondsLeft(time);
  };

  useEffect(() => {
    if (secondsLeft <= 0 || isStopped) return;

    let timeoutId = setTimeout(() => {
      setSecondsLeft(secondsLeft - 1);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [seconds, secondsLeft, isStopped]);

  return [secondsLeft, updateTime, isStopped, toggleStopped];
}

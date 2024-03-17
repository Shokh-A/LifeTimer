import React, { useState, useEffect } from 'react'

interface TimerProps {
  timestamp: number
}

const Timer = ({timestamp} : TimerProps) => {
  const [remainingTime, setRemainingTime] = useState<number>(timestamp)
  
  useEffect(() => {
    if (remainingTime === 0) return
    const id = setInterval(() => {
      setRemainingTime((prevTime: number) => Math.max(prevTime - 100, 0))
    }, 100);

    return () => clearInterval(id)
  }, [remainingTime]);
  
  return (
    <>
      <h1>Timer</h1>
      <div>{new Date(remainingTime).toISOString()}</div>
    </>
  );
};

export default Timer;

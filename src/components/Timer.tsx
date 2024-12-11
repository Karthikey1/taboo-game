import { useEffect } from 'react';

interface TimerProps {
  timeLeft: number;
  setTimeLeft: (time: number) => void;
}

export function Timer({ timeLeft, setTimeLeft }: TimerProps) {
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [setTimeLeft]);

  return (
    <span className="text-lg font-semibold">
      Time: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
    </span>
  );
}
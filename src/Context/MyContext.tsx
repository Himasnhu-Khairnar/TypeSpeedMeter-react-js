import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define the shape of the Timer context value
interface TimerContextType {
  duration: number;
  remainingTime: number;
  timerActive: boolean;
  startTimer: () => void;
  restartTimer: () => void;
  handleDurationChange: (newDuration: number) => void;
  Blur: boolean;
}

// Create Timer Context with a default value of undefined
const TimerContext = createContext<TimerContextType | undefined>(undefined);

// Timer Provider Component
export const TimerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [duration, setDuration] = useState<number>(30); // Default to 30 seconds
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [Blur, setBlur] = useState<boolean>(true);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (timerActive) {
      const endTime = Date.now() + duration * 1000;

      timer = setInterval(() => {
        const now = Date.now();
        const distance = endTime - now;

        if (distance < 0) {
          clearInterval(timer);
          setRemainingTime(0);
          setTimerActive(false);
        } else {
          setRemainingTime(Math.floor((distance % (1000 * 90)) / 1000));
        }
      }, 1000);
      setBlur(false);

      return () => {
        if (timer) clearInterval(timer);
      };
    }
  }, [timerActive, duration]);

  const startTimer = () => {
    setTimerActive(true);
  };

  const restartTimer = () => {
    setRemainingTime(duration);
    setTimerActive(false);
  };

  const handleDurationChange = (newDuration: number) => {
    if (!timerActive) {
      setDuration(newDuration);
      setRemainingTime(newDuration);
      setTimerActive(false);
    }
  };

  return (
    <TimerContext.Provider
      value={{
        duration,
        remainingTime,
        timerActive,
        startTimer,
        restartTimer,
        handleDurationChange,
        Blur
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

// Custom hook to use Timer Context
export const useTimer = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
};

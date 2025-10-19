import { useState, useEffect, useRef } from "react";

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Custom hook pentru countdown până la o dată specificată
 * @param targetDate - Data țintă până la care se face countdown
 * @returns Object cu timpul rămas și flag dacă e expirat
 */
export function useCountdown(targetDate: Date) {
  const [timeRemaining, setTimeRemaining] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);
  
  // Folosim ref pentru a stoca timestamp-ul pentru a evita re-render-uri când primim același Date object
  const targetTimeRef = useRef(targetDate.getTime());
  
  useEffect(() => {
    targetTimeRef.current = targetDate.getTime();
  }, [targetDate]);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const diff = targetTimeRef.current - now.getTime();

      if (diff <= 0) {
        setIsExpired(true);
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining((prev) => {
        // Only update if values actually changed
        if (prev.days !== days || prev.hours !== hours || 
            prev.minutes !== minutes || prev.seconds !== seconds) {
          return { days, hours, minutes, seconds };
        }
        return prev;
      });
      
      if (isExpired) {
        setIsExpired(false);
      }
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, []); // Empty dependency array - runs once, uses ref for targetDate

  return { timeRemaining, isExpired };
}

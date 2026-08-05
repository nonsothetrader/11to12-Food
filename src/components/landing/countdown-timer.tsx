
'use client';

import { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

export function CountdownTimer() {
  const calculateNextGiveaway = () => {
    const now = new Date();
    const nextGiveaway = new Date(now.getTime());
    nextGiveaway.setHours(11, 0, 0, 0); // Set time to 11:00:00

    const currentDay = now.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
    const currentHour = now.getHours();

    // Target days are Monday (1) and Thursday (4)
    if (currentDay < 1 || (currentDay === 1 && currentHour < 11)) {
      // Before Monday 11am -> Target is this Monday
      nextGiveaway.setDate(now.getDate() + (1 - currentDay));
    } else if (currentDay < 4 || (currentDay === 4 && currentHour < 11)) {
      // Between Mon 11am and Thurs 11am -> Target is this Thursday
      nextGiveaway.setDate(now.getDate() + (4 - currentDay));
    } else {
      // After Thursday 11am -> Target is next Monday
      // Days until next Monday: (7 - currentDay) + 1
      nextGiveaway.setDate(now.getDate() + (8 - currentDay));
    }
    
    // Final check to ensure we are always in the future
    if (nextGiveaway.getTime() < now.getTime()) {
        if (currentDay >= 1 && currentDay <= 4) { // It's Mon-Thu, must have just passed, aim for next dispatch
            if(now.getDay() === 1) { // It's Monday but past 11, aim for Thursday
                 nextGiveaway.setDate(now.getDate() + 3);
            } else { // It's Thursday but past 11, aim for next Monday
                 nextGiveaway.setDate(now.getDate() + (8 - currentDay));
            }
        } else { // It's Fri-Sun, aim for next Mon
            nextGiveaway.setDate(now.getDate() + (8 - currentDay));
        }
    }

    return nextGiveaway;
  };

  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Run calculation on client-side only
    setIsClient(true);
    setTargetDate(calculateNextGiveaway());
  }, []);

  useEffect(() => {
    if (!targetDate || !isClient) return;

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        // Time is up, recalculate for the next giveaway
        setTargetDate(calculateNextGiveaway());
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, isClient]);

  const targetDay = targetDate ? targetDate.toLocaleDateString('en-US', { weekday: 'long' }) : '';

  if (!isClient) {
    // Render nothing or a placeholder on the server and initial client render
    return null; 
  }

  return (
    <div className="text-center md:text-left">
        <p className="text-lg text-muted-foreground font-medium mb-2 flex items-center justify-center md:justify-start">
            <Timer className="mr-2 h-5 w-5" />
            Next free lunch dispatch is on {targetDay}!
        </p>
        <div className="flex justify-center md:justify-start space-x-2 sm:space-x-4">
            <div className="text-center p-3 bg-primary text-primary-foreground rounded-lg w-20 sm:w-24">
                <div className="text-3xl sm:text-4xl font-bold">{String(timeLeft.days).padStart(2, '0')}</div>
                <div className="text-xs sm:text-sm uppercase">Days</div>
            </div>
             <div className="text-center p-3 bg-primary text-primary-foreground rounded-lg w-20 sm:w-24">
                <div className="text-3xl sm:text-4xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="text-xs sm:text-sm uppercase">Hours</div>
            </div>
             <div className="text-center p-3 bg-primary text-primary-foreground rounded-lg w-20 sm:w-24">
                <div className="text-3xl sm:text-4xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="text-xs sm:text-sm uppercase">Mins</div>
            </div>
             <div className="text-center p-3 bg-primary text-primary-foreground rounded-lg w-20 sm:w-24">
                <div className="text-3xl sm:text-4xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div className="text-xs sm:text-sm uppercase">Secs</div>
            </div>
        </div>
    </div>
  );
}

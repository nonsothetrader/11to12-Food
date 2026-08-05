
'use client';

import { useState, useEffect } from 'react';

export function WelcomeHeader({ name }: { name: string }) {
  const [timeOfDay, setTimeOfDay] = useState('morning');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setTimeOfDay('morning');
    } else if (hour < 18) {
      setTimeOfDay('afternoon');
    } else {
      setTimeOfDay('evening');
    }
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold">Good {timeOfDay}, {name}!</h1>
      <p className="text-muted-foreground">Here's what's on the menu. Manage your meals for the week.</p>
    </div>
  );
}

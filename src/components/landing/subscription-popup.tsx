
'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const POPUP_SESSION_KEY = 'subscription-popup-shown';

export function SubscriptionPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasBeenShown = sessionStorage.getItem(POPUP_SESSION_KEY);

    if (!hasBeenShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem(POPUP_SESSION_KEY, 'true');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center font-headline">Tired of thinking about lunch?</DialogTitle>
          <DialogDescription className="text-center pt-2">
            Let us handle it. Get delicious, stress-free meals delivered to your office every workday.
          </DialogDescription>
        </DialogHeader>
        <div className="pt-4">
          <Button asChild size="lg" className="w-full">
            <Link href="/signup">Choose Your Plan</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}


'use client';

import type { DailyOrder } from '@/app/(dashboard)/dashboard/page';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { UseCreditDialog } from './use-credit-dialog';

type UndoableAction = 'accept' | 'skip' | 'sub_pack' | 'use_credit_meal' | 'use_credit_sub_pack';

interface MealCreditTrackerProps {
  credits: number;
  updateCredits: (newCredits: number) => void;
  updateDailyOrder: (date: Date, newOrderData: Partial<DailyOrder>) => void;
  startUndoTimer: (action: UndoableAction, forDate: Date) => void;
}

export function MealCreditTracker({ 
    credits, 
    updateCredits, 
    updateDailyOrder, 
    startUndoTimer,
}: MealCreditTrackerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Star className="text-primary" />
            <span>My Meal Credits</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-5xl font-bold">{credits}</p>
        <p className="text-muted-foreground">credits available</p>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <UseCreditDialog 
          credits={credits} 
          updateCredits={updateCredits}
          updateDailyOrder={updateDailyOrder}
          startUndoTimer={startUndoTimer}
        >
          <Button className="w-full" disabled={credits <= 0}>
              <Star className="mr-2" />
              Use a Credit
          </Button>
        </UseCreditDialog>
      </CardFooter>
    </Card>
  );
}

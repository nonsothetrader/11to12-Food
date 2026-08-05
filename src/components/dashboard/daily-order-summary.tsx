'use client';

import type { DailyOrder } from '@/app/(dashboard)/dashboard/page';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Utensils, Info, Star } from 'lucide-react';

interface DailyOrderSummaryProps {
  date: Date | undefined;
  order: DailyOrder | undefined;
}

export function DailyOrderSummary({ date, order }: DailyOrderSummaryProps) {
  if (!date) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Daily Order Summary</CardTitle>
                 <CardDescription>Your confirmed items for the selected day.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-center text-muted-foreground py-4">
                    <Info className="mx-auto h-8 w-8 mb-2" />
                    <p>Select a date to see your order summary.</p>
                </div>
            </CardContent>
        </Card>
    );
  }

  const dateString = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  const hasItems = order && (order.confirmed || order.extraMeal);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order for {dateString}</CardTitle>
        <CardDescription>Your confirmed items for this day.</CardDescription>
      </CardHeader>
      <CardContent>
        {hasItems ? (
            <ul className="space-y-2 text-sm">
                {order.mealName && order.confirmed && (
                    <li className="flex items-center gap-2">
                        <Utensils className="h-4 w-4 text-primary" />
                        <span>1x {order.mealName} (Confirmed)</span>
                    </li>
                )}
                 {order.extraMeal && (
                    <li className="flex items-center gap-2 font-semibold text-green-600">
                        <Star className="h-4 w-4" />
                        <span>1x Extra Meal (Credit Used)</span>
                    </li>
                )}
            </ul>
        ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
                No items confirmed for this day yet.
            </p>
        )}
      </CardContent>
    </Card>
  );
}

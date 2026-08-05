
'use client';

import { useState } from 'react';
import { MealHistoryTable } from '@/components/dashboard/meal-history-table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function MyMealsPage() {
  return (
    <div className="flex-1 p-4 md:p-8 space-y-6">
        <div>
            <h1 className="text-3xl font-bold">My Meals</h1>
            <p className="text-muted-foreground">View and rate your past meals.</p>
        </div>
        <MealHistoryTable />
    </div>
  );
}

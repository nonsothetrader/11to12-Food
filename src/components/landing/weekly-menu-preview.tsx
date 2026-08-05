'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import type { WeeklyMenuItem } from '@/lib/types';
import { useMenuStore } from '@/hooks/use-menu-store';
import { toDateString } from '@/lib/utils';
import { Utensils, Zap } from 'lucide-react';

export function WeeklyMenuPreview() {
  const { menu } = useMenuStore();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [mealForDay, setMealForDay] = useState<WeeklyMenuItem | null>(null);

  useEffect(() => {
    // Set the initial date on the client to avoid hydration mismatch
    if (typeof window !== 'undefined') {
        setDate(new Date());
    }
  }, []);

  useEffect(() => {
    if (date) {
        const dateString = toDateString(date);
        setMealForDay(menu.get(dateString) || null);
    }
  }, [date, menu]);

  const selectedDay = date ? date.toLocaleDateString('en-US', { weekday: 'long' }) : 'No date selected';

  return (
    <section id="menu" className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--primary-darker))_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">What is the kitchen cooking this week?</h2>
            <p className="max-w-[900px] text-primary-foreground/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Click on any workday below to inspect ingredients, spice levels, allergens, and our custom Sub Pack alternative.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-8 py-12 lg:grid-cols-2">
          <div>
            <h3 className="text-2xl font-bold mb-4">{`Meal for ${selectedDay}`}</h3>
            <div className="space-y-4">
              {mealForDay ? (
                <div>
                    <Card className="p-4 bg-card text-card-foreground">
                         <p className="font-semibold text-lg">{mealForDay.mealName}</p>
                    </Card>
                    <Card className="mt-4 bg-card text-card-foreground">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Utensils className="h-5 w-5 text-primary" />
                                <span>What's In It</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                                {mealForDay.ingredients.map((ingredient, i) => (
                                    <li key={i}>{ingredient}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
              ) : (
                <p className="text-primary-foreground/90">No meal scheduled. Probably a holiday. Or we forgot. Anyway, pick another day.</p>
              )}
            </div>
          </div>
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border bg-card text-card-foreground"
            />
          </div>
        </div>

        <div className="text-center max-w-2xl mx-auto pt-8">
            <Zap className="h-8 w-8 mx-auto mb-2 text-accent"/>
            <h3 className="text-xl font-bold">Don't Like What You See?</h3>
            <p className="text-primary-foreground/90">
                Don't panic. Our flexible plans let you skip any day's meal and get a credit. So you're never stuck eating something you don't love.
            </p>
        </div>
      </div>
    </section>
  );
}

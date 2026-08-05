
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useMenuStore } from '@/hooks/use-menu-store';
import { toDateString } from '@/lib/utils';
import type { WeeklyMenuItem } from '@/lib/types';

export function WeeklyMenuCarousel() {
  const { menu } = useMenuStore();
  const [weeklyMenu, setWeeklyMenu] = React.useState<WeeklyMenuItem[]>([]);
  const [menuTitle, setMenuTitle] = React.useState("This Week's Menu");

  React.useEffect(() => {
    const now = new Date();
    const day = now.getDay(); // Sunday = 0, Friday = 5
    const hour = now.getHours();

    let isNextWeek = false;
    // If it's Saturday (6) or Sunday (0)
    if (day === 6 || day === 0) {
      isNextWeek = true;
    }
    // If it's Friday (5) and 12 PM or later
    if (day === 5 && hour >= 12) {
      isNextWeek = true;
    }

    setMenuTitle(isNextWeek ? "Next Week's Menu" : "This Week's Menu");

    const getWeekMenu = () => {
      const weekData: WeeklyMenuItem[] = [];
      const today = new Date();
      
      // If we are in the "Next Week" view, start from next Monday
      if (isNextWeek) {
        const daysUntilMonday = 8 - day; // Days from Fri/Sat/Sun to next Mon
        today.setDate(today.getDate() + (daysUntilMonday % 7));
      }

      const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday

      // Find the date of the Monday for the relevant week
      const monday = new Date(today);
      monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));

      for (let i = 0; i < 5; i++) {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i);
        const dateString = toDateString(date);
        const meal = menu.get(dateString);
        if (meal) {
          weekData.push(meal);
        }
      }
      return weekData;
    };
    setWeeklyMenu(getWeekMenu());
  }, [menu]);
  
  return (
    <div>
        <h2 className="text-2xl font-bold mb-4">{menuTitle}</h2>
        <Carousel
            opts={{
            align: "start",
            loop: weeklyMenu.length > 2,
            }}
            className="w-full"
        >
            <CarouselContent>
            {weeklyMenu.map((item) => {
                return (
                <CarouselItem key={item.day} className="md:basis-1/2 lg:basis-1/3">
                    <Card>
                    <CardContent className="p-4">
                        <p className="font-semibold text-sm text-primary">{item.day}</p>
                        <p className="font-bold">{item.mealName}</p>
                    </CardContent>
                    </Card>
                </CarouselItem>
                );
            })}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
        </Carousel>
    </div>
  );
}

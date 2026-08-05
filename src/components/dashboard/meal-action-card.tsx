'use client';

import type { DailyOrder, LastAction } from '@/app/(dashboard)/dashboard/page';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import type { WeeklyMenuItem } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Utensils, AlertTriangle, Info, Star, CheckCircle } from 'lucide-react';
import { Countdown } from './countdown';
import { useMenuStore } from '@/hooks/use-menu-store';
import { toDateString } from '@/lib/utils';
import { updateOrderStatus } from '@/lib/mock-orders';

const getDayOfWeek = (date: Date): string => {
  return date.toLocaleString('en-US', { weekday: 'long' });
};

const getNextMealDate = (currentDate: Date): Date => {
    const nextDate = new Date(currentDate);
    const day = currentDate.getDay(); 

    if (day >= 5) { 
        nextDate.setDate(currentDate.getDate() + (8 - day)); 
    } else {
        nextDate.setDate(currentDate.getDate() + 1);
    }
    return nextDate;
}

type UndoableAction = 'accept' | 'skip' | 'use_credit_meal';

interface MealActionCardProps {
    date: Date | undefined;
    dailyOrder?: DailyOrder;
    updateDailyOrder: (date: Date, newOrderData: Partial<DailyOrder>) => void;
    credits: number;
    updateCredits: (newCredits: number) => void;
    startUndoTimer: (action: UndoableAction, forDate: Date) => void;
    undoableActions: LastAction[];
    handleUndo: (actionId: string) => void;
}

export function MealActionCard({
  date,
  dailyOrder,
  updateDailyOrder,
  credits,
  updateCredits,
  startUndoTimer,
  undoableActions,
  handleUndo,
}: MealActionCardProps) {
  const { menu } = useMenuStore();
  
  const [mealForDay, setMealForDay] = useState<WeeklyMenuItem | null>(null);
  const [nextMeal, setNextMeal] = useState<WeeklyMenuItem | null>(null);
  
  const [isDeliveryTime, setIsDeliveryTime] = useState(false);
  const [isPastMealTime, setIsPastMealTime] = useState(false);
  const [isPastDate, setIsPastDate] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [orderReceived, setOrderReceived] = useState(false);
  
  const { toast } = useToast();
  const selectedDay = date ? getDayOfWeek(date) : '';

  const handleOrderReceived = () => {
    if (!date) return;
    if (orderReceived) return;

    setOrderReceived(true);
    updateOrderStatus("user-001", date, 'Delivered');
    
    toast({
        title: "Enjoy your meal!",
        description: "Thank you for confirming your order arrival.",
    });
  }

  useEffect(() => {
    if (date && mealForDay && !dailyOrder?.confirmed) {
        updateDailyOrder(date, { mealName: mealForDay.mealName });
    }
  }, [date, mealForDay]);

  useEffect(() => {
    const today = new Date();
    const currentHour = today.getHours();
    const dateStr = date ? toDateString(date) : '';
    const isToday = date?.toDateString() === today.toDateString();

    setIsPastDate(false);
    setOrderReceived(false);
    
    if (date) {
        const selectedDate = new Date(date);
        selectedDate.setHours(0,0,0,0);
        const todayDate = new Date();
        todayDate.setHours(0,0,0,0);
        if (selectedDate < todayDate) {
            setIsPastDate(true);
        }
    }

    setMealForDay(menu.get(dateStr) || null);
    setIsDeliveryTime(false);
    setIsPastMealTime(false);

    if (isToday) {
      if (currentHour >= 11 && currentHour < 13) { 
        setIsDeliveryTime(true);
      }
      if (currentHour >= 13) { 
        setIsPastMealTime(true);
        setOrderReceived(true);
        const nextMealDate = getNextMealDate(today);
        setNextMeal(menu.get(toDateString(nextMealDate)) || null);
      }
      
      const nextMealTime = getNextMealDate(today);
      nextMealTime.setHours(11, 0, 0, 0);

      const calculateTimeLeft = () => {
          const now = new Date();
          const difference = nextMealTime.getTime() - now.getTime();
          if (difference > 0) {
              setTimeLeft({
                  days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                  hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                  minutes: Math.floor((difference / 1000 / 60) % 60),
                  seconds: Math.floor((difference / 1000) % 60),
              });
          }
      };
      const timer = setInterval(calculateTimeLeft, 1000);
      calculateTimeLeft();
      return () => clearInterval(timer);
    }
  }, [date, menu]);
  
  const handleAcceptMeal = () => {
    if (!date) return;
    startUndoTimer('accept', date);
    updateDailyOrder(date, { confirmed: true });
    toast({ title: 'Meal Confirmed!', description: `We'll have your ${mealForDay?.mealName} ready on ${selectedDay}.` });
  };
  
  const handleSkipMeal = () => {
    if (!date) return;
    startUndoTimer('skip', date);
    updateCredits(credits + 1);
    updateDailyOrder(date, { mealName: null, confirmed: false });
    toast({ title: 'Meal Skipped', description: `You've skipped ${selectedDay}. 1 credit has been added.` });
  };

  const isSkipped = dailyOrder && !dailyOrder.confirmed && dailyOrder.mealName === null;
  const isConfirmed = dailyOrder?.confirmed;
  
  const renderActionButtons = () => {
    if (isPastDate) return <div className="rounded-lg bg-muted p-4 text-center text-sm text-muted-foreground"><Info className="inline mr-2 h-4 w-4" /> This day is in the past.</div>;
    
    if (isDeliveryTime) {
         return (
                <div className="relative overflow-hidden rounded-lg bg-primary/10 border border-primary/20 p-6 text-center space-y-4">
                    <div className="flex justify-center"><Utensils className="h-12 w-12 text-primary animate-bounce" /></div>
                    {orderReceived ? (
                       <div className="space-y-1">
                           <h3 className="font-bold text-xl text-primary flex items-center justify-center gap-2"><CheckCircle className="h-6 w-6" /> Meal Received!</h3>
                           <p className="text-sm text-muted-foreground">Enjoy your lunch. Don't forget to rate it later!</p>
                       </div>
                    ) : (
                        <>
                        <div className="space-y-1">
                            <h3 className="font-bold text-xl text-primary">Lunch is on the way!</h3>
                            <p className="text-sm text-muted-foreground">Our rider is navigating Lagos traffic for you.</p>
                        </div>
                        <Button onClick={handleOrderReceived} size="lg" className="w-full shadow-lg">Confirm Order Received</Button>
                        </>
                    )}
                </div>
         );
    }
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Button onClick={handleAcceptMeal} disabled={!mealForDay || (isConfirmed && undoableActions.length === 0) || isSkipped}>Accept Meal</Button>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline" disabled={!mealForDay || (isConfirmed && undoableActions.length === 0) || isSkipped}>
                        <AlertTriangle className="mr-2 h-4 w-4" /> {isSkipped ? 'Skipped' : "Skip Meal"}
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Skip today's meal?</AlertDialogTitle>
                        <AlertDialogDescription>You'll get 1 meal credit to use another day. You have 5 minutes to undo this action.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={handleSkipMeal}>Skip & Get Credit</AlertDialogAction></AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
  }

  const renderContent = () => {
    if (isPastMealTime) {
        return (
             <div className="space-y-6">
                <div className="text-center space-y-2">
                    <h3 className="text-xl font-bold">Tomorrow's Mission</h3>
                    <Countdown timeLeft={timeLeft} />
                </div>
                {nextMeal && (
                    <div className="rounded-lg border bg-card overflow-hidden">
                        <div className="p-4 flex items-center gap-4">
                           <div className="bg-primary/10 p-3 rounded-full"><Utensils className="h-6 w-6 text-primary" /></div>
                           <div>
                               <p className="text-xs text-muted-foreground uppercase font-bold">{nextMeal.day}</p>
                               <h4 className="font-bold">{nextMeal.mealName}</h4>
                           </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
    
    const isWeekend = selectedDay === 'Saturday' || selectedDay === 'Sunday';

    return (
        <div className="space-y-4">
            {mealForDay ? (
            <div className="space-y-4">
                <div className="flex items-start justify-between">
                    <h3 className="text-xl font-bold text-primary">{mealForDay.mealName}</h3>
                    {isConfirmed && <Badge className="bg-green-500">Confirmed</Badge>}
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground bg-muted/30 p-3 rounded-md">
                    {mealForDay.ingredients.map((ing, i) => <p key={i}>• {ing}</p>)}
                </div>
            </div>
            ) : (
                <div className="text-center text-muted-foreground py-10">
                    {isWeekend ? <p>We're offline on weekends. Rest up!</p> : <p>No meal scheduled for this day.</p>}
                </div>
            )}
            {!isWeekend && renderActionButtons()}
        </div>
    );
  };

  return (
    <Card className="shadow-lg border-primary/10">
      <CardHeader className="bg-primary/5 border-b border-primary/10">
        <CardTitle>Meal for {selectedDay}</CardTitle>
        <CardDescription>Plan your lunch or track your delivery in real-time.</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">{renderContent()}</CardContent>
    </Card>
  );
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
    return <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase ${className}`}>{children}</span>
}

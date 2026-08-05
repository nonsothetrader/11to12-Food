'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { CalendarDays, ShoppingCart, Sparkles, AlertCircle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { CheckoutForm } from '@/components/checkout/checkout-form';
import type { CustomPlan } from '@/lib/types';
import { cn } from '@/lib/utils';

const MEAL_PRICE = 3700;
const MIN_DAYS = 8;

export function PricingCalculator() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const { totalCost, customPlan, isDiscounted } = useMemo(() => {
    const totalMeals = selectedDates.length;
    let total = totalMeals * MEAL_PRICE;
    let discounted = false;

    if (totalMeals > 20) {
      total -= MEAL_PRICE;
      discounted = true;
    }

    const plan: CustomPlan = {
      totalMeals,
      selectedDates,
      totalCost: total,
    };
    
    return {
      totalCost: total,
      customPlan: plan,
      isDiscounted: discounted
    };
  }, [selectedDates]);

  const disabledDays = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) return true;

    const day = date.getDay();
    if (day === 0 || day === 6) return true;

    const isToday = date.toDateString() === new Date().toDateString();
    if (isToday && currentTime.getHours() >= 12) return true;

    return false;
  };

  const handleSelect = (dates: Date[] | undefined) => {
    if (dates) {
      setSelectedDates(dates);
    }
  };

  const isEligible = selectedDates.length >= MIN_DAYS;

  return (
    <AlertDialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
      <Card className="shadow-2xl overflow-hidden border-primary/20 max-w-4xl mx-auto">
        <div className="grid lg:grid-cols-5">
          {/* Calendar Section */}
          <div className="lg:col-span-3 p-6 md:p-8 space-y-6 bg-background border-r">
            <div className="flex items-center gap-2 mb-2">
              <CalendarDays className="h-5 w-5 text-primary" />
              <h3 className="font-headline text-xl">Select Your Delivery Dates</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Tap the days you want food. Note: Today is unavailable after 12:00 PM.
            </p>
            <div className="flex justify-center p-2 rounded-xl border bg-muted/20">
              <Calendar
                mode="multiple"
                selected={selectedDates}
                onSelect={handleSelect}
                disabled={disabledDays}
                className="rounded-md"
                numberOfMonths={1}
              />
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
                <Badge variant="outline" className={cn("bg-primary/5 border-primary/20", isEligible ? "text-primary" : "text-destructive border-destructive/20")}>
                    {selectedDates.length} Days Selected
                </Badge>
                {selectedDates.length > 0 && (
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 text-[10px] uppercase font-bold"
                        onClick={() => setSelectedDates([])}
                    >
                        Clear All
                    </Button>
                )}
            </div>
          </div>

          {/* Plan Summary Section */}
          <div className="lg:col-span-2 bg-primary/5 p-6 md:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-headline text-primary">Your Plan</CardTitle>
                <Badge className={cn("h-8 px-3 text-lg font-headline", isEligible ? "bg-primary" : "bg-destructive")}>
                    {selectedDates.length}
                </Badge>
              </div>
              
              <Separator />

              <div className="space-y-4">
                <p className="text-sm text-muted-foreground italic">
                  Premium lunch delivered directly to your desk.
                </p>
                {!isEligible && selectedDates.length > 0 && (
                  <div className="flex items-start gap-2 text-destructive font-bold text-xs bg-destructive/10 p-3 rounded border border-destructive/20">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>MINIMUM 8 DAYS REQUIRED. We're a plan, not a one-night stand. Pick {MIN_DAYS - selectedDates.length} more.</span>
                  </div>
                )}
                {isDiscounted && (
                  <div className="flex items-center gap-2 text-green-600 font-bold text-xs bg-green-50 p-2 rounded border border-green-200">
                    <Sparkles className="h-4 w-4" />
                    <span>20+ DAY REWARD: 1 FREE MEAL APPLIED!</span>
                  </div>
                )}
              </div>

              <Separator />

              <div className="pt-4 text-right space-y-1">
                <p className="text-muted-foreground text-xs uppercase font-bold tracking-widest">Total Investment</p>
                <div className="flex flex-col items-end">
                    <p className="text-5xl font-headline text-primary">
                        ₦{totalCost.toLocaleString('en-NG')}
                    </p>
                    {selectedDates.length > 0 && (
                        <p className="text-muted-foreground text-[10px] mt-1 italic">
                            Covers {selectedDates.length} premium meal combos
                        </p>
                    )}
                </div>
              </div>
            </div>

            <div className="pt-8">
              <AlertDialogTrigger asChild>
                <Button 
                    size="lg" 
                    className="w-full font-bold text-lg shadow-xl shadow-primary/20 h-14"
                    disabled={!isEligible}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {isEligible ? "Proceed to Checkout" : `Select at least ${MIN_DAYS} days`}
                </Button>
              </AlertDialogTrigger>
              {!isEligible && (
                <p className="text-[10px] text-center text-muted-foreground mt-2 italic">
                    * Minimum commitment of {MIN_DAYS} workdays required.
                </p>
              )}
            </div>
          </div>
        </div>
      </Card>

      <AlertDialogContent className="max-w-2xl border-primary/20 shadow-2xl p-0 overflow-y-auto max-h-[90vh]">
          <div className="p-6 bg-primary text-primary-foreground sticky top-0 z-10">
            <AlertDialogHeader>
                <AlertDialogTitle className="text-2xl font-headline">Almost Done!</AlertDialogTitle>
                <CardDescription className="text-primary-foreground/80">
                    You've locked in {selectedDates.length} meals. Let's get your delivery details.
                </CardDescription>
            </AlertDialogHeader>
          </div>
          <div className="p-6">
            <CheckoutForm plan={customPlan} />
          </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

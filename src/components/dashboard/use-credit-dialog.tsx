'use client';

import { useState } from 'react';
import type { DailyOrder } from '@/app/(dashboard)/dashboard/page';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Star, Utensils } from 'lucide-react';
import { useMenuStore } from '@/hooks/use-menu-store';
import { toDateString } from '@/lib/utils';

type UndoableAction = 'accept' | 'skip' | 'use_credit_meal';

interface UseCreditDialogProps {
    children: React.ReactNode;
    credits: number;
    updateCredits: (newCredits: number) => void;
    updateDailyOrder: (date: Date, newOrderData: Partial<DailyOrder>) => void;
    startUndoTimer: (action: UndoableAction, forDate: Date) => void;
}

export function UseCreditDialog({ children, credits, updateCredits, updateDailyOrder, startUndoTimer }: UseCreditDialogProps) {
    const { toast } = useToast();
    const { menu } = useMenuStore();
    const [date, setDate] = useState<Date | undefined>();
    const [open, setOpen] = useState(false);

    const handleRedeem = () => {
        if (!date || credits <= 0) {
            toast({
                title: 'Something went wrong',
                description: 'Please select a future date and ensure you have credits.',
                variant: 'destructive',
            });
            return;
        }

        startUndoTimer('use_credit_meal', date);

        updateCredits(credits - 1);
        updateDailyOrder(date, { extraMeal: true });

        toast({
            title: 'Credit Redeemed!',
            description: `An extra meal has been added for ${date.toLocaleDateString()}. You have 5 minutes to undo.`,
        });

        setDate(undefined); 
        setOpen(false); 
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isDateSelectable = (d: Date) => {
        if (d <= today) return false;
        if (d.getDay() === 0 || d.getDay() === 6) return false;
        
        const mealForDay = menu.get(toDateString(d));
        if(!mealForDay) return false;

        return true;
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Redeem a Meal Credit</DialogTitle>
                <DialogDescription>
                    Select a future date to schedule an extra meal. You have {credits} credit(s).
                </DialogDescription>
                </DialogHeader>
                <div className="py-4 flex justify-center">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(d) => !isDateSelectable(d)}
                        className="rounded-md border"
                    />
                </div>
                 <DialogFooter>
                    <Button 
                        onClick={handleRedeem} 
                        disabled={!date}
                        className="w-full"
                    >
                        <Utensils className="mr-2" /> Redeem Extra Meal
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

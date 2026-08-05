'use client';

import { useState, useEffect, useRef } from 'react';
import { WelcomeHeader } from '@/components/dashboard/welcome-header';
import { MealActionCard } from '@/components/dashboard/meal-action-card';
import { MealCreditTracker } from '@/components/dashboard/meal-credit-tracker';
import { WeeklyMenuCarousel } from '@/components/dashboard/weekly-menu-carousel';
import { DashboardCalendar } from '@/components/dashboard/dashboard-calendar';
import { DailyOrderSummary } from '@/components/dashboard/daily-order-summary';
import { AdminMessage } from '@/components/dashboard/admin-message';
import { UndoHistory } from '@/components/dashboard/undo-history';
import { userProfile, adminMessage as initialAdminMessage } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';


export type DailyOrder = {
  mealName: string | null;
  confirmed: boolean;
  extraMeal: boolean;
};

export type UndoableAction = 'accept' | 'skip' | 'use_credit_meal';

export type LastAction = {
  id: string;
  action: UndoableAction;
  date: Date;
  previousOrder: DailyOrder;
  previousCredits: number;
  timestamp: number;
};


// MOCK: In a real app, this would come from a global state/context
let globalCredits = userProfile.mealCredits;
export let globalAdminMessage = initialAdminMessage;

export const setGlobalAdminMessage = (newMessage: { title: string; message: string; }) => {
    globalAdminMessage = newMessage;
};


export default function UserDashboardPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dailyOrders, setDailyOrders] = useState<Map<string, DailyOrder>>(new Map());
  const [credits, setCredits] = useState(globalCredits);
  const [currentAdminMessage, setCurrentAdminMessage] = useState(globalAdminMessage);
  
  const [undoableActions, setUndoableActions] = useState<LastAction[]>([]);
  const { toast } = useToast();

   useEffect(() => {
    const interval = setInterval(() => {
      if (globalAdminMessage !== currentAdminMessage) {
        setCurrentAdminMessage(globalAdminMessage);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentAdminMessage]);

  useEffect(() => {
    const interval = setInterval(() => {
        const now = Date.now();
        const fiveMinutes = 5 * 60 * 1000;
        setUndoableActions(prev => prev.filter(action => now - action.timestamp < fiveMinutes));
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  const updateDailyOrder = (date: Date, newOrderData: Partial<DailyOrder>) => {
    const dateString = date.toDateString();
    const existingOrder = dailyOrders.get(dateString) || {
      mealName: null,
      confirmed: false,
      extraMeal: false,
    };
    
    setDailyOrders(prev => new Map(prev).set(dateString, { ...existingOrder, ...newOrderData }));
  };

  const updateCredits = (newCredits: number) => {
    globalCredits = newCredits;
    setCredits(newCredits);
  }
  
  const startUndoTimer = (action: UndoableAction, forDate: Date) => {
    const dateString = forDate.toDateString();
    const currentOrder = dailyOrders.get(dateString) || { mealName: null, confirmed: false, extraMeal: false };
    
    const newAction: LastAction = {
        id: uuidv4(),
        action,
        date: forDate,
        previousOrder: { ...currentOrder },
        previousCredits: credits,
        timestamp: Date.now(),
    };

    setUndoableActions(prev => [...prev, newAction]);
  };

  const handleUndo = (actionId: string) => {
    const actionToUndo = undoableActions.find(a => a.id === actionId);
    if (!actionToUndo) return;

    const dateToUndo = actionToUndo.date;
    updateDailyOrder(dateToUndo, actionToUndo.previousOrder);
    updateCredits(actionToUndo.previousCredits);
    
    setUndoableActions(prev => prev.filter(a => a.id !== actionId));

    toast({
        title: 'Action Undone',
        description: `Your last action has been reversed.`,
    });
  };

  const selectedDayOrder = date ? dailyOrders.get(date.toDateString()) : undefined;

  return (
    <div className="flex-1 p-4 md:p-8 space-y-6">
      <WelcomeHeader name={userProfile.name} />
      <AdminMessage messageData={currentAdminMessage} />
       <UndoHistory undoableActions={undoableActions} handleUndo={handleUndo} />
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <MealActionCard 
            date={date} 
            updateDailyOrder={updateDailyOrder}
            dailyOrder={selectedDayOrder}
            credits={credits}
            updateCredits={updateCredits}
            startUndoTimer={startUndoTimer}
            undoableActions={undoableActions}
            handleUndo={handleUndo}
          />
        </div>
        <div className="space-y-6">
          <MealCreditTracker 
            credits={credits}
            updateCredits={updateCredits}
            updateDailyOrder={updateDailyOrder}
            startUndoTimer={startUndoTimer}
          />
          <DashboardCalendar date={date} setDate={setDate} />
          <DailyOrderSummary date={date} order={selectedDayOrder} />
        </div>
      </div>
      <WeeklyMenuCarousel />
    </div>
  );
}

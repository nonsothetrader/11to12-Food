
'use client';

import { Calendar } from '@/components/ui/calendar';

interface DashboardCalendarProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export function DashboardCalendar({ date, setDate }: DashboardCalendarProps) {
  return (
    <div className="flex justify-center items-start">
        <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
        />
    </div>
  );
}

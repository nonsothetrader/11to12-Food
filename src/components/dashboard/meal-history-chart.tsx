
'use client';

import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend } from '@/components/ui/chart';
import { mealHistory } from '@/lib/data';

const chartConfig = {
    chicken: {
      label: 'Chicken',
      color: 'hsl(var(--chart-1))',
    },
    beef: {
      label: 'Beef',
      color: 'hsl(var(--chart-2))',
    },
    vegetarian: {
      label: 'Vegetarian',
      color: 'hsl(var(--chart-3))',
    },
};

export function MealHistoryChart() {
  return (
    <div className="h-[200px] w-full">
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart data={mealHistory} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="chicken" fill="var(--color-chicken)" radius={4} />
                <Bar dataKey="beef" fill="var(--color-beef)" radius={4} />
                <Bar dataKey="vegetarian" fill="var(--color-vegetarian)" radius={4} />
                <ChartLegend content={<ChartLegend />} />
            </BarChart>
        </ChartContainer>
    </div>
  );
}

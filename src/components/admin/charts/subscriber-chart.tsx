
'use client';

import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const chartData = [
  { month: "January", subscribers: 186 },
  { month: "February", subscribers: 205 },
  { month: "March", subscribers: 237 },
  { month: "April", subscribers: 203 },
  { month: "May", subscribers: 254 },
  { month: "June", subscribers: 280 },
];

const chartConfig = {
  subscribers: {
    label: "Subscribers",
    color: "hsl(var(--primary))",
  },
};

export function SubscriberChart() {
  return (
    <div className="h-[250px] w-full">
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart data={chartData} accessibilityLayer>
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
                <Bar dataKey="subscribers" fill="var(--color-subscribers)" radius={4} />
            </BarChart>
        </ChartContainer>
    </div>
  );
}

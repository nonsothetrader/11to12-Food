
'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const chartData = [
  { meal: "Lemon Herb Chicken", ratings: 125, fill: "var(--color-chicken)" },
  { meal: "Beef Stir-fry", ratings: 98, fill: "var(--color-beef)" },
  { meal: "Quinoa Power Bowl", ratings: 85, fill: "var(--color-quinoa)" },
  { meal: "Black Bean Burgers", ratings: 72, fill: "var(--color-bean)" },
  { meal: "Creamy Tomato Soup", ratings: 60, fill: "var(--color-soup)" },
];

const chartConfig = {
  ratings: { label: "Total Ratings" },
  chicken: { label: "Lemon Herb Chicken", color: "hsl(var(--chart-1))" },
  beef: { label: "Beef Stir-fry", color: "hsl(var(--chart-2))" },
  quinoa: { label: "Quinoa Power Bowl", color: "hsl(var(--chart-3))" },
  bean: { label: "Black Bean Burgers", color: "hsl(var(--chart-4))" },
  soup: { label: "Creamy Tomato Soup", color: "hsl(var(--chart-5))" },
};

export function PopularMealsChart() {
  return (
    <div className="h-[300px] w-full">
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart
          data={chartData}
          layout="vertical"
          accessibilityLayer
          margin={{ left: 10, right: 10 }}
        >
          <CartesianGrid horizontal={false} />
          <YAxis
            dataKey="meal"
            type="category"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            width={120}
            tickFormatter={(value) => value.length > 15 ? `${value.substring(0, 15)}...` : value}
          />
          <XAxis dataKey="ratings" type="number" hide />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Bar dataKey="ratings" layout="vertical" radius={5} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

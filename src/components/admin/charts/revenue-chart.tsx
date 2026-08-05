
'use client';

import { Line, LineChart, CartesianGrid, XAxis, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const chartData = [
  { month: "January", revenue: 850000 },
  { month: "February", revenue: 920000 },
  { month: "March", revenue: 1100000 },
  { month: "April", revenue: 980000 },
  { month: "May", revenue: 1150000 },
  { month: "June", revenue: 1250000 },
];

const chartConfig = {
  revenue: {
    label: "Revenue (₦)",
    color: "hsl(var(--primary))",
  },
};

export function RevenueChart() {
  return (
    <div className="h-[250px] w-full">
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <LineChart data={chartData} accessibilityLayer margin={{ left: 12, right: 12 }}>
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
            content={
                <ChartTooltipContent
                    formatter={(value) => `₦${Number(value).toLocaleString()}`}
                    indicator="dot"
                />
            }
          />
          <Line
            dataKey="revenue"
            type="monotone"
            stroke="var(--color-revenue)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

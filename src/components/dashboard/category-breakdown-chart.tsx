'use client';

import * as React from 'react';
import { Pie, PieChart, Cell, Tooltip } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
  ChartLegend,
  ChartLegendContent
} from '@/components/ui/chart';
import { categoryBreakdown } from '@/lib/data';

const chartConfig = {
  value: {
    label: 'Value',
  },
  groceries: {
    label: 'Groceries',
    color: 'hsl(var(--chart-1))',
  },
  food: {
    label: 'Food & Drink',
    color: 'hsl(var(--chart-2))',
  },
  shopping: {
    label: 'Shopping',
    color: 'hsl(var(--chart-3))',
  },
  transport: {
    label: 'Transport',
    color: 'hsl(var(--chart-4))',
  },
  entertainment: {
    label: 'Entertainment',
    color: 'hsl(var(--chart-5))',
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--muted))',
  },
} satisfies ChartConfig;

export function CategoryBreakdownChart() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Category Breakdown</CardTitle>
        <CardDescription>Spending by category this month</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-full max-h-[250px]"
        >
          <PieChart>
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={categoryBreakdown}
              dataKey="value"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              {categoryBreakdown.map((entry) => (
                <Cell key={entry.category} fill={entry.fill} />
              ))}
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="category" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

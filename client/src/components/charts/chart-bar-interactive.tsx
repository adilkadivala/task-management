"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";

export const description = "A multiple bar chart";

const chartData = [
  { month: "Jan", low: 5, medium: 36, high: 55 },
  { month: "Feb", low: 8, medium: 25, high: 12 },
  { month: "Mar", low: 2, medium: 18, high: 5 },
  { month: "Apr", low: 10, medium: 50, high: 20 },
  { month: "May", low: 3, medium: 7, high: 5 },
  { month: "Jun", low: 40, medium: 26, high: 15 },
];

const chartConfig = {
  high: {
    label: "High",
    color: "var(--color-chart-1)",
  },
  medium: {
    label: "Medium",
    color: "var(--color-chart-2)",
  },
  low: {
    label: "Low",
    color: "var(--color-chart-3)",
  },
} satisfies ChartConfig;

export function ChartBarPriority() {
  return (
    <Card className="h-full justify-between">
      <CardHeader>
        <CardTitle>Task Priority </CardTitle>
        <CardDescription>Last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="high" fill={chartConfig.high.color} radius={4} />
            <Bar dataKey="medium" fill={chartConfig.medium.color} radius={4} />
            <Bar dataKey="low" fill={chartConfig.low.color} radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

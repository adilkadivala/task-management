"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardAction,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const description = "one place for all Task status Visualization";

const chartData = [
  { date: "2024-04-01", completed: 222, progress: 150, todo: 35 },
  { date: "2024-04-02", completed: 97, progress: 180, todo: 45 },
  { date: "2024-04-03", completed: 167, progress: 120, todo: 20 },
  { date: "2024-04-04", completed: 242, progress: 260, todo: 60 },
  { date: "2024-04-05", completed: 373, progress: 290, todo: 42 },
  { date: "2024-04-06", completed: 301, progress: 340, todo: 200 },
  { date: "2024-04-07", completed: 245, progress: 180, todo: 25 },
  { date: "2024-04-08", completed: 409, progress: 320, todo: 40 },
  { date: "2024-04-09", completed: 59, progress: 110, todo: 80 },
  { date: "2024-04-10", completed: 261, progress: 190, todo: 35 },
  { date: "2024-04-11", completed: 327, progress: 350, todo: 50 },
  { date: "2024-04-12", completed: 292, progress: 210, todo: 25 },
  { date: "2024-04-13", completed: 342, progress: 380, todo: 65 },
  { date: "2024-04-14", completed: 137, progress: 220, todo: 30 },
  { date: "2024-04-15", completed: 120, progress: 170, todo: 15 },
  { date: "2024-04-16", completed: 138, progress: 190, todo: 20 },
  { date: "2024-04-17", completed: 446, progress: 360, todo: 200 },
  { date: "2024-04-18", completed: 364, progress: 410, todo: 40 },
  { date: "2024-04-19", completed: 243, progress: 180, todo: 35 },
  { date: "2024-04-20", completed: 89, progress: 150, todo: 90 },
  { date: "2024-04-21", completed: 137, progress: 200, todo: 22 },
  { date: "2024-04-22", completed: 224, progress: 170, todo: 25 },
  { date: "2024-04-23", completed: 138, progress: 230, todo: 33 },
  { date: "2024-04-24", completed: 387, progress: 290, todo: 42 },
  { date: "2024-04-25", completed: 215, progress: 250, todo: 30 },
  { date: "2024-04-26", completed: 75, progress: 130, todo: 14 },
  { date: "2024-04-27", completed: 383, progress: 420, todo: 48 },
  { date: "2024-04-28", completed: 122, progress: 180, todo: 26 },
  { date: "2024-04-29", completed: 315, progress: 240, todo: 33 },
  { date: "2024-04-30", completed: 454, progress: 380, todo: 60 },
  { date: "2024-05-01", completed: 165, progress: 220, todo: 25 },
  { date: "2024-05-02", completed: 293, progress: 310, todo: 35 },
  { date: "2024-05-03", completed: 247, progress: 190, todo: 28 },
  { date: "2024-05-04", completed: 385, progress: 420, todo: 45 },
  { date: "2024-05-05", completed: 481, progress: 390, todo: 200 },
  { date: "2024-05-06", completed: 498, progress: 520, todo: 70 },
  { date: "2024-05-07", completed: 388, progress: 300, todo: 40 },
  { date: "2024-05-08", completed: 149, progress: 210, todo: 22 },
  { date: "2024-05-09", completed: 227, progress: 180, todo: 26 },
  { date: "2024-05-10", completed: 293, progress: 330, todo: 36 },
  { date: "2024-05-11", completed: 335, progress: 270, todo: 38 },
  { date: "2024-05-12", completed: 197, progress: 240, todo: 20 },
  { date: "2024-05-13", completed: 197, progress: 160, todo: 25 },
  { date: "2024-05-14", completed: 448, progress: 490, todo: 60 },
  { date: "2024-05-15", completed: 473, progress: 380, todo: 45 },
  { date: "2024-05-16", completed: 338, progress: 400, todo: 40 },
  { date: "2024-05-17", completed: 499, progress: 420, todo: 200 },
  { date: "2024-05-18", completed: 315, progress: 350, todo: 32 },
  { date: "2024-05-19", completed: 235, progress: 180, todo: 27 },
  { date: "2024-05-20", completed: 177, progress: 230, todo: 20 },
  { date: "2024-05-21", completed: 82, progress: 140, todo: 12 },
  { date: "2024-05-22", completed: 81, progress: 120, todo: 80 },
  { date: "2024-05-23", completed: 252, progress: 290, todo: 33 },
  { date: "2024-05-24", completed: 294, progress: 220, todo: 25 },
  { date: "2024-05-25", completed: 201, progress: 250, todo: 22 },
  { date: "2024-05-26", completed: 213, progress: 170, todo: 15 },
  { date: "2024-05-27", completed: 420, progress: 460, todo: 40 },
  { date: "2024-05-28", completed: 233, progress: 190, todo: 90 },
  { date: "2024-05-29", completed: 78, progress: 130, todo: 14 },
  { date: "2024-05-30", completed: 340, progress: 280, todo: 32 },
  { date: "2024-05-31", completed: 178, progress: 230, todo: 20 },
  { date: "2024-06-01", completed: 178, progress: 200, todo: 28 },
  { date: "2024-06-02", completed: 470, progress: 410, todo: 200 },
  { date: "2024-06-03", completed: 103, progress: 160, todo: 12 },
  { date: "2024-06-04", completed: 439, progress: 380, todo: 45 },
  { date: "2024-06-05", completed: 88, progress: 140, todo: 80 },
  { date: "2024-06-06", completed: 294, progress: 250, todo: 30 },
  { date: "2024-06-07", completed: 323, progress: 370, todo: 40 },
  { date: "2024-06-08", completed: 385, progress: 320, todo: 42 },
  { date: "2024-06-09", completed: 438, progress: 480, todo: 200 },
  { date: "2024-06-10", completed: 155, progress: 200, todo: 90 },
  { date: "2024-06-11", completed: 92, progress: 150, todo: 12 },
  { date: "2024-06-12", completed: 492, progress: 420, todo: 60 },
  { date: "2024-06-13", completed: 81, progress: 130, todo: 80 },
  { date: "2024-06-14", completed: 426, progress: 380, todo: 42 },
  { date: "2024-06-15", completed: 307, progress: 350, todo: 33 },
  { date: "2024-06-16", completed: 371, progress: 310, todo: 28 },
  { date: "2024-06-17", completed: 475, progress: 520, todo: 60 },
  { date: "2024-06-18", completed: 107, progress: 170, todo: 15 },
  { date: "2024-06-19", completed: 341, progress: 290, todo: 35 },
  { date: "2024-06-20", completed: 408, progress: 450, todo: 50 },
  { date: "2024-06-21", completed: 169, progress: 210, todo: 20 },
  { date: "2024-06-22", completed: 317, progress: 270, todo: 30 },
  { date: "2024-06-23", completed: 480, progress: 530, todo: 65 },
  { date: "2024-06-24", completed: 132, progress: 180, todo: 90 },
  { date: "2024-06-25", completed: 141, progress: 190, todo: 15 },
  { date: "2024-06-26", completed: 434, progress: 380, todo: 45 },
  { date: "2024-06-27", completed: 448, progress: 490, todo: 200 },
  { date: "2024-06-28", completed: 149, progress: 200, todo: 22 },
  { date: "2024-06-29", completed: 103, progress: 160, todo: 14 },
  { date: "2024-06-30", completed: 446, progress: 400, todo: 50 },
];

const chartConfig = {
  Task: {
    label: "Task",
  },
  completed: {
    label: "Completed",
    color: "var(--primary)",
  },
  progress: {
    label: "Progress",
    color: "#3B9797",
  },
  todo: {
    label: "Todo",
    color: "#6EACDA",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Tasks</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total for the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-completed)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-completed)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillProgress" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-progress)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-progress)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillTodo" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-todo)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-todo)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="todo"
              type="natural"
              fill="url(#fillTodo)"
              stroke="var(--color-todo)"
              stackId="a"
            />
            <Area
              dataKey="progress"
              type="natural"
              fill="url(#fillProgress)"
              stroke="var(--color-progress)"
              stackId="a"
            />
            <Area
              dataKey="completed"
              type="natural"
              fill="url(#fillCompleted)"
              stroke="var(--color-completed)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

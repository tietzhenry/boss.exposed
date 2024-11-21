"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { hour: "00:00", desktop: 0, mobile: 15 },
  { hour: "01:00", desktop: 10, mobile: 8 },
  { hour: "02:00", desktop: 15, mobile: 10 },
  { hour: "03:00", desktop: 5, mobile: 7 },
  { hour: "04:00", desktop: 8, mobile: 6 },
  { hour: "05:00", desktop: 13, mobile: 10 },
  { hour: "23:00", desktop: 25, mobile: 20 },
];

const chartConfig: ChartConfig = {
  desktop: { label: "Desktop", color: "#7b39ed" },
  mobile: { label: "Mobile", color: "#f3f4f6" },
};

export function ProfileViewChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} className=""/>
        <XAxis
          dataKey="hour"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 5)} 
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="desktop" fill={chartConfig.desktop.color} radius={4} />
        <Bar dataKey="mobile" fill={chartConfig.mobile.color} radius={4} />
      </BarChart>
    </ChartContainer>
  );
}

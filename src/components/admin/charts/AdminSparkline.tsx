"use client";

import * as React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface AdminSparklineProps {
  data: { value: number }[];
  color?: "gold" | "green" | "red" | "gray";
}

const colorMap = {
  gold: "#C8A86B",
  green: "#16a34a",
  red: "#dc2626",
  gray: "#a3a3a3",
};

export function AdminSparkline({ data, color = "gold" }: AdminSparklineProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={colorMap[color]}
          strokeWidth={2}
          dot={false}
          isAnimationActive={true}
          animationDuration={1500}
          animationEasing="ease-in-out"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

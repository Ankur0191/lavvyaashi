"use client";

import * as React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { name: "Organic Search", value: 4500, color: "#C8A86B" },
  { name: "Direct", value: 3000, color: "#A68A57" },
  { name: "Social Media", value: 1500, color: "#DFCA9B" },
  { name: "Referral", value: 800, color: "#e5d9ab" },
  { name: "Email", value: 500, color: "#f0ead3" },
];

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-4 py-3 shadow-lg flex items-center gap-3">
      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }} />
      <div>
        <p className="text-xs font-medium text-[var(--text-muted)]">{data.name}</p>
        <p className="text-sm font-semibold text-[var(--text)]">
          {data.value.toLocaleString()} visitors
        </p>
      </div>
    </div>
  );
}

function CustomLegend({ payload }: any) {
  return (
    <ul className="flex flex-col gap-2 mt-4">
      {payload.map((entry: any, index: number) => (
        <li key={`item-${index}`} className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-[var(--text-muted)]">{entry.value}</span>
          </div>
          <span className="font-medium text-[var(--text)]">
            {entry.payload.value.toLocaleString()}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function TrafficSourcesChart() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
              isAnimationActive={true}
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

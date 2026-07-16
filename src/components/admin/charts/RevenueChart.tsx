"use client";

import * as React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// 30-day mock revenue data
const data = [
  { day: "Jun 17", revenue: 2400, orders: 18 },
  { day: "Jun 18", revenue: 1800, orders: 14 },
  { day: "Jun 19", revenue: 3200, orders: 24 },
  { day: "Jun 20", revenue: 2800, orders: 21 },
  { day: "Jun 21", revenue: 3600, orders: 28 },
  { day: "Jun 22", revenue: 4100, orders: 32 },
  { day: "Jun 23", revenue: 3900, orders: 30 },
  { day: "Jun 24", revenue: 4500, orders: 35 },
  { day: "Jun 25", revenue: 4200, orders: 33 },
  { day: "Jun 26", revenue: 3800, orders: 29 },
  { day: "Jun 27", revenue: 5100, orders: 40 },
  { day: "Jun 28", revenue: 4800, orders: 38 },
  { day: "Jun 29", revenue: 5400, orders: 42 },
  { day: "Jun 30", revenue: 5000, orders: 39 },
  { day: "Jul 1", revenue: 5800, orders: 45 },
  { day: "Jul 2", revenue: 6200, orders: 48 },
  { day: "Jul 3", revenue: 5600, orders: 43 },
  { day: "Jul 4", revenue: 7100, orders: 55 },
  { day: "Jul 5", revenue: 6800, orders: 52 },
  { day: "Jul 6", revenue: 7400, orders: 58 },
  { day: "Jul 7", revenue: 6900, orders: 53 },
  { day: "Jul 8", revenue: 7800, orders: 60 },
  { day: "Jul 9", revenue: 8200, orders: 64 },
  { day: "Jul 10", revenue: 7500, orders: 58 },
  { day: "Jul 11", revenue: 8800, orders: 68 },
  { day: "Jul 12", revenue: 9100, orders: 71 },
  { day: "Jul 13", revenue: 8500, orders: 66 },
  { day: "Jul 14", revenue: 9800, orders: 76 },
  { day: "Jul 15", revenue: 10200, orders: 79 },
  { day: "Jul 16", revenue: 12450, orders: 96 },
];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-4 py-3 shadow-lg">
      <p className="text-xs font-medium text-[var(--text-muted)] mb-1">{label}</p>
      <p className="text-sm font-semibold text-[var(--text)]">
        ${payload[0].value.toLocaleString()}
      </p>
      {payload[1] && (
        <p className="text-xs text-[var(--text-muted)] mt-0.5">
          {payload[1].value} orders
        </p>
      )}
    </div>
  );
}

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#C8A86B" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#C8A86B" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" vertical={false} />
        <XAxis
          dataKey="day"
          tick={{ fontSize: 11, fill: "#A3A3A3" }}
          tickLine={false}
          axisLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          tick={{ fontSize: 11, fill: "#A3A3A3" }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#C8A86B"
          strokeWidth={2.5}
          fill="url(#revenueGradient)"
          isAnimationActive={true}
          animationDuration={1500}
          animationEasing="ease-in-out"
        />
        <Area
          type="monotone"
          dataKey="orders"
          stroke="#A3A3A3"
          strokeWidth={1.5}
          strokeDasharray="4 4"
          fill="none"
          isAnimationActive={true}
          animationDuration={1500}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

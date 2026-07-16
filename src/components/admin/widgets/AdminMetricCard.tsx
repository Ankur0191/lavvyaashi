"use client";

import * as React from "react";
import { AdminCard, AdminCardContent } from "@/components/admin/ui/AdminCard";
import { cn } from "@/utils";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";

interface AdminMetricCardProps {
  title: string;
  value: string;
  trend?: number; // e.g. 12.5 for +12.5%
  trendLabel?: string;
  icon?: React.ReactNode;
  sparkline?: React.ReactNode;
  delay?: number;
}

export function AdminMetricCard({
  title,
  value,
  trend,
  trendLabel,
  icon,
  sparkline,
  delay = 0,
}: AdminMetricCardProps) {
  const isPositive = trend && trend > 0;
  const isNegative = trend && trend < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <AdminCard hoverLift className="h-full flex flex-col justify-between">
        <AdminCardContent className="p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-[var(--text-muted)] tracking-tight">
              {title}
            </h4>
            {icon && (
              <div className="w-8 h-8 rounded-lg bg-[var(--bg-primary)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)]">
                {icon}
              </div>
            )}
          </div>
          
          <div>
            <div className="text-2xl font-semibold tracking-tight text-[var(--text)]">
              {value}
            </div>
            
            {(trend !== undefined || trendLabel) && (
              <div className="flex items-center gap-2 mt-2 text-xs">
                {trend !== undefined && (
                  <span
                    className={cn(
                      "flex items-center font-medium",
                      isPositive ? "text-green-600" : isNegative ? "text-red-600" : "text-[var(--text-muted)]"
                    )}
                  >
                    {isPositive ? (
                      <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                    ) : isNegative ? (
                      <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
                    ) : null}
                    {Math.abs(trend)}%
                  </span>
                )}
                {trendLabel && (
                  <span className="text-[var(--text-subtle)]">{trendLabel}</span>
                )}
              </div>
            )}
          </div>

          {sparkline && (
            <div className="mt-4 h-[40px] w-full">
              {sparkline}
            </div>
          )}
        </AdminCardContent>
      </AdminCard>
    </motion.div>
  );
}

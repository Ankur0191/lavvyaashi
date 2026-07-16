"use client";

import * as React from "react";
import { AdminMetricCard } from "@/components/admin/widgets/AdminMetricCard";
import { AdminSparkline } from "@/components/admin/charts/AdminSparkline";
import { RevenueChart } from "@/components/admin/charts/RevenueChart";
import { TrafficSourcesChart } from "@/components/admin/charts/TrafficSourcesChart";
import { DollarSign, ShoppingBag, Users, MousePointerClick, Calendar as CalendarIcon } from "lucide-react";
import { motion } from "framer-motion";
import { AdminCard, AdminCardHeader, AdminCardTitle, AdminCardContent } from "@/components/admin/ui/AdminCard";
import { AdminButton } from "@/components/admin/ui/AdminButton";

// Mock data for sparklines
const revenueData = Array.from({ length: 14 }).map((_, i) => ({ value: 1000 + Math.random() * 500 + i * 50 }));
const ordersData = Array.from({ length: 14 }).map((_, i) => ({ value: 20 + Math.random() * 10 + i * 2 }));
const visitorsData = Array.from({ length: 14 }).map((_, i) => ({ value: 500 + Math.random() * 200 }));
const conversionData = Array.from({ length: 14 }).map((_, i) => ({ value: 2 + Math.random() * 1.5 }));

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-[var(--space-4)] pb-[var(--space-6)]">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-[var(--space-3)] mb-[var(--space-2)]">
        <div>
          <h1 className="text-[var(--text-title)] font-semibold tracking-tight text-[var(--text)] leading-none mb-[var(--space-1)]">
            Overview
          </h1>
          <p className="text-[var(--text-body)] text-[var(--text-muted)]">
            Your luxury business operating system at a glance.
          </p>
        </div>
        
        <div className="flex items-center gap-[var(--space-2)]">
          <AdminButton variant="outline" className="text-[var(--text-body)]">
            <CalendarIcon className="w-4 h-4 mr-2" />
            Last 30 Days
          </AdminButton>
          <AdminButton variant="default" className="text-[var(--text-body)]">
            Download Report
          </AdminButton>
        </div>
      </div>

      {/* Top Row: Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[var(--space-3)]">
        <AdminMetricCard
          title="Today's Revenue"
          value="$12,450.00"
          trend={14.5}
          trendLabel="vs last week"
          icon={<DollarSign className="w-[18px] h-[18px]" />}
          sparkline={<AdminSparkline data={revenueData} color="gold" />}
          delay={0.1}
        />
        <AdminMetricCard
          title="Orders & Pending"
          value="142"
          trend={8.2}
          trendLabel="vs last week"
          icon={<ShoppingBag className="w-[18px] h-[18px]" />}
          sparkline={<AdminSparkline data={ordersData} color="green" />}
          delay={0.15}
        />
        <AdminMetricCard
          title="Visitors"
          value="8,234"
          trend={-2.4}
          trendLabel="vs last week"
          icon={<Users className="w-[18px] h-[18px]" />}
          sparkline={<AdminSparkline data={visitorsData} color="gray" />}
          delay={0.2}
        />
        <AdminMetricCard
          title="Conversion Rate"
          value="3.2%"
          trend={1.2}
          trendLabel="vs last week"
          icon={<MousePointerClick className="w-[18px] h-[18px]" />}
          sparkline={<AdminSparkline data={conversionData} color="gold" />}
          delay={0.25}
        />
      </div>

      {/* Second Row: Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-[70%_minmax(0,1fr)] gap-[var(--space-3)]">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-col h-full"
        >
          <AdminCard className="flex-1 flex flex-col min-h-[400px]">
            <AdminCardHeader>
              <AdminCardTitle>Revenue & Engagement</AdminCardTitle>
            </AdminCardHeader>
            <AdminCardContent className="flex-1 flex flex-col p-[var(--space-3)] pt-0">
              <div className="flex-1 h-full w-full min-h-[300px]">
                <RevenueChart />
              </div>
            </AdminCardContent>
          </AdminCard>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="flex flex-col h-full"
        >
          <AdminCard className="flex-1 flex flex-col min-h-[400px]">
            <AdminCardHeader>
              <AdminCardTitle>Traffic Sources</AdminCardTitle>
            </AdminCardHeader>
            <AdminCardContent className="flex-1 flex flex-col p-[var(--space-3)] pt-0">
              <div className="flex-1 h-full w-full min-h-[300px]">
                <TrafficSourcesChart />
              </div>
            </AdminCardContent>
          </AdminCard>
        </motion.div>
      </div>

      {/* Third Row: Operational Action */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[var(--space-3)]">
        
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex flex-col h-full"
        >
          <AdminCard className="flex-1 flex flex-col min-h-[360px]">
            <AdminCardHeader>
              <AdminCardTitle>Recent Orders</AdminCardTitle>
            </AdminCardHeader>
            <AdminCardContent className="flex-1 overflow-y-auto max-h-[300px] scrollbar-thin text-[var(--text-muted)] text-[var(--text-body)]">
              <div className="flex flex-col gap-[var(--space-2)]">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-start gap-[var(--space-2)] p-2 hover:bg-[var(--bg-primary)] rounded-lg transition-colors cursor-pointer border border-transparent hover:border-[var(--border-light)]">
                    <div className="w-2 h-2 mt-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                    <div>
                      <p className="text-[var(--text)] font-medium">Order #100{i} placed</p>
                      <p className="text-[var(--text-label)] text-[var(--text-subtle)] mt-0.5">2 minutes ago by Customer {i}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AdminCardContent>
          </AdminCard>
        </motion.div>

        {/* Inventory Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="flex flex-col h-full"
        >
          <AdminCard className="flex-1 flex flex-col min-h-[360px]">
            <AdminCardHeader>
              <AdminCardTitle>Inventory Alerts</AdminCardTitle>
            </AdminCardHeader>
            <AdminCardContent className="flex-1 overflow-y-auto max-h-[300px] scrollbar-thin text-[var(--text-muted)] text-[var(--text-body)]">
              <div className="flex flex-col gap-[var(--space-2)]">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-[var(--space-2)] border border-red-100 bg-red-50/50 rounded-lg">
                    <div className="flex items-center gap-[var(--space-2)]">
                      <div className="w-8 h-8 rounded bg-red-100 flex items-center justify-center text-red-600 font-bold text-xs shrink-0">
                        {i}
                      </div>
                      <div>
                        <p className="text-red-900 font-medium text-[var(--text-body)]">Luxury Serum V{i}</p>
                        <p className="text-[var(--text-label)] text-red-600/80">Only 4 units left</p>
                      </div>
                    </div>
                    <button className="text-[var(--text-label)] font-medium text-red-700 hover:underline shrink-0 ml-2">Restock</button>
                  </div>
                ))}
              </div>
            </AdminCardContent>
          </AdminCard>
        </motion.div>

        {/* Recent Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="flex flex-col h-full"
        >
          <AdminCard className="flex-1 flex flex-col min-h-[360px]">
            <AdminCardHeader>
              <AdminCardTitle>Recent Reviews</AdminCardTitle>
            </AdminCardHeader>
            <AdminCardContent className="flex-1 overflow-y-auto max-h-[300px] scrollbar-thin text-[var(--text-muted)] text-[var(--text-body)]">
              <div className="flex flex-col gap-[var(--space-2)]">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex flex-col gap-1 p-[var(--space-2)] border border-[var(--border-light)] rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--text)] font-medium">Jane Doe</span>
                      <span className="text-yellow-500 text-[10px]">★★★★★</span>
                    </div>
                    <p className="text-[var(--text-label)] text-[var(--text-muted)] line-clamp-2">
                      Absolutely love the texture of this cream. It leaves my skin glowing all day long.
                    </p>
                  </div>
                ))}
              </div>
            </AdminCardContent>
          </AdminCard>
        </motion.div>

      </div>
    </div>
  );
}

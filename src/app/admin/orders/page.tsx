"use client";

import * as React from "react";
import { AdminCard, AdminCardContent, AdminCardHeader, AdminCardTitle } from "@/components/admin/ui/AdminCard";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { Plus, Search, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { AdminBadge } from "@/components/admin/ui/AdminBadge";

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--text)]">Orders</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Manage luxury fulfillment and order timelines.
          </p>
        </div>
        <AdminButton variant="default">
          <Plus className="w-4 h-4 mr-2" />
          Create Order
        </AdminButton>
      </div>

      {/* Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-4 bg-[var(--bg-card)] p-2 rounded-xl border border-[var(--border)] shadow-sm"
      >
        <div className="flex-1 flex items-center gap-2 px-3">
          <Search className="w-4 h-4 text-[var(--text-muted)]" />
          <input 
            type="text" 
            placeholder="Search by order ID, customer, or email..." 
            className="w-full bg-transparent border-none outline-none text-sm text-[var(--text)] placeholder:text-[var(--text-subtle)]"
          />
        </div>
        <div className="w-[1px] h-6 bg-[var(--border)]" />
        <AdminButton variant="ghost" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </AdminButton>
      </motion.div>

      {/* Data Grid Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <AdminCard>
          <AdminCardHeader>
            <AdminCardTitle>Recent Orders</AdminCardTitle>
          </AdminCardHeader>
          <AdminCardContent className="p-0">
            <div className="w-full overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] bg-[var(--bg-primary)]/50 border-b border-[var(--border)]">
                  <tr>
                    <th className="px-6 py-4 font-medium">Order ID</th>
                    <th className="px-6 py-4 font-medium">Customer</th>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-light)]">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="hover:bg-[var(--bg-primary)]/40 transition-colors group cursor-pointer">
                      <td className="px-6 py-4 font-medium text-[var(--text)]">#LAV-204{i}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-[var(--border)] shrink-0" />
                          <span className="font-medium text-[var(--text)]">Jane Doe {i}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[var(--text-muted)]">Today, 10:4{i} AM</td>
                      <td className="px-6 py-4">
                        <AdminBadge variant={i % 2 === 0 ? "success" : "warning"}>
                          {i % 2 === 0 ? "Fulfilled" : "Processing"}
                        </AdminBadge>
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-[var(--text)]">$345.00</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination Placeholder */}
            <div className="px-6 py-4 border-t border-[var(--border-light)] flex items-center justify-between text-xs text-[var(--text-muted)]">
              <span>Showing 1 to 5 of 124 orders</span>
              <div className="flex gap-2">
                <AdminButton variant="outline" size="sm" disabled>Previous</AdminButton>
                <AdminButton variant="outline" size="sm">Next</AdminButton>
              </div>
            </div>
          </AdminCardContent>
        </AdminCard>
      </motion.div>
    </div>
  );
}

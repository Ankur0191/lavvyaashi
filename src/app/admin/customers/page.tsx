"use client";

import * as React from "react";
import { AdminCard, AdminCardContent, AdminCardHeader, AdminCardTitle } from "@/components/admin/ui/AdminCard";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { Search, Filter, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { AdminBadge } from "@/components/admin/ui/AdminBadge";

export default function AdminCustomersPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--text)]">Customers</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            CRM and lifecycle management for your luxury clientele.
          </p>
        </div>
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
            placeholder="Search customers by name, email, or phone..." 
            className="w-full bg-transparent border-none outline-none text-sm text-[var(--text)] placeholder:text-[var(--text-subtle)]"
          />
        </div>
        <div className="w-[1px] h-6 bg-[var(--border)]" />
        <AdminButton variant="ghost" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </AdminButton>
      </motion.div>

      {/* Customers List */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <AdminCard>
          <AdminCardHeader>
            <AdminCardTitle>Client Directory</AdminCardTitle>
          </AdminCardHeader>
          <AdminCardContent className="p-0">
            <div className="w-full overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] bg-[var(--bg-primary)]/50 border-b border-[var(--border)]">
                  <tr>
                    <th className="px-6 py-4 font-medium">Customer</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Orders</th>
                    <th className="px-6 py-4 font-medium">Lifetime Value</th>
                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-light)]">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <tr key={i} className="hover:bg-[var(--bg-primary)]/40 transition-colors group cursor-pointer">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--border)] to-[var(--bg-primary)] shrink-0 flex items-center justify-center text-xs font-semibold text-[var(--text-muted)]">
                            {String.fromCharCode(64 + i)}
                          </div>
                          <div>
                            <p className="font-medium text-[var(--text)]">Luxury Client {i}</p>
                            <p className="text-xs text-[var(--text-subtle)]">client{i}@example.com</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <AdminBadge variant={i === 1 ? "gold" : "default"}>
                          {i === 1 ? "VIP" : "Active"}
                        </AdminBadge>
                      </td>
                      <td className="px-6 py-4 text-[var(--text-muted)]">{i * 3}</td>
                      <td className="px-6 py-4 font-medium text-[var(--text)]">${(i * 450).toFixed(2)}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-[var(--text-muted)] hover:text-[var(--text)] p-1 rounded hover:bg-[var(--bg-primary)] transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AdminCardContent>
        </AdminCard>
      </motion.div>
    </div>
  );
}

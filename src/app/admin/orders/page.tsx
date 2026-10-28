import * as React from "react";
import { AdminCard, AdminCardContent, AdminCardHeader, AdminCardTitle } from "@/components/admin/ui/AdminCard";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { Plus, Search, Filter } from "lucide-react";
import { MotionDiv } from "@/components/admin/ui/ClientMotion";
import { AdminBadge } from "@/components/admin/ui/AdminBadge";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatPrice } from "@/utils";
import Link from "next/link";
import { OrderStatusSelect } from "@/components/admin/orders/OrderStatusSelect";
import { DownloadLabelButton } from "@/components/admin/orders/DownloadLabelButton";

export default async function AdminOrdersPage() {
  const supabase = createAdminClient();
  const { data: orders } = await supabase
    .from("orders")
    .select("*, profiles(name, email)")
    .order("created_at", { ascending: false });
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
      <MotionDiv
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
      </MotionDiv>

      {/* Data Grid Placeholder */}
      <MotionDiv
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
                    <th className="px-6 py-4 font-medium text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-light)]">
                  {orders?.map((order) => (
                    <tr key={order.id} className="hover:bg-[var(--bg-primary)]/40 transition-colors group cursor-pointer">
                      <td className="px-6 py-4 font-medium text-[var(--text)]">#{order.id.slice(0,8).toUpperCase()}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-[var(--border)] shrink-0" />
                          <span className="font-medium text-[var(--text)]">{order.profiles?.name || "Guest"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[var(--text-muted)]">{new Date(order.created_at).toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-[var(--text)]">{formatPrice(order.total)}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center items-center gap-2">
                          <Link href={`/admin/orders/${order.id}`} className="px-3 py-1 bg-bg-secondary text-text text-xs rounded hover:bg-border transition-colors">
                            Details
                          </Link>
                          <DownloadLabelButton order={order} />
                        </div>
                      </td>
                    </tr>
                  ))}
                  {(!orders || orders.length === 0) && (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-[var(--text-muted)]">
                        No orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination Placeholder */}
            <div className="px-6 py-4 border-t border-[var(--border-light)] flex items-center justify-between text-xs text-[var(--text-muted)]">
              <span>Showing {orders?.length || 0} orders</span>
              <div className="flex gap-2">
                <AdminButton variant="outline" size="sm" disabled>Previous</AdminButton>
                <AdminButton variant="outline" size="sm" disabled>Next</AdminButton>
              </div>
            </div>
          </AdminCardContent>
        </AdminCard>
      </MotionDiv>
    </div>
  );
}

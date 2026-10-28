"use client";

import * as React from "react";
import { AdminCard, AdminCardContent } from "@/components/admin/ui/AdminCard";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { Plus, Search, Ticket, Trash2, CheckCircle2, XCircle } from "lucide-react";
import { MotionDiv } from "@/components/admin/ui/ClientMotion";
import { toast } from "sonner";
import { formatPrice } from "@/utils";

interface Coupon {
  id: string;
  code: string;
  discount_type: "percentage" | "fixed";
  discount_value: number;
  min_order_value: number;
  max_discount: number | null;
  is_active: boolean;
  usage_limit: number | null;
  used_count: number;
  valid_until: string | null;
}

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = React.useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");

  // Create modal state
  const [isCreating, setIsCreating] = React.useState(false);
  const [newCoupon, setNewCoupon] = React.useState({
    code: "",
    discount_type: "percentage",
    discount_value: "",
    min_order_value: "",
    usage_limit: "",
  });

  const fetchCoupons = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/coupons");
      if (res.ok) {
        const { coupons } = await res.json();
        setCoupons(coupons || []);
      }
    } catch (err) {
      toast.error("Failed to load coupons");
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCoupon),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create coupon");
      }

      toast.success("Coupon created successfully");
      setIsCreating(false);
      setNewCoupon({
        code: "",
        discount_type: "percentage",
        discount_value: "",
        min_order_value: "",
        usage_limit: "",
      });
      fetchCoupons();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const filteredCoupons = coupons.filter((c) =>
    c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--text)]">Coupons</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Manage discount codes and promotions.
          </p>
        </div>
        <AdminButton variant="default" onClick={() => setIsCreating(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Coupon
        </AdminButton>
      </div>

      <MotionDiv
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 bg-[var(--bg-card)] p-2 rounded-xl border border-[var(--border)] shadow-sm"
      >
        <div className="flex-1 flex items-center gap-2 px-3">
          <Search className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
          <input
            type="text"
            placeholder="Search coupons by code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-sm text-[var(--text)] placeholder:text-[var(--text-subtle)]"
          />
        </div>
      </MotionDiv>

      {isCreating && (
        <AdminCard className="mb-6">
          <AdminCardContent>
            <h3 className="font-semibold text-lg mb-4">New Coupon</h3>
            <form onSubmit={handleCreateCoupon} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Coupon Code</label>
                  <input
                    required
                    value={newCoupon.code}
                    onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                    placeholder="e.g. SUMMER20"
                    className="w-full p-2 rounded-md bg-[var(--bg-primary)] border border-[var(--border)] uppercase"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Discount Type</label>
                  <select
                    value={newCoupon.discount_type}
                    onChange={(e) => setNewCoupon({ ...newCoupon, discount_type: e.target.value as any })}
                    className="w-full p-2 rounded-md bg-[var(--bg-primary)] border border-[var(--border)]"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Discount Value</label>
                  <input
                    required
                    type="number"
                    min="1"
                    value={newCoupon.discount_value}
                    onChange={(e) => setNewCoupon({ ...newCoupon, discount_value: e.target.value })}
                    placeholder={newCoupon.discount_type === "percentage" ? "20" : "500"}
                    className="w-full p-2 rounded-md bg-[var(--bg-primary)] border border-[var(--border)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Minimum Order Value (Optional)</label>
                  <input
                    type="number"
                    min="0"
                    value={newCoupon.min_order_value}
                    onChange={(e) => setNewCoupon({ ...newCoupon, min_order_value: e.target.value })}
                    placeholder="0"
                    className="w-full p-2 rounded-md bg-[var(--bg-primary)] border border-[var(--border)]"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <AdminButton type="button" variant="ghost" onClick={() => setIsCreating(false)}>
                  Cancel
                </AdminButton>
                <AdminButton type="submit" variant="default">
                  Save Coupon
                </AdminButton>
              </div>
            </form>
          </AdminCardContent>
        </AdminCard>
      )}

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin w-6 h-6 border-2 border-gold border-t-transparent rounded-full" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCoupons.map((coupon) => (
            <AdminCard key={coupon.id} hoverLift>
              <AdminCardContent className="p-5 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--bg-primary)] flex items-center justify-center border border-[var(--border)]">
                      <Ticket className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg uppercase tracking-widest">{coupon.code}</h3>
                      <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                        {coupon.is_active ? (
                          <><CheckCircle2 className="w-3 h-3 text-green-500" /> Active</>
                        ) : (
                          <><XCircle className="w-3 h-3 text-red-500" /> Inactive</>
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm flex-1">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Discount</span>
                    <span className="font-medium text-[var(--text)]">
                      {coupon.discount_type === "percentage"
                        ? `${coupon.discount_value}% OFF`
                        : formatPrice(coupon.discount_value)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Min Order</span>
                    <span className="font-medium text-[var(--text)]">
                      {coupon.min_order_value > 0 ? formatPrice(coupon.min_order_value) : "None"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Usage</span>
                    <span className="font-medium text-[var(--text)]">
                      {coupon.used_count} {coupon.usage_limit ? `/ ${coupon.usage_limit}` : "used"}
                    </span>
                  </div>
                </div>
              </AdminCardContent>
            </AdminCard>
          ))}
          {filteredCoupons.length === 0 && !isCreating && (
            <div className="col-span-full py-12 text-center text-[var(--text-muted)] border border-dashed border-[var(--border)] rounded-xl">
              <Ticket className="w-8 h-8 mx-auto mb-3 opacity-20" />
              <p>No coupons found. Create one to get started.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

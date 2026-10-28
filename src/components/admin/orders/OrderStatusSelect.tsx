"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function OrderStatusSelect({ orderId, currentStatus }: { orderId: string, currentStatus: string }) {
  const [status, setStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setIsUpdating(true);

    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      toast.success("Order status updated");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
      setStatus(currentStatus); // revert
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex items-center gap-2 bg-bg-secondary border border-border rounded-md px-3 py-1.5 focus-within:border-gold transition-colors">
      <select
        value={status}
        onChange={handleStatusChange}
        disabled={isUpdating}
        className="bg-transparent border-none outline-none text-sm text-text pr-4 appearance-none cursor-pointer uppercase tracking-wider font-medium"
      >
        <option value="pending">Pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="processing">Processing</option>
        <option value="shipped">Shipped</option>
        <option value="out_for_delivery">Out for Delivery</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
        <option value="refunded">Refunded</option>
      </select>
      {isUpdating && <Loader2 className="w-4 h-4 animate-spin text-gold shrink-0" />}
    </div>
  );
}

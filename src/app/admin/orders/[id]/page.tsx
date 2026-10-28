import React from "react";
import { createAdminClient } from "@/lib/supabase/admin";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/utils";
import { ArrowLeft, MapPin, CreditCard } from "lucide-react";
import { AdminCard, AdminCardContent } from "@/components/admin/ui/AdminCard";
import { DownloadLabelButton } from "@/components/admin/orders/DownloadLabelButton";
import { OrderStatusSelect } from "@/components/admin/orders/OrderStatusSelect";

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createAdminClient();
  
  const { data: order } = await supabase
    .from("orders")
    .select("*, profiles(name, email, phone), order_items(*)")
    .eq("id", id)
    .single();

  if (!order) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/orders" className="p-2 hover:bg-[var(--bg-secondary)] rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-[var(--text)]" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-[var(--text)]">Order #{order.id.slice(0,8).toUpperCase()}</h1>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              Placed on {new Date(order.created_at).toLocaleString()}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
          <DownloadLabelButton order={order} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AdminCard>
            <AdminCardContent className="p-6">
              <h3 className="font-medium uppercase tracking-wider text-sm mb-4 text-[var(--text)]">Items Ordered</h3>
              <div className="space-y-4">
                {order.order_items?.map((item: any) => (
                  <div key={item.id} className="flex gap-4 items-center py-2 border-b border-[var(--border-light)] last:border-0">
                    <div className="relative w-16 h-16 rounded overflow-hidden bg-[var(--bg-secondary)] shrink-0">
                      <Image
                        src={item.product_thumbnail}
                        alt={item.product_name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-[var(--text)] text-sm">
                        {item.product_name}
                      </p>
                      <p className="text-xs text-[var(--text-muted)] mt-1">Qty: {item.quantity}</p>
                    </div>
                    <div className="font-medium text-[var(--text)] text-sm">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-[var(--border)] flex justify-end">
                <div className="w-full md:w-64 space-y-3 text-sm">
                  <div className="flex justify-between text-[var(--text-muted)]">
                    <span>Subtotal</span>
                    <span>{formatPrice(order.subtotal)}</span>
                  </div>
                  {order.shipping > 0 && (
                    <div className="flex justify-between text-[var(--text-muted)]">
                      <span>Shipping</span>
                      <span>{formatPrice(order.shipping)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-medium text-[var(--text)] text-base pt-3 border-t border-[var(--border-light)]">
                    <span>Total</span>
                    <span>{formatPrice(order.total)}</span>
                  </div>
                </div>
              </div>
            </AdminCardContent>
          </AdminCard>
        </div>

        <div className="space-y-6">
          <AdminCard>
            <AdminCardContent className="p-6">
              <div className="flex items-center gap-2 mb-4 text-[var(--text)]">
                <MapPin className="w-4 h-4 text-[var(--gold)]" />
                <h3 className="font-medium uppercase tracking-wider text-sm">Shipping Address</h3>
              </div>
              <div className="text-sm text-[var(--text-muted)]">
                <p className="font-medium text-[var(--text)] mb-1">{order.address.name}</p>
                <p>{order.address.line1}</p>
                {order.address.line2 && <p>{order.address.line2}</p>}
                <p>{order.address.city}, {order.address.state} {order.address.zip}</p>
                <p>{order.address.country}</p>
                <p className="mt-2 font-medium">Ph: {order.address.phone}</p>
              </div>
            </AdminCardContent>
          </AdminCard>

          <AdminCard>
            <AdminCardContent className="p-6">
              <div className="flex items-center gap-2 mb-4 text-[var(--text)]">
                <CreditCard className="w-4 h-4 text-[var(--gold)]" />
                <h3 className="font-medium uppercase tracking-wider text-sm">Payment Details</h3>
              </div>
              <div className="text-sm text-[var(--text-muted)] space-y-2">
                <div className="flex justify-between">
                  <span>Method</span>
                  <span className="uppercase font-medium text-[var(--text)]">{order.payment_method}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status</span>
                  <span className={`uppercase font-medium ${
                    order.payment_status === 'paid' ? 'text-green-600' : 
                    order.payment_status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                  }`}>{order.payment_status}</span>
                </div>
              </div>
            </AdminCardContent>
          </AdminCard>
        </div>
      </div>
    </div>
  );
}

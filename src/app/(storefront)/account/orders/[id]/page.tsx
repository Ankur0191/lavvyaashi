import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/utils";
import { ArrowLeft, MapPin, CreditCard, Truck } from "lucide-react";
import { notFound, redirect } from "next/navigation";

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) redirect("/login");

  const { data: order } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("id", id)
    .eq("user_id", session.user.id)
    .single();

  if (!order) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/account/orders" className="p-2 hover:bg-bg-secondary rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-text" />
        </Link>
        <h2 className="text-xl font-serif text-text">Order #{order.id.slice(0, 8).toUpperCase()}</h2>
      </div>

      <div className="bg-bg-primary border border-border p-6 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-8 pb-8 border-b border-border">
          <div>
            <p className="text-sm text-text-muted mb-1">Order Date</p>
            <p className="font-medium text-text">{new Date(order.created_at).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-text-muted mb-1">Status</p>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
              order.status === 'delivered' ? 'bg-green-100 text-green-800' :
              order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {order.status}
            </span>
          </div>
          <div>
            <p className="text-sm text-text-muted mb-1">Total Amount</p>
            <p className="font-medium text-text">{formatPrice(order.total)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-border">
          <div>
            <div className="flex items-center gap-2 mb-3 text-text">
              <MapPin className="w-4 h-4 text-gold" />
              <h3 className="font-medium uppercase tracking-wider text-sm">Delivery Address</h3>
            </div>
            <div className="text-sm text-text-muted bg-bg-secondary/50 p-4 rounded-md">
              <p className="font-medium text-text mb-1">{order.address.name}</p>
              <p>{order.address.line1}</p>
              {order.address.line2 && <p>{order.address.line2}</p>}
              <p>{order.address.city}, {order.address.state} {order.address.zip}</p>
              <p className="mt-2 font-medium">{order.address.phone}</p>
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-3 text-text">
              <CreditCard className="w-4 h-4 text-gold" />
              <h3 className="font-medium uppercase tracking-wider text-sm">Payment Method</h3>
            </div>
            <div className="text-sm text-text-muted bg-bg-secondary/50 p-4 rounded-md h-[124px]">
              <p className="uppercase tracking-wider">{order.payment_method}</p>
              <p className="mt-1">Status: {order.payment_status}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium uppercase tracking-wider text-sm mb-4 text-text">Items Ordered</h3>
          <div className="space-y-4">
            {order.order_items?.map((item: any) => (
              <div key={item.id} className="flex gap-4 items-center p-3 hover:bg-bg-secondary/50 rounded-md transition-colors border border-transparent hover:border-border">
                <div className="relative w-16 h-16 rounded overflow-hidden bg-bg-secondary shrink-0">
                  <Image
                    src={item.product_thumbnail}
                    alt={item.product_name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <Link href={`/products/${item.product_slug}`} className="font-medium text-text hover:text-gold transition-colors text-sm">
                    {item.product_name}
                  </Link>
                  <p className="text-xs text-text-muted mt-1">Qty: {item.quantity}</p>
                </div>
                <div className="font-medium text-text text-sm">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border flex justify-end">
          <div className="w-full md:w-64 space-y-3 text-sm">
            <div className="flex justify-between text-text-muted">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            {order.shipping > 0 && (
              <div className="flex justify-between text-text-muted">
                <span>Shipping</span>
                <span>{formatPrice(order.shipping)}</span>
              </div>
            )}
            <div className="flex justify-between font-medium text-text text-base pt-3 border-t border-border/50">
              <span>Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

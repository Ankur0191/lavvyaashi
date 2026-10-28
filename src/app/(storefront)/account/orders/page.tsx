import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { formatPrice } from "@/utils";
import { ArrowRight, Package } from "lucide-react";

export default async function OrdersHistoryPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) return null;

  const { data: orders } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-serif text-text mb-6">Order History</h2>

      {!orders || orders.length === 0 ? (
        <div className="bg-bg-primary border border-border p-12 rounded-lg text-center shadow-sm">
          <Package className="w-12 h-12 text-gold mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium text-text mb-2">No orders yet</h3>
          <p className="text-sm text-text-muted mb-6">When you place an order, it will appear here.</p>
          <Link href="/products" className="inline-block bg-gradient-gold text-white shadow-gold hover:shadow-lg px-6 py-3 rounded-md text-sm font-medium uppercase tracking-widest transition-all">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-bg-primary border border-border rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between p-6 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-text text-sm">Order #{order.id.slice(0, 8).toUpperCase()}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="text-sm text-text-muted">
                  Placed on {new Date(order.created_at).toLocaleDateString()}
                </div>
                <div className="text-sm font-medium text-text">
                  {formatPrice(order.total)} • {order.order_items?.length || 0} items
                </div>
              </div>
              
              <Link 
                href={`/account/orders/${order.id}`}
                className="flex items-center gap-2 text-sm font-medium text-gold hover:text-dark-gold transition-colors"
              >
                View Details <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

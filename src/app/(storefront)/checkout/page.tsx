"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/useCartStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { CheckoutSteps } from "@/components/checkout/CheckoutSteps";
import { AddressForm } from "@/components/checkout/AddressForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import * as fpixel from "@/lib/fpixel";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const { user, profile, initialized } = useAuthStore();
  
  const [step, setStep] = useState(1); // 1 = Address, 2 = Payment, 3 = Confirm
  const [address, setAddress] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mounted, setMounted] = useState(false);

  const checkoutInitiatedRef = React.useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && items.length > 0 && !checkoutInitiatedRef.current) {
      checkoutInitiatedRef.current = true;
      fpixel.event("InitiateCheckout", {
        num_items: items.reduce((acc, item) => acc + item.quantity, 0),
        value: getSubtotal(),
        currency: "INR",
        content_ids: items.map((item) => item.productId),
      });
    }
  }, [mounted, items, getSubtotal]);

  useEffect(() => {
    if (!mounted || !initialized) return;
    if (items.length === 0) {
      router.push("/products");
    } else if (!user) {
      router.push("/login?redirect=/checkout");
    }
  }, [items, user, router, mounted, initialized]);

  if (!mounted || !initialized) return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
      <Loader2 className="w-8 h-8 animate-spin text-[var(--gold)]" />
    </div>
  );

  const handleAddressSubmit = (data: any) => {
    setAddress(data);
    setStep(2);
  };

  const handlePaymentSubmit = async (method: "cod" | "stripe" | "razorpay") => {
    if (!user || !address) return;
    
    setIsProcessing(true);
    const supabase = createClient();
    
    const subtotal = getSubtotal();
    const shipping = subtotal > 5000 ? 0 : 250;
    const tax = subtotal * 0.18;
    const total = subtotal + shipping + tax;

    try {
      // 1. Create Order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          status: "confirmed",
          subtotal,
          shipping,
          tax,
          total,
          payment_method: method,
          payment_status: method === "cod" ? "pending" : "paid",
          address: address,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Create Order Items
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.productId,
        product_name: item.product.name,
        product_thumbnail: item.product.thumbnail,
        product_slug: item.product.slug,
        quantity: item.quantity,
        price: item.product.price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Track Meta Pixel Purchase event
      fpixel.event("Purchase", {
        value: total,
        currency: "INR",
        content_ids: items.map((item) => item.productId),
        content_type: "product",
        num_items: items.reduce((acc, item) => acc + item.quantity, 0),
      });

      // 3. Clear Cart
      await clearCart();
      
      setStep(3); // Confirmation page
      toast.success("Order placed successfully!");
      
    } catch (err: any) {
      toast.error(err.message || "Failed to place order.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-bg-primary pt-[120px] pb-24">
        <div className="container max-w-2xl text-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h1 className="text-4xl font-serif text-text mb-4">Thank You!</h1>
          <p className="text-text-muted mb-8 text-lg">
            Your luxury order has been confirmed. We will send you an email with the tracking details shortly.
          </p>
          <button 
            onClick={() => router.push("/account/orders")}
            className="bg-gradient-gold text-white shadow-gold hover:shadow-lg px-8 py-3 rounded-md text-sm uppercase tracking-widest font-medium transition-all"
          >
            View Order Details
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary pt-[100px] pb-24">
      <div className="container max-w-6xl">
        <CheckoutSteps currentStep={step} />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Form Area */}
          <div className="lg:col-span-7 xl:col-span-8 order-2 lg:order-1">
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-serif text-text mb-6">Shipping Address</h2>
                <AddressForm 
                  onSubmit={handleAddressSubmit} 
                  defaultValues={{
                    name: profile?.name || user?.user_metadata?.name || "",
                    phone: profile?.phone || "",
                  }}
                />
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-2xl font-serif text-text mb-6">Payment Method</h2>
                
                <div className="space-y-4">
                  {/* COD Option */}
                  <div className="border border-gold bg-gold/5 p-4 rounded-lg flex items-start gap-4">
                    <input 
                      type="radio" 
                      id="cod" 
                      name="payment" 
                      checked 
                      readOnly
                      className="mt-1 text-gold focus:ring-gold"
                    />
                    <div>
                      <label htmlFor="cod" className="font-medium text-text block mb-1">Cash on Delivery</label>
                      <p className="text-sm text-text-muted">Pay in cash when your order arrives at your doorstep.</p>
                    </div>
                  </div>

                  {/* Online Payment Placeholders */}
                  <div className="border border-border p-4 rounded-lg flex items-start gap-4 opacity-50 cursor-not-allowed">
                    <input type="radio" disabled className="mt-1" />
                    <div>
                      <label className="font-medium text-text block mb-1">Credit/Debit Card / UPI (Razorpay)</label>
                      <p className="text-sm text-text-muted">Requires API keys in .env.local to activate.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3 border border-border text-text rounded-md text-sm font-medium uppercase tracking-widest hover:bg-bg-secondary transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => handlePaymentSubmit("cod")}
                    disabled={isProcessing}
                    className="flex-1 bg-gradient-gold text-white shadow-gold hover:shadow-lg py-3 rounded-md text-sm font-medium uppercase tracking-widest transition-all flex justify-center items-center gap-2"
                  >
                    {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : "Place Order"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-5 xl:col-span-4 order-1 lg:order-2">
            <div className="sticky top-[100px]">
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import { formatPrice } from "@/utils";
import { useCartStore } from "@/stores/useCartStore";

export function OrderSummary() {
  const { items, getSubtotal } = useCartStore();
  
  const subtotal = getSubtotal();
  const shipping = subtotal > 5000 ? 0 : 250;
  const tax = subtotal * 0.18; // 18% GST estimate
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-bg-secondary p-6 rounded-lg">
      <h3 className="text-lg font-serif mb-6 text-text">Order Summary</h3>
      
      <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto scrollbar-thin pr-2">
        {items.map((item) => (
          <div key={item.productId} className="flex gap-4">
            <div className="relative w-16 h-20 bg-bg-primary rounded shrink-0 overflow-hidden border border-border">
              <Image
                src={item.product.thumbnail || "/products/serum.webp"}
                alt={item.product.name}
                fill
                className="object-cover"
              />
              <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-text text-bg-primary text-[10px] rounded-full z-10">
                {item.quantity}
              </span>
            </div>
            
            <div className="flex-1 flex flex-col justify-center">
              <span className="text-sm font-medium text-text line-clamp-1">{item.product.name}</span>
              <span className="text-xs text-text-muted mt-1">{formatPrice(item.product.price)}</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-text">
                {formatPrice(item.product.price * item.quantity)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-text-muted">Subtotal</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-muted">Estimated Tax (18%)</span>
          <span className="font-medium">{formatPrice(tax)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-muted">Shipping</span>
          <span className="font-medium">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
        </div>
      </div>

      <div className="border-t border-border mt-4 pt-4 flex justify-between items-center">
        <span className="text-lg font-medium text-text uppercase tracking-widest text-sm">Total</span>
        <span className="text-2xl font-serif text-text">{formatPrice(total)}</span>
      </div>
    </div>
  );
}

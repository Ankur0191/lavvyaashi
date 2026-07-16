"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import { formatPrice } from "@/utils";

export function CartDrawer() {
  const router = useRouter();
  const { isOpen, closeCart, items, updateQuantity, removeItem, getSubtotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed top-0 right-0 h-full w-full max-w-[400px] bg-bg-primary shadow-2xl z-[201] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-serif text-2xl text-text flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Your Bag
              </h2>
              <button
                onClick={closeCart}
                className="p-2 -mr-2 text-text-muted hover:text-text transition-colors rounded-full hover:bg-bg-secondary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-bg-secondary flex items-center justify-center text-gold">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-text font-medium mb-1">Your bag is empty</p>
                    <p className="text-sm text-text-muted">Looks like you haven't added anything yet.</p>
                  </div>
                  <button
                    onClick={closeCart}
                    className="mt-4 text-sm font-medium text-gold hover:underline uppercase tracking-widest"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {items.map((item) => (
                    <div key={item.productId} className="flex gap-4">
                      <div className="relative w-20 h-24 bg-bg-secondary rounded shrink-0 overflow-hidden">
                        <Image
                          src={item.product.thumbnail || "/products/serum.webp"}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      <div className="flex flex-col flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <Link href={`/products/${item.product.slug}`} onClick={closeCart} className="text-sm font-medium hover:text-gold transition-colors line-clamp-2 pr-4">
                            {item.product.name}
                          </Link>
                          <button 
                            onClick={() => removeItem(item.productId)}
                            className="text-text-muted hover:text-red-500 transition-colors p-1 -mt-1 -mr-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <p className="text-sm text-text-muted mb-auto">{formatPrice(item.product.price)}</p>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-border rounded">
                            <button 
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="px-2 py-1 text-text-muted hover:text-text transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="px-2 py-1 text-text-muted hover:text-text transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          
                          <p className="font-medium text-sm text-text">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-6 bg-bg-primary">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-text-muted text-sm uppercase tracking-wider font-medium">Subtotal</span>
                  <span className="text-xl font-medium text-text">{formatPrice(getSubtotal())}</span>
                </div>
                <p className="text-xs text-text-muted mb-6 text-center">
                  Shipping and taxes calculated at checkout.
                </p>
                <button
                  onClick={() => {
                    closeCart();
                    router.push("/checkout");
                  }}
                  className="w-full bg-text text-bg-primary hover:bg-text-muted transition-colors py-4 text-sm font-medium uppercase tracking-widest rounded flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

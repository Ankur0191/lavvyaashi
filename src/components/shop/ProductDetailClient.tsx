"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { formatPrice } from "@/utils";
import { Minus, Plus, ShoppingBag, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/stores/useCartStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { AuthModal } from "@/components/auth/AuthModal";
import * as fpixel from "@/lib/fpixel";

interface ProductDetailClientProps {
  product: any;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [couponCode, setCouponCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [couponResult, setCouponResult] = useState<{ discount?: number; type?: string; message?: string; error?: string } | null>(null);
  const { addItem } = useCartStore();
  const { user } = useAuthStore();
  const router = useRouter();
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (product) {
      fpixel.event("ViewContent", {
        content_name: product.name,
        content_ids: [product.id],
        content_type: "product",
        value: product.price,
        currency: "INR",
      });
    }
  }, [product]);

  const savings = product.mrp > product.price ? product.mrp - product.price : 0;
  const savingsPercent = savings > 0 ? Math.round((savings / product.mrp) * 100) : 0;
  
  // Calculate final price with coupon if applied to product directly
  // Note: in a real store, you might apply this at checkout cart level instead of per-item,
  // but we are satisfying the request to add it on the product page.
  let finalPrice = product.price;
  if (couponResult?.discount) {
    if (couponResult.type === 'percentage') {
      finalPrice = finalPrice - (finalPrice * couponResult.discount / 100);
    } else {
      finalPrice = Math.max(0, finalPrice - couponResult.discount);
    }
  }

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setIsApplyingCoupon(true);
    setCouponResult(null);
    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode, orderValue: product.price * quantity })
      });
      const data = await res.json();
      if (res.ok) {
        setCouponResult({ discount: data.discount_value, type: data.discount_type, message: 'Coupon applied successfully!' });
        toast.success('Coupon applied successfully!');
      } else {
        setCouponResult({ error: data.error || 'Invalid coupon' });
        toast.error(data.error || 'Invalid coupon');
      }
    } catch (e) {
      toast.error('Error validating coupon');
    }
    setIsApplyingCoupon(false);
  };

  const handleBuyNow = () => {
    const productToAdd = { ...product, price: finalPrice };
    addItem(productToAdd, quantity);
    
    if (user) {
      toast.success(`Added ${quantity} × ${product.name} to cart! Proceeding to checkout...`);
      router.push("/checkout");
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
      {/* Left: Image */}
      <div className="space-y-4">
        <div className="relative aspect-[4/5] bg-bg-secondary w-full">
          <Image
            src={product.thumbnail || "/products/serum.webp"}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
          {savingsPercent > 0 && (
            <div className="absolute top-4 left-4 bg-gold text-white text-xs font-semibold px-2.5 py-1 rounded-md">
              {savingsPercent}% OFF
            </div>
          )}
        </div>
      </div>

      {/* Right: Product Info */}
      <div className="flex flex-col">
        <div className="mb-8">
          <p className="text-sm tracking-widest uppercase text-gold font-medium mb-3">
            {product.category?.name}
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-text mb-4">
            {product.name}
          </h1>

          {/* Price block */}
          <div className="flex flex-col gap-1 mb-6">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl text-text font-light">{formatPrice(finalPrice)}</span>
              {product.mrp > product.price && !couponResult?.discount && (
                <>
                  <span className="text-lg text-text-muted line-through">{formatPrice(product.mrp)}</span>
                  <span className="text-sm text-green-600 font-medium">Save {formatPrice(savings)}</span>
                </>
              )}
            </div>
            {couponResult?.discount && (
              <p className="text-sm text-green-600 font-medium">
                Discount applied! Original price: <span className="line-through">{formatPrice(product.price)}</span>
              </p>
            )}
          </div>

          <p className="text-text-muted leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Add to Cart */}
        <div className="border-t border-border py-8">
          
          {/* Coupon Input */}
          <div className="mb-6 flex gap-2">
            <input 
              type="text" 
              placeholder="Enter coupon code" 
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="flex-1 bg-transparent border border-border px-4 py-2 rounded-md focus:outline-none focus:border-gold text-sm"
            />
            <button 
              onClick={handleApplyCoupon}
              disabled={isApplyingCoupon || !couponCode.trim()}
              className="bg-bg-secondary text-text px-4 py-2 rounded-md text-sm font-medium hover:bg-border transition-colors disabled:opacity-50"
            >
              {isApplyingCoupon ? 'Applying...' : 'Apply'}
            </button>
          </div>
          {couponResult?.error && <p className="text-sm text-red-500 mb-4">{couponResult.error}</p>}
          
          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center border border-border rounded-md">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 text-text-muted hover:text-text transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="p-3 text-text-muted hover:text-text transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <button
                onClick={() => {
                  // Pass the product with the updated price to the cart
                  const productToAdd = { ...product, price: finalPrice };
                  addItem(productToAdd, quantity);
                  toast.success(`Added ${quantity} × ${product.name} to cart!`);
                }}
                disabled={product.stock === 0}
                className="w-full bg-transparent border-2 border-gold text-gold hover:bg-gold/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors py-4 font-medium flex items-center justify-center gap-2 rounded-md"
              >
                <ShoppingBag className="w-5 h-5" />
                {product.stock === 0
                  ? "Out of Stock"
                  : `Add to Cart — ${formatPrice(finalPrice * quantity)}`}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="w-full bg-gradient-gold text-white shadow-gold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all py-4 font-medium flex items-center justify-center gap-2 rounded-md"
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* Stock indicator */}
          {product.stock > 0 && product.stock <= 10 && (
            <p className="text-sm text-amber-600 font-medium">
              ⚠ Only {product.stock} left in stock — order soon!
            </p>
          )}
        </div>

        {/* Accordions */}
        <div className="border-t border-border">
          {/* Benefits */}
          {product.benefits && product.benefits.length > 0 && (
            <>
              <details className="group" open>
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none py-5 text-text">
                  <span className="uppercase tracking-widest text-sm">Benefits</span>
                  <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                </summary>
                <div className="text-text-muted text-sm pb-5 leading-relaxed">
                  <ul className="list-disc pl-5 space-y-1">
                    {product.benefits.map((benefit: string, i: number) => (
                      <li key={i}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </details>
              <div className="h-px bg-border w-full" />
            </>
          )}

          {/* Ingredients */}
          {product.ingredients && (
            <>
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none py-5 text-text">
                  <span className="uppercase tracking-widest text-sm">Ingredients</span>
                  <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                </summary>
                <div className="text-text-muted text-sm pb-5 leading-relaxed">
                  {product.ingredients}
                </div>
              </details>
              <div className="h-px bg-border w-full" />
            </>
          )}

          {/* How to Use */}
          {product.how_to_use && (
            <>
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none py-5 text-text">
                  <span className="uppercase tracking-widest text-sm">How to Use</span>
                  <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                </summary>
                <div className="text-text-muted text-sm pb-5 leading-relaxed">
                  {product.how_to_use}
                </div>
              </details>
              <div className="h-px bg-border w-full" />
            </>
          )}

          {/* Details */}
          {(product.volume || product.weight || product.sku) && (
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none py-5 text-text">
                <span className="uppercase tracking-widest text-sm">Product Details</span>
                <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
              </summary>
              <div className="text-text-muted text-sm pb-5 leading-relaxed space-y-2">
                {product.sku && <p><span className="font-medium text-text">SKU:</span> {product.sku}</p>}
                {product.volume && <p><span className="font-medium text-text">Volume:</span> {product.volume}</p>}
                {product.weight && <p><span className="font-medium text-text">Weight:</span> {product.weight}</p>}
              </div>
            </details>
          )}
        </div>
      </div>
    </div>
    <AuthModal 
      isOpen={showAuthModal} 
      onClose={() => setShowAuthModal(false)}
      onSuccess={() => {
        setShowAuthModal(false);
        router.push("/checkout");
      }}
    />
    </>
  );
}

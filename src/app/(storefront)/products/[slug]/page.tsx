"use client";

import React, { useEffect, useState, use } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { formatPrice } from "@/utils";
import { Loader2, Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { notFound } from "next/navigation";
import { useCartStore } from "@/stores/useCartStore";

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("products")
        .select("*, category:categories(*)")
        .eq("slug", slug)
        .single();
        
      if (error || !data) {
        notFound();
      } else {
        setProduct(data);
      }
      setIsLoading(false);
    };
    fetchProduct();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-primary pt-navbar flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-bg-primary pt-navbar">
      <div className="container py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] bg-bg-secondary w-full">
              <Image
                src={product.thumbnail || "/products/serum.webp"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
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
              <p className="text-2xl text-text font-light mb-6">
                {formatPrice(product.price)}
              </p>
              <p className="text-text-muted leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="border-t border-border py-8">
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center border border-border rounded-md">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-text-muted hover:text-text transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-text-muted hover:text-text transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <button 
                  onClick={() => {
                    addItem(product, quantity);
                    toast.success(`Added ${quantity} to cart!`);
                  }}
                  className="flex-1 bg-text text-bg-primary hover:bg-text-muted transition-colors py-4 font-medium flex items-center justify-center gap-2 rounded-md"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart — {formatPrice(product.price * quantity)}
                </button>
              </div>
            </div>

            {/* Accordions for Details */}
            <div className="border-t border-border">
              <details className="group" open>
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none py-5 text-text">
                  <span className="uppercase tracking-widest text-sm">Benefits</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <div className="text-text-muted text-sm pb-5 leading-relaxed">
                  <ul className="list-disc pl-5 space-y-1">
                    {product.benefits?.map((benefit: string, i: number) => (
                      <li key={i}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </details>
              <div className="h-px bg-border w-full" />
              
              {product.ingredients && (
                <>
                  <details className="group">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none py-5 text-text">
                      <span className="uppercase tracking-widest text-sm">Ingredients</span>
                      <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                      </span>
                    </summary>
                    <div className="text-text-muted text-sm pb-5 leading-relaxed">
                      {product.ingredients}
                    </div>
                  </details>
                  <div className="h-px bg-border w-full" />
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

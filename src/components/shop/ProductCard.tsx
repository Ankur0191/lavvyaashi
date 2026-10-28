"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { formatPrice } from "@/utils";
import { useCartStore } from "@/stores/useCartStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: any;
  onAddToCart?: (product: any) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { addItem } = useCartStore();
  const router = useRouter();

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
    toast.success("Added to cart! Proceeding to checkout...");
    router.push("/checkout");
  };

  return (
    <div className="group relative flex flex-col">
      {/* Image Container */}
      <Link href={`/products/${product.slug}`} className="relative aspect-[4/5] bg-bg-secondary overflow-hidden block">
        <Image
          src={product.thumbnail || "/products/serum.webp"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.new_arrival && (
            <span style={{
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(6px)",
              padding: "0.3rem 0.75rem",
              borderRadius: "0.25rem",
              fontFamily: "var(--font-sans)",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--text)",
            }}>
              New
            </span>
          )}
          {product.best_seller && (
            <span style={{
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(6px)",
              padding: "0.3rem 0.75rem",
              borderRadius: "0.25rem",
              fontFamily: "var(--font-sans)",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--text)",
            }}>
              Best Seller
            </span>
          )}
        </div>

      </Link>

      {/* Content */}
      <div className="pt-4 text-center">
        <p style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.7rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--text-subtle)",
          margin: "0 0 0.35rem",
        }}>
          {product.category?.name || "Skincare"}
        </p>
        <Link href={`/products/${product.slug}`} style={{
          display: "block",
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(1.05rem, 0.9rem + 0.4vw, 1.2rem)",
          color: "var(--text)",
          marginBottom: "0.4rem",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text)")}
        >
          {product.name}
        </Link>
        <div className="flex items-center justify-center gap-2 mb-4">
          <span style={{ fontFamily: "var(--font-sans)", fontWeight: 500, color: "var(--text)" }}>
            {formatPrice(product.price)}
          </span>
          {product.mrp && product.mrp > product.price && (
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--text-subtle)", textDecoration: "line-through" }}>
              {formatPrice(product.mrp)}
            </span>
          )}
        </div>

        {/* Persistent Action Buttons */}
        <div className="flex flex-col gap-2 mt-auto">
          <button
            onClick={(e) => {
              e.preventDefault();
              if (onAddToCart) {
                onAddToCart(product);
              } else {
                addItem(product, 1);
                toast.success("Added to cart!");
              }
            }}
            className="w-full py-2.5 text-xs font-medium uppercase tracking-widest border border-gold text-gold hover:bg-gold/5 transition-colors rounded"
          >
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="w-full py-2.5 text-xs font-medium uppercase tracking-widest bg-gradient-gold text-white shadow-gold hover:shadow-lg transition-all rounded"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

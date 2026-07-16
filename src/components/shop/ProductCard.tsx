"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { formatPrice } from "@/utils";
import { useCartStore } from "@/stores/useCartStore";
import { toast } from "sonner";

interface ProductCardProps {
  product: any;
  onAddToCart?: (product: any) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { addItem } = useCartStore();

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
            <span className="bg-text text-bg-primary text-[10px] uppercase tracking-widest px-2 py-1 font-medium">
              New
            </span>
          )}
          {product.best_seller && (
            <span className="bg-gold text-white text-[10px] uppercase tracking-widest px-2 py-1 font-medium">
              Best Seller
            </span>
          )}
        </div>

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
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
            className="w-full bg-bg-primary text-text hover:bg-text hover:text-bg-primary transition-colors py-3 text-sm font-medium tracking-wide flex items-center justify-center gap-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-300 ease-out"
          >
            <ShoppingBag className="w-4 h-4" />
            Quick Add
          </button>
        </div>
      </Link>

      {/* Content */}
      <div className="pt-4 flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <Link href={`/products/${product.slug}`} className="group-hover:text-gold transition-colors font-medium">
            {product.name}
          </Link>
          <span className="font-medium">{formatPrice(product.price)}</span>
        </div>
        <p className="text-sm text-text-muted line-clamp-1">{product.summary}</p>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { cn } from "@/utils";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (slug: string | null) => void;
}

export function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-8">
      <button
        onClick={() => onSelectCategory(null)}
        className={cn(
          "px-6 py-2.5 text-[11px] uppercase tracking-[0.15em] font-medium transition-all duration-500",
          selectedCategory === null
            ? "text-gold border-b border-gold"
            : "text-text-muted hover:text-text border-b border-transparent hover:border-border"
        )}
      >
        All Products
      </button>
      
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelectCategory(cat.slug)}
          className={cn(
            "px-6 py-2.5 text-[11px] uppercase tracking-[0.15em] font-medium transition-all duration-500",
            selectedCategory === cat.slug
              ? "text-gold border-b border-gold"
              : "text-text-muted hover:text-text border-b border-transparent hover:border-border"
          )}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}

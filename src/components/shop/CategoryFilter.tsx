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
          "px-4 py-2 text-sm rounded-full transition-colors border",
          selectedCategory === null
            ? "bg-text text-bg-primary border-text"
            : "bg-transparent text-text-muted border-border hover:border-text hover:text-text"
        )}
      >
        All Products
      </button>
      
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelectCategory(cat.slug)}
          className={cn(
            "px-4 py-2 text-sm rounded-full transition-colors border",
            selectedCategory === cat.slug
              ? "bg-text text-bg-primary border-text"
              : "bg-transparent text-text-muted border-border hover:border-text hover:text-text"
          )}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/animations/variants";
import { ProductCard } from "@/components/shop/ProductCard";
import { CategoryFilter } from "@/components/shop/CategoryFilter";
import { Product } from "@/types";

interface ProductsViewProps {
  initialProducts: any[];
  categories: any[];
}

export function ProductsView({ initialProducts, categories }: ProductsViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = initialProducts.filter((p) => {
    // Filter by search query
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by category
    const matchesCategory = selectedCategory ? p.category?.slug === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-bg-primary pt-navbar">
      <section className="section container">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center mb-16"
        >
          <span className="divider-gold w-48 mx-auto mb-4">The Collection</span>
          <h1 className="text-5xl md:text-6xl font-serif text-text mb-6">
            Curated <span className="italic text-gold">Skincare</span>
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto font-light text-center">
            Discover our complete range of high-performance luxury skincare, meticulously crafted to elevate your daily ritual.
          </p>
        </motion.div>
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <CategoryFilter 
            categories={categories} 
            selectedCategory={selectedCategory} 
            onSelectCategory={setSelectedCategory} 
          />
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-bg-secondary/50 border border-border rounded-full px-4 py-2 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-gold transition-colors"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-text-muted">
              No products found matching your search.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/animations/variants";
import { createClient } from "@/lib/supabase/client";
import { ProductCard } from "@/components/shop/ProductCard";
import { CategoryFilter } from "@/components/shop/CategoryFilter";
import { Loader2 } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const supabase = createClient();
      
      // Fetch categories
      const { data: cats } = await supabase.from("categories").select("*").order("position");
      if (cats) setCategories(cats);

      // Fetch products
      let query = supabase.from("products").select("*, category:categories(*)");
      
      if (selectedCategory) {
        // Find category id
        const cat = cats?.find((c) => c.slug === selectedCategory);
        if (cat) {
          query = query.eq("category_id", cat.id);
        }
      }
      
      const { data: prods } = await query;
      if (prods) setProducts(prods);
      
      setIsLoading(false);
    };

    fetchData();
  }, [selectedCategory]);

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
          <p className="text-lg text-text-muted max-w-2xl mx-auto font-light">
            Discover our complete range of high-performance luxury skincare, meticulously crafted to elevate your daily ritual.
          </p>
        </motion.div>
        
        <div className="flex justify-center mb-12">
          <CategoryFilter 
            categories={categories} 
            selectedCategory={selectedCategory} 
            onSelectCategory={setSelectedCategory} 
          />
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-gold" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-text-muted">
                No products found in this category.
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

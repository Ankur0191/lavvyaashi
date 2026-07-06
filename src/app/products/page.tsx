"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/animations/variants";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-bg-primary pt-navbar">
      <section className="section container text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <span className="divider-gold w-48 mx-auto mb-4">The Collection</span>
          <h1 className="text-5xl md:text-6xl font-serif text-text mb-8">
            Curated <span className="italic text-gold">Skincare</span>
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto font-light">
            Discover our complete range of high-performance luxury skincare, meticulously crafted to elevate your daily ritual.
          </p>
        </motion.div>
        
        {/* Placeholder for products grid */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="aspect-product bg-bg-secondary rounded-xl animate-shimmer relative overflow-hidden">
               <div className="absolute bottom-4 left-4 right-4 h-6 bg-border/50 rounded-md" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

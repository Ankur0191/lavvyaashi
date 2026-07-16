"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/animations/variants";

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-bg-primary pt-navbar">
      <section className="section container text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <span className="divider-gold w-48 mx-auto mb-4">The Journal</span>
          <h1 className="text-5xl md:text-6xl font-serif text-text mb-8">
            Beauty & <span className="italic text-gold">Wellness</span>
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto font-light">
            Insights, rituals, and stories from the world of luxury skincare.
          </p>
        </motion.div>
        
        {/* Placeholder for blog grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {[1, 2, 3].map((item) => (
            <div key={item} className="group cursor-pointer">
              <div className="aspect-[16/10] bg-bg-secondary rounded-xl mb-6 relative overflow-hidden animate-shimmer" />
              <div className="space-y-3">
                <span className="text-xs font-semibold text-gold uppercase tracking-widest">Skincare Rituals</span>
                <h3 className="text-2xl font-serif text-text group-hover:text-gold transition-colors">The Art of Double Cleansing</h3>
                <p className="text-text-muted line-clamp-2">Discover why double cleansing is the foundation of every luxury skincare routine.</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

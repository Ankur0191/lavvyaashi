"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/animations/variants";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-primary pt-navbar">
      <section className="section container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-col justify-center max-w-xl"
          >
            <span className="text-sm font-semibold text-gold uppercase tracking-widest mb-6 block">
              Our Heritage
            </span>
            <h1 className="text-5xl md:text-6xl font-serif text-text mb-8 leading-tight">
              A Legacy of <br />
              <span className="italic">Pure Botanical</span> Luxury
            </h1>
            
            <div className="space-y-6 text-lg text-text-muted font-light leading-relaxed">
              <p>
                Lavvyaashi was founded with a singular vision: to create the most exquisite skincare that harmonizes absolute purity with clinical efficacy. We source the rarest botanicals from around the world to craft our signature formulations.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            className="relative aspect-[3/4] rounded-2xl overflow-hidden"
          >
            <Image
              src="/images/story_ingredients.png"
              alt="Lavvyaashi Craftsmanship"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

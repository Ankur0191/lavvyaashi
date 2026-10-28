"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Leaf, Droplets, ShieldCheck, Rabbit, ArrowRight } from "lucide-react";

const dustParticles = Array.from({ length: 15 }, (_, index) => ({
  width: 1 + ((index * 37) % 100) / 100,
  height: 1 + ((index * 53) % 100) / 100,
  opacity: 0.1 + ((index * 29) % 40) / 100,
  left: (index * 47) % 100,
  top: (index * 71) % 100,
  distance: 30 + ((index * 43) % 50),
  duration: 7 + ((index * 31) % 5),
  delay: ((index * 17) % 5),
}));

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative w-full min-h-[70svh] md:min-h-[100svh] lg:min-h-[680px] flex items-center overflow-hidden bg-[#EAE2D2] pt-20 md:pt-0"
    >
      {/* ── Mobile Pattern Background (Hidden on Desktop) ── */}
      <div className="absolute inset-0 z-0 block md:hidden bg-[#F8F3EC] overflow-hidden">
        {/* Ambient light */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 80% 20%, rgba(255,252,240,0.8) 0%, transparent 60%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 20% 80%, rgba(224,205,164,0.4) 0%, transparent 60%)" }} />
        
        {/* Sun rays */}
        <div className="absolute inset-0 opacity-20" style={{
          background: "conic-gradient(from 300deg at 90% 10%, rgba(212,175,55,0.4) 0deg, transparent 15deg, rgba(212,175,55,0.2) 25deg, transparent 40deg, rgba(212,175,55,0.1) 50deg, transparent 65deg)"
        }} />

        {/* Elegant subtle grid/mandala pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C8A14B' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} 
        />
        
        {/* Floating dust particles */}
        {!reduced && dustParticles.map((particle, i) => (
          <motion.div
            key={`mdust${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: particle.width,
              height: particle.height,
              background: `rgba(200, 161, 75, ${particle.opacity})`,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              zIndex: 1,
            }}
            animate={{ y: [0, -particle.distance], opacity: [0, 1, 0] }}
            transition={{ duration: particle.duration, delay: particle.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* ── Desktop Background Image (Hidden on Mobile) ── */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <Image
          src="/images/HERO.png"
          alt="Lavvyaashi Hero Background"
          fill
          priority
          quality={100}
          className="object-contain object-right md:object-right-bottom"
        />
      </div>
      
      {/* Optional dark gradient overlay just on the left edge for text legibility, if needed. 
          Leaving mostly transparent to show the user's image. */}
      <div 
        className="absolute inset-0 z-10 hidden md:block"
        style={{ 
          background: "linear-gradient(to right, rgba(248, 243, 236, 0.95) 0%, rgba(248, 243, 236, 0.7) 35%, transparent 65%)" 
        }} 
      />

      {/* ════════════════════════════════════════════════
          LEFT PANEL  (Text overlay)
      ════════════════════════════════════════════════ */}
      <motion.div
        className="relative z-20 w-full max-w-[600px] flex flex-col justify-center px-6 py-12 md:px-[clamp(1.5rem,5vw,6.5rem)]"
        initial={{ opacity: 0, x: -28 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Eyebrow */}
        <p style={{ color: "#C8A14B", letterSpacing: "0.22em", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "1rem" }}>
          Luxury Skincare
        </p>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(2.5rem, 0.8rem + 4.5vw, 5.2rem)",
            lineHeight: 1.07,
            fontWeight: 400,
            color: "#2A2A2A",
            marginBottom: "1.2rem",
          }}
        >
          The Art of
          <br />
          <em style={{ color: "#C8A14B", fontStyle: "italic" }}>Natural Elegance</em>
        </h1>

        {/* Ornament */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.4rem", color: "#C8A14B" }}>
          <div style={{ height: 1, width: 36, background: "#C8A14B" }} />
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8A14B" strokeWidth="1.4">
            <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
            <circle cx="12" cy="10" r="2" />
          </svg>
          <div style={{ height: 1, width: 36, background: "#C8A14B" }} />
        </div>

        {/* Body */}
        <p style={{ color: "#6C6C6C", fontSize: "clamp(0.87rem, 0.65rem + 0.55vw, 1.05rem)", fontWeight: 300, lineHeight: 1.75, maxWidth: 370, marginBottom: "2rem" }}>
          Experience skincare crafted from the world&apos;s finest botanicals. A ritual
          designed to restore, rejuvenate, and reveal your skin&apos;s natural radiance.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "2.5rem" }}>
          <Link
            href="/products"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "#C8A14B",
              color: "#fff",
              padding: "13px 28px",
              borderRadius: 14,
              fontSize: "0.88rem",
              fontWeight: 500,
              letterSpacing: "0.04em",
              boxShadow: "0 6px 22px rgba(200,161,75,0.42)",
              textDecoration: "none",
            }}
          >
            Explore Collection <ArrowRight size={16} />
          </Link>
          <Link
            href="/about"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "12px 28px",
              borderRadius: 14,
              fontSize: "0.88rem",
              fontWeight: 500,
              border: "1.5px solid rgba(42,42,42,0.18)",
              color: "#2A2A2A",
              textDecoration: "none",
              letterSpacing: "0.04em",
            }}
          >
            Our Story
          </Link>
        </div>

        {/* Brand pillars */}
        <div style={{ display: "flex", gap: "clamp(1rem, 2.5vw, 2.5rem)" }}>
          {([
            { icon: Leaf, label: "Ayurvedic\nScience" },
            { icon: Droplets, label: "Botanical\nActives" },
            { icon: ShieldCheck, label: "Clean & Safe\nFormulas" },
            { icon: Rabbit, label: "Cruelty\nFree" },
          ] as const).map((item, i) => (
            <motion.div
              key={i}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 + i * 0.1 }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  border: "1.5px solid rgba(200,161,75,0.42)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#C8A14B",
                }}
              >
                <item.icon size={16} strokeWidth={1.5} />
              </div>
              <span
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  color: "#6C6C6C",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  whiteSpace: "pre-line",
                  textAlign: "center",
                  lineHeight: 1.4,
                }}
              >
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "clamp(1.5rem, 3.5vw, 3.5rem)",
          zIndex: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          color: "#C8A14B",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <span style={{ fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>Scroll</span>
        <div style={{ width: 1, height: 38, background: "rgba(200,161,75,0.2)", position: "relative", overflow: "hidden" }}>
          <motion.div
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "50%", background: "#C8A14B" }}
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

    </section>
  );
}

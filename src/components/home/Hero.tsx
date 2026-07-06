"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { ROUTES } from "@/constants";
import { staggerContainer, staggerItem } from "@/animations/variants";

const TYPEWRITER_WORDS = [
  "Natural Elegance",
  "Pure Radiance",
  "Botanical Luxury",
  "Timeless Beauty",
];

export function Hero() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smooth spring-based parallax values
  const rawBgY    = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const rawTextY  = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const rawOpacity= useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const rawScale  = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const bgY     = useSpring(rawBgY,     { stiffness: 60, damping: 20, mass: 0.8 });
  const textY   = useSpring(rawTextY,   { stiffness: 60, damping: 20, mass: 0.8 });
  const opacity = useSpring(rawOpacity, { stiffness: 80, damping: 20 });
  const scale   = useSpring(rawScale,   { stiffness: 40, damping: 15 });

  return (
    <section
      ref={containerRef}
      style={{ minHeight: "92vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "var(--bg-primary)" }}
    >
      {/* ── Parallax Background ── */}
      <motion.div
        style={{ y: bgY, scale, position: "absolute", inset: "-10% 0", zIndex: 0 }}
      >
        <Image
          src="/images/hero_bg.png"
          alt="Lavvyaashi Luxury Skincare"
          fill
          priority
          className="object-cover object-center"
          style={{ opacity: 0.45, mixBlendMode: "multiply" }}
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(237,225,180,0.25) 0%, transparent 40%, rgba(237,225,180,0.9) 100%)",
          }}
        />
      </motion.div>

      {/* ── Floating decorative orb ── */}
      <motion.div
        className="animate-float"
        style={{
          position: "absolute",
          top: "15%",
          right: "8%",
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(182,140,56,0.12) 0%, transparent 70%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <motion.div
        className="animate-float"
        style={{
          position: "absolute",
          bottom: "20%",
          left: "6%",
          width: 160,
          height: 160,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(182,140,56,0.08) 0%, transparent 70%)",
          zIndex: 1,
          animationDelay: "2s",
          pointerEvents: "none",
        }}
      />

      {/* ── Main content ── */}
      <motion.div
        style={{ y: textY, opacity, position: "relative", zIndex: 10, width: "100%" }}
      >
        <div className="container">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            style={{ maxWidth: "56rem", margin: "0 auto", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            {/* Label */}
            <motion.div variants={staggerItem} style={{ marginBottom: "1.5rem" }}>
              <span className="divider-gold" style={{ width: "16rem", margin: "0 auto" }}>
                Luxury Skincare
              </span>
            </motion.div>

            {/* Headline with typewriter */}
            <motion.div variants={staggerItem} style={{ marginBottom: "2rem" }}>
              <h1
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(3.2rem, 2rem + 6vw, 6rem)",
                  fontWeight: 400,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: "var(--text)",
                  margin: 0,
                }}
              >
                The Art of{" "}
                <br />
                <span style={{ color: "var(--gold)", fontStyle: "italic" }}>
                  <TypewriterText
                    words={TYPEWRITER_WORDS}
                    speed={75}
                    deleteSpeed={45}
                    pauseMs={2000}
                  />
                </span>
              </h1>
            </motion.div>

            {/* Subtext */}
            <motion.p
              variants={staggerItem}
              style={{
                fontSize: "clamp(1.05rem, 0.9rem + 0.4vw, 1.2rem)",
                color: "var(--text-muted)",
                marginBottom: "3rem",
                maxWidth: "42rem",
                fontWeight: 300,
                lineHeight: 1.8,
              }}
            >
              Experience skincare crafted from the world&apos;s finest botanicals.{" "}
              A ritual designed to restore, rejuvenate, and reveal your skin&apos;s true radiance.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={staggerItem}
              style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", justifyContent: "center" }}
            >
              <Button asChild variant="luxury" size="lg" style={{ minWidth: "200px" }}>
                <Link href={ROUTES.PRODUCTS}>Explore Collection</Link>
              </Button>
              <Button asChild variant="outline" size="lg" style={{ minWidth: "200px" }}>
                <Link href={ROUTES.ABOUT}>Our Story</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.75rem",
          color: "var(--text-muted)",
          zIndex: 10,
        }}
      >
        <span style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>
          Scroll
        </span>
        <div style={{ width: 1, height: "3rem", background: "var(--border)", position: "relative", overflow: "hidden" }}>
          <motion.div
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "50%", background: "var(--gold)" }}
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

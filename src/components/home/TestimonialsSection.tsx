"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star } from "lucide-react";
import { TypewriterText } from "@/components/ui/TypewriterText";

const testimonials = [
  {
    id: 1,
    quote: "The Radiance Elixir completely transformed my skin texture. It feels like a spa treatment every morning. Pure luxury in a bottle.",
    author: "Elena M.",
    role: "Verified Buyer",
    rating: 5,
  },
  {
    id: 2,
    quote: "I've tried countless premium brands, but Lavvyaashi's botanical blends are unmatched. The natural fragrances are subtle and sophisticated.",
    author: "Sarah J.",
    role: "Verified Buyer",
    rating: 5,
  },
  {
    id: 3,
    quote: "Finally, a skincare line that looks as beautiful on my vanity as it makes my skin feel. The Nourishing Body Butter is an absolute dream.",
    author: "Michelle K.",
    role: "Verified Buyer",
    rating: 5,
  },
];

const COMMUNITY_WORDS = ["our Community", "our Tribe", "Radiant Skin", "your Journey"];

export function TestimonialsSection() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        paddingTop: "clamp(5rem, 10vw, 9rem)",
        paddingBottom: "clamp(5rem, 10vw, 9rem)",
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        overflow: "hidden",
      }}
    >
      {/* Subtle parallax texture */}
      <motion.div
        style={{
          y: bgY,
          position: "absolute",
          inset: "-8% 0",
          zIndex: 0,
          pointerEvents: "none",
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(182,140,56,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] as const }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <span className="divider-gold" style={{ width: "12rem", margin: "0 auto 1.25rem" }}>
            Testimonials
          </span>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.2rem, 1.5rem + 3vw, 3.5rem)",
              fontWeight: 400,
              color: "var(--text)",
              margin: 0,
            }}
          >
            Words from{" "}
            <span style={{ color: "var(--gold)", fontStyle: "italic" }}>
              <TypewriterText
                words={COMMUNITY_WORDS}
                speed={80}
                deleteSpeed={50}
                pauseMs={2200}
              />
            </span>
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
          }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              style={{
                background: "var(--bg-card)",
                borderRadius: "1.25rem",
                border: "1px solid var(--border-light)",
                padding: "2.5rem 2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                boxShadow: "0 2px 20px rgba(44,42,40,0.06)",
              }}
            >
              {/* Stars */}
              <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1.25rem", color: "var(--gold)" }}>
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star key={si} style={{ width: "1.1rem", height: "1.1rem", fill: "currentColor" }} />
                ))}
              </div>

              {/* Quote */}
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.05rem, 0.95rem + 0.4vw, 1.15rem)",
                  fontStyle: "italic",
                  color: "var(--text)",
                  lineHeight: 1.75,
                  flex: 1,
                  marginBottom: "1.75rem",
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    fontSize: "0.8rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--text)",
                    margin: "0 0 0.25rem",
                  }}
                >
                  {t.author}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--text-subtle)",
                    margin: 0,
                  }}
                >
                  {t.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

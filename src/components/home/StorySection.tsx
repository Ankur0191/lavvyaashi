"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants";

export function StorySection() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rawImgY   = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const rawTextY  = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  const imgY  = useSpring(rawImgY,  { stiffness: 50, damping: 18 });
  const textY = useSpring(rawTextY, { stiffness: 50, damping: 18 });

  return (
    <section
      ref={containerRef}
      style={{
        paddingTop: "clamp(5rem, 10vw, 9rem)",
        paddingBottom: "clamp(5rem, 10vw, 9rem)",
        background: "var(--bg-primary)",
        overflow: "hidden",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "clamp(3rem, 6vw, 6rem)",
            alignItems: "center",
          }}
        >
          {/* Image with parallax */}
          <motion.div
            style={{
              position: "relative",
              aspectRatio: "4/5",
              borderRadius: "1.25rem",
              overflow: "hidden",
              background: "var(--bg-secondary)",
            }}
          >
            <motion.div style={{ y: imgY, position: "absolute", inset: "-12% 0", zIndex: 0 }}>
              <Image
                src="/images/story_ingredients.png"
                alt="Lavvyaashi Ingredients"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
            {/* Decorative border inset */}
            <div
              style={{
                position: "absolute",
                inset: "1rem",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "0.75rem",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
          </motion.div>

          {/* Text with counter-parallax */}
          <motion.div
            style={{ y: textY }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-sans)",
                fontSize: "0.7rem",
                fontWeight: 600,
                color: "var(--gold)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
              }}
            >
              Our Philosophy
            </span>

            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.4rem, 1.6rem + 3.5vw, 4rem)",
                fontWeight: 400,
                color: "var(--text)",
                lineHeight: 1.1,
                margin: "0 0 2rem",
              }}
            >
              Nature&apos;s Wisdom,
              <br />
              <span style={{ fontStyle: "italic" }}>Modern Elegance</span>
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2.5rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(0.95rem, 0.85rem + 0.4vw, 1.05rem)",
                  color: "var(--text-muted)",
                  lineHeight: 1.8,
                  fontWeight: 300,
                  margin: 0,
                }}
              >
                At Lavvyaashi, we believe true luxury lies in purity. Our formulations are born from
                a deep respect for natural botanicals and centuries-old skincare wisdom, elevated by
                modern dermatological science.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(0.95rem, 0.85rem + 0.4vw, 1.05rem)",
                  color: "var(--text-muted)",
                  lineHeight: 1.8,
                  fontWeight: 300,
                  margin: 0,
                }}
              >
                Every drop is meticulously crafted using sustainably sourced ingredients — no harsh
                chemicals, no synthetic fragrances, just pure, unadulterated nourishment for your skin.
              </p>
            </div>

            <Button asChild variant="outline" size="lg" style={{ minWidth: "180px" }}>
              <Link href={ROUTES.ABOUT}>Read Our Story</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

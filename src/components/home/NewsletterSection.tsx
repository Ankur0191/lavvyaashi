"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export function NewsletterSection() {
  const [email, setEmail] = React.useState("");
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to email provider
    alert(`Thank you! We'll be in touch at ${email}`);
    setEmail("");
  };

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        paddingTop: "clamp(5rem, 10vw, 9rem)",
        paddingBottom: "clamp(5rem, 10vw, 9rem)",
        background: "var(--bg-primary)",
        overflow: "hidden",
      }}
    >
      {/* Parallax botanical background */}
      <motion.div
        style={{
          y: bgY,
          position: "absolute",
          inset: "-10% 0",
          zIndex: 0,
          opacity: 0.12,
        }}
      >
        <Image
          src="/images/newsletter_bg.png"
          alt=""
          fill
          className="object-cover"
          aria-hidden="true"
        />
      </motion.div>

      {/* Gold glow orb */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(182,140,56,0.07) 0%, transparent 70%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          style={{
            maxWidth: "38rem",
            margin: "0 auto",
            textAlign: "center",
            background: "rgba(237,225,180,0.82)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderRadius: "1.75rem",
            border: "1px solid rgba(221,211,197,0.6)",
            padding: "clamp(2.5rem, 5vw, 4.5rem)",
            boxShadow: "0 8px 48px rgba(44,42,40,0.08)",
          }}
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
              marginBottom: "1.25rem",
            }}
          >
            Join the Inner Circle
          </span>

          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 1.4rem + 2.5vw, 3rem)",
              fontWeight: 400,
              color: "var(--text)",
              margin: "0 0 1rem",
            }}
          >
            Elevate Your Ritual
          </h2>

          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "1rem",
              color: "var(--text-muted)",
              lineHeight: 1.7,
              margin: "0 0 2rem",
            }}
          >
            Subscribe to receive exclusive access to new launches, private sales,
            and curated skincare advice directly from our experts.
          </p>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}
          >
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                flex: "1 1 200px",
                padding: "0.875rem 1.25rem",
                borderRadius: "0.625rem",
                border: "1px solid var(--border)",
                background: "rgba(255,255,255,0.7)",
                fontFamily: "var(--font-sans)",
                fontSize: "0.95rem",
                color: "var(--text)",
                outline: "none",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "0.875rem 1.75rem",
                borderRadius: "0.625rem",
                background: "linear-gradient(135deg, var(--gold) 0%, var(--dark-gold) 100%)",
                color: "#fff",
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "0.85rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                border: "none",
                transition: "opacity 0.2s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Subscribe
            </button>
          </form>

          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.65rem",
              color: "var(--text-subtle)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginTop: "1.25rem",
            }}
          >
            By subscribing, you agree to our Terms &amp; Privacy Policy.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

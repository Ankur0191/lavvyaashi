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

  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you! We'll be in touch at ${email}`);
    setEmail("");
  };

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        paddingTop: "clamp(6rem,10vw,9rem)",
        paddingBottom: "clamp(6rem,10vw,9rem)",
        overflow: "hidden",
        background: "#FBF7EF",
      }}
    >
      {/* Premium Background */}
      <motion.div
        style={{
          y: bgY,
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        <Image
          src="/images/newsletter_bg.png"
          alt=""
          fill
          priority={false}
          aria-hidden
          style={{
            objectFit: "cover",
            objectPosition: "center",
            transform: "scale(1.08)",
            filter:
              "brightness(1.08) contrast(1.22) saturate(1.08) sepia(.04)",
            opacity: 0.72,
          }}
        />

        {/* Soft white highlight */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at center, rgba(255,255,255,.12) 0%, rgba(255,255,255,.04) 45%, rgba(255,255,255,.18) 100%)",
          }}
        />

        {/* Beige Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(250,247,241,.12) 0%, rgba(250,247,241,.04) 50%, rgba(250,247,241,.12) 100%)",
          }}
        />

        {/* Luxury vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            boxShadow: "inset 0 0 180px rgba(255,255,255,.25)",
          }}
        />
      </motion.div>

      {/* Ambient Gold Lighting */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background: `
            radial-gradient(circle at 25% 25%, rgba(214,181,106,.18), transparent 40%),
            radial-gradient(circle at 75% 70%, rgba(190,150,70,.12), transparent 35%),
            radial-gradient(circle at 50% 50%, rgba(255,255,255,.05), transparent 55%)
          `,
        }}
      />

      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: .8,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            maxWidth: "720px",
            margin: "0 auto",
            textAlign: "center",

            background: "rgba(255,250,242,.90)",

            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",

            borderRadius: "32px",

            border:
              "1px solid rgba(193,158,79,.22)",

            padding:
              "clamp(3rem,5vw,4.5rem)",

            boxShadow:
              "0 30px 80px rgba(0,0,0,.08), 0 5px 20px rgba(201,165,92,.12)",
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: ".72rem",
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: "#B78A35",
              fontWeight: 600,
              marginBottom: "1.3rem",
            }}
          >
            Join the Inner Circle
          </span>

          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 400,
              fontSize: "clamp(2.4rem,5vw,4rem)",
              color: "#1D1D1D",
              marginBottom: "1.2rem",
              lineHeight: 1.1,
            }}
          >
            Elevate Your Ritual
          </h2>

          <p
            style={{
              maxWidth: "540px",
              margin: "0 auto 2.5rem",
              color: "#666",
              fontSize: "1.05rem",
              lineHeight: 1.8,
            }}
          >
            Subscribe to receive exclusive access to new launches,
            private sales and curated skincare advice directly
            from our experts.
          </p>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              gap: "14px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          ><input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                flex: "1 1 320px",
                minWidth: "260px",
                padding: "1rem 1.35rem",
                borderRadius: "14px",
                border: "1px solid rgba(0,0,0,.08)",
                background: "rgba(255,255,255,.94)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                fontSize: ".95rem",
                color: "#1D1D1D",
                outline: "none",
                transition: "all .35s ease",
                boxShadow: "0 4px 16px rgba(0,0,0,.03)",
              }}
              onFocus={(e) => {
                e.currentTarget.style.border = "1px solid rgba(183,138,53,.55)";
                e.currentTarget.style.boxShadow =
                  "0 0 0 4px rgba(183,138,53,.10)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.border = "1px solid rgba(0,0,0,.08)";
                e.currentTarget.style.boxShadow =
                  "0 4px 16px rgba(0,0,0,.03)";
              }}
            />

            <button
              type="submit"
              style={{
                padding: "1rem 2rem",
                borderRadius: "14px",
                border: "none",
                cursor: "pointer",

                background:
                  "linear-gradient(135deg,#B78A35 0%,#D4B56A 45%,#A77721 100%)",

                color: "#fff",

                fontWeight: 600,

                letterSpacing: ".15em",

                textTransform: "uppercase",

                transition: "all .35s ease",

                boxShadow:
                  "0 18px 40px rgba(183,138,53,.28)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow =
                  "0 25px 50px rgba(183,138,53,.40)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 18px 40px rgba(183,138,53,.28)";
              }}
            >
              Subscribe
            </button>

          </form>

          <p
            style={{
              marginTop: "1.5rem",
              fontSize: ".68rem",
              color: "#8A857C",
              letterSpacing: ".16em",
              textTransform: "uppercase",
              lineHeight: 1.8,
            }}
          >
            By subscribing, you agree to our Terms &amp; Privacy Policy.
          </p>

        </motion.div>
      </div>
    </section>
  );
}
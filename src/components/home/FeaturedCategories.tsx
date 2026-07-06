"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ROUTES } from "@/constants";

const categories = [
  {
    title: "Facial Care",
    subtitle: "Restore & Renew",
    image: "/images/category_face.png",
    link: `${ROUTES.PRODUCTS}?category=face`,
  },
  {
    title: "Body Rituals",
    subtitle: "Indulge & Nourish",
    image: "/images/category_body.png",
    link: `${ROUTES.PRODUCTS}?category=body`,
  },
  {
    title: "Bath & Shower",
    subtitle: "Unwind & Refresh",
    image: "/images/category_bath.png",
    link: `${ROUTES.PRODUCTS}?category=bath`,
  },
];

export function FeaturedCategories() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

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
      <div className="container">
        {/* Parallax heading */}
        <motion.div
          style={{ y: headingY }}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span className="divider-gold" style={{ width: "12rem", margin: "0 auto 1.25rem" }}>
              Curated
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
              Shop by <span style={{ fontStyle: "italic", color: "var(--gold)" }}>Ritual</span>
            </h2>
          </div>
        </motion.div>

        {/* Category cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.75rem",
          }}
        >
          {categories.map((cat, i) => (
            <CategoryCard key={cat.title} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({
  category,
  index,
}: {
  category: (typeof categories)[number];
  index: number;
}) {
  const cardRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay: index * 0.13, ease: [0.22, 1, 0.36, 1] as const }}
    >
      <Link
        href={category.link}
        style={{ display: "block", borderRadius: "1rem", overflow: "hidden", aspectRatio: "4/5", position: "relative", background: "var(--bg-secondary)" }}
      >
        {/* Parallax image */}
        <motion.div
          style={{ y: imgY, position: "absolute", inset: "-12% 0", zIndex: 0 }}
        >
          <Image
            src={category.image}
            alt={category.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </motion.div>

        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(44,42,40,0.65) 0%, rgba(44,42,40,0.1) 60%, transparent 100%)",
            zIndex: 1,
            transition: "background 0.5s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "linear-gradient(to top, rgba(44,42,40,0.8) 0%, rgba(44,42,40,0.25) 60%, transparent 100%)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "linear-gradient(to top, rgba(44,42,40,0.65) 0%, rgba(44,42,40,0.1) 60%, transparent 100%)";
          }}
        />

        {/* Text */}
        <div
          style={{
            position: "absolute",
            bottom: "1.75rem",
            left: "1.5rem",
            right: "1.5rem",
            zIndex: 2,
            color: "#fff",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.7rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
              margin: "0 0 0.4rem",
            }}
          >
            {category.subtitle}
          </p>
          <h3
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.4rem, 1rem + 1.5vw, 1.9rem)",
              fontWeight: 400,
              color: "#fff",
              margin: 0,
            }}
          >
            {category.title}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}

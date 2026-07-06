"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants";
import { formatPrice } from "@/utils";
import { Product } from "@/types";

const MOCK_PRODUCTS: Partial<Product>[] = [
  {
    id: "1",
    slug: "radiance-elixir",
    name: "Radiance Elixir Serum",
    category: { id: "c1", name: "Face", slug: "face" },
    thumbnail: "/images/category_face.png",
    price: 3499,
    mrp: 4500,
    tags: ["Best Seller"],
  },
  {
    id: "2",
    slug: "botanical-clay-mask",
    name: "Botanical Clay Mask",
    category: { id: "c1", name: "Face", slug: "face" },
    thumbnail: "/images/story_ingredients.png",
    price: 2199,
    mrp: 2199,
    tags: ["New Arrival"],
  },
  {
    id: "3",
    slug: "nourishing-body-butter",
    name: "Nourishing Body Butter",
    category: { id: "c2", name: "Body", slug: "body" },
    thumbnail: "/images/category_body.png",
    price: 1899,
    mrp: 2400,
    tags: [],
  },
  {
    id: "4",
    slug: "rosewater-mist",
    name: "Pure Rosewater Mist",
    category: { id: "c1", name: "Face", slug: "face" },
    thumbnail: "/images/category_bath.png",
    price: 1299,
    mrp: 1299,
    tags: ["Featured"],
  },
];

export function FeaturedProducts() {
  return (
    <section
      style={{
        paddingTop: "clamp(5rem, 10vw, 9rem)",
        paddingBottom: "clamp(5rem, 10vw, 9rem)",
        background: "var(--bg-secondary)",
      }}
    >
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <span className="divider-gold" style={{ width: "8rem", marginBottom: "1rem" }}>
              Trending
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
              Iconic <span style={{ fontStyle: "italic" }}>Formulations</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button asChild variant="link">
              <Link href={ROUTES.PRODUCTS}>View All Products →</Link>
            </Button>
          </motion.div>
        </div>

        {/* Products grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "2rem",
          }}
        >
          {MOCK_PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <Link
                href={ROUTES.PRODUCT(product.slug!)}
                style={{ display: "block", position: "relative", borderRadius: "0.75rem", overflow: "hidden", aspectRatio: "3/4", background: "var(--bg-tertiary)", marginBottom: "1rem" }}
              >
                {/* Tag */}
                {product.tags && product.tags.length > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "0.875rem",
                      left: "0.875rem",
                      zIndex: 10,
                      background: "rgba(255,255,255,0.92)",
                      backdropFilter: "blur(6px)",
                      padding: "0.3rem 0.75rem",
                      borderRadius: "0.25rem",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--text)",
                    }}
                  >
                    {product.tags[0]}
                  </div>
                )}

                <Image
                  src={product.thumbnail!}
                  alt={product.name!}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  style={{ transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.07)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
                />

                {/* Quick add overlay */}
                <div
                  className="product-quick-add"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "1rem",
                    background: "linear-gradient(to top, rgba(44,42,40,0.7) 0%, transparent 100%)",
                    transform: "translateY(100%)",
                    opacity: 0,
                    transition: "transform 0.35s ease, opacity 0.35s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.opacity = "1";
                  }}
                >
                  <button
                    onClick={(e) => e.preventDefault()}
                    style={{
                      width: "100%",
                      padding: "0.7rem",
                      borderRadius: "0.5rem",
                      background: "linear-gradient(135deg, var(--gold) 0%, var(--dark-gold) 100%)",
                      color: "#fff",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      cursor: "pointer",
                      border: "none",
                    }}
                  >
                    <ShoppingBag size={14} />
                    Quick Add
                  </button>
                </div>
              </Link>

              {/* Product info */}
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--text-subtle)",
                    margin: "0 0 0.35rem",
                  }}
                >
                  {product.category?.name}
                </p>
                <Link
                  href={ROUTES.PRODUCT(product.slug!)}
                  style={{
                    display: "block",
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.05rem, 0.9rem + 0.4vw, 1.2rem)",
                    color: "var(--text)",
                    marginBottom: "0.4rem",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text)")}
                >
                  {product.name}
                </Link>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontWeight: 500, color: "var(--text)" }}>
                    {formatPrice(product.price!)}
                  </span>
                  {product.mrp && product.mrp > product.price! && (
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--text-subtle)", textDecoration: "line-through" }}>
                      {formatPrice(product.mrp)}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

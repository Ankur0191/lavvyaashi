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
import { useCartStore } from "@/stores/useCartStore";
import { toast } from "sonner";

export function FeaturedProducts({
  products = [],
}: {
  products?: Partial<Product>[];
}) {
  const { addItem } = useCartStore();
  const [productToAdd, setProductToAdd] =
    React.useState<Partial<Product> | null>(null);

  const requestQuickAdd = (
    e: React.MouseEvent,
    product: Partial<Product>
  ) => {
    e.preventDefault();
    setProductToAdd(product);
  };

  const confirmQuickAdd = async () => {
    if (!productToAdd) {
      return;
    }

    await addItem(productToAdd);
    toast.success(`${productToAdd.name} added to cart`);
    setProductToAdd(null);
  };

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
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
          >
            <span
              className="divider-gold"
              style={{
                width: "8rem",
                marginBottom: "1rem",
              }}
            >
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
              Iconic{" "}
              <span style={{ fontStyle: "italic" }}>
                Formulations
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
          >
            <Button asChild variant="link">
              <Link href={ROUTES.PRODUCTS}>
                View All Products →
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Products Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "2rem",
          }}
        >
          {products.map((product, i) => {
            // Calculate discount percentage dynamically
            const discountPercentage =
              product.mrp &&
              product.price &&
              product.mrp > product.price
                ? Math.round(
                    ((product.mrp - product.price) /
                      product.mrp) *
                      100
                  )
                : 0;

            return (
              <motion.div
                key={product.id}
                initial={{
                  opacity: 0,
                  y: 36,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  margin: "-60px",
                }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
                whileHover={{
                  y: -5,
                  transition: {
                    duration: 0.3,
                  },
                }}
              >
                {/* Product Image */}
                <Link
                  href={ROUTES.PRODUCT(product.slug!)}
                  style={{
                    display: "block",
                    position: "relative",
                    borderRadius: "0.75rem",
                    overflow: "hidden",
                    aspectRatio: "3/4",
                    background: "var(--bg-tertiary)",
                    marginBottom: "1rem",
                  }}
                >
                  {/* Tag */}
                  {product.tags &&
                    product.tags.length > 0 && (
                      <div
                        style={{
                          position: "absolute",
                          top: "0.875rem",
                          left: "0.875rem",
                          zIndex: 10,
                          background:
                            "rgba(255,255,255,0.92)",
                          backdropFilter: "blur(6px)",
                          padding:
                            "0.3rem 0.75rem",
                          borderRadius: "0.25rem",
                          fontFamily:
                            "var(--font-sans)",
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

                  {/* Discount Badge */}
                  {discountPercentage > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        top: "0.875rem",
                        right: "0.875rem",
                        zIndex: 10,
                        background:
                          "var(--gold)",
                        color: "#fff",
                        padding:
                          "0.4rem 0.65rem",
                        borderRadius: "0.25rem",
                        fontFamily:
                          "var(--font-sans)",
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform:
                          "uppercase",
                      }}
                    >
                      {discountPercentage}% OFF
                    </div>
                  )}

                  <Image
                    src={
                      product.thumbnail ||
                      "/images/placeholder.png"
                    }
                    alt={
                      product.name || "Product"
                    }
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    style={{
                      transition:
                        "transform 0.8s cubic-bezier(0.22,1,0.36,1)",
                    }}
                    onMouseEnter={(e) => {
                      (
                        e.currentTarget as HTMLImageElement
                      ).style.transform =
                        "scale(1.07)";
                    }}
                    onMouseLeave={(e) => {
                      (
                        e.currentTarget as HTMLImageElement
                      ).style.transform =
                        "scale(1)";
                    }}
                  />

                  {/* Quick Add Overlay */}
                  <div
                    className="product-quick-add"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "1rem",
                      background:
                        "linear-gradient(to top, rgba(44,42,40,0.7) 0%, transparent 100%)",
                      transform:
                        "translateY(100%)",
                      opacity: 0,
                      transition:
                        "transform 0.35s ease, opacity 0.35s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(0)";
                      e.currentTarget.style.opacity =
                        "1";
                    }}
                  >
                    <button
                      onClick={(e) =>
                        requestQuickAdd(
                          e,
                          product
                        )
                      }
                      style={{
                        width: "100%",
                        padding: "0.7rem",
                        borderRadius:
                          "0.5rem",
                        background:
                          "linear-gradient(135deg, var(--gold) 0%, var(--dark-gold) 100%)",
                        color: "#fff",
                        fontFamily:
                          "var(--font-sans)",
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        letterSpacing:
                          "0.1em",
                        textTransform:
                          "uppercase",
                        display: "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "center",
                        gap: "0.5rem",
                        cursor: "pointer",
                        border: "none",
                      }}
                    >
                      <ShoppingBag
                        size={14}
                      />
                      Quick Add
                    </button>
                  </div>
                </Link>

                {/* Product Info */}
                <div
                  style={{
                    textAlign: "center",
                  }}
                >
                  {/* Category */}
                  <p
                    style={{
                      fontFamily:
                        "var(--font-sans)",
                      fontSize: "0.7rem",
                      letterSpacing:
                        "0.15em",
                      textTransform:
                        "uppercase",
                      color:
                        "var(--text-subtle)",
                      margin:
                        "0 0 0.35rem",
                    }}
                  >
                    {product.category
                      ?.name || "Premium"}
                  </p>

                  {/* Product Name */}
                  <Link
                    href={ROUTES.PRODUCT(
                      product.slug!
                    )}
                    style={{
                      display: "block",
                      fontFamily:
                        "var(--font-serif)",
                      fontSize:
                        "clamp(1.05rem, 0.9rem + 0.4vw, 1.2rem)",
                      color: "var(--text)",
                      marginBottom:
                        "0.5rem",
                      transition:
                        "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color =
                        "var(--gold)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color =
                        "var(--text)")
                    }
                  >
                    {product.name}
                  </Link>

                  {/* Pricing */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent:
                        "center",
                      gap: "0.6rem",
                      flexWrap: "wrap",
                    }}
                  >
                    {/* Current / Discounted Price */}
                    <span
                      style={{
                        fontFamily:
                          "var(--font-sans)",
                        fontWeight: 600,
                        color: "var(--text)",
                      }}
                    >
                      {formatPrice(
                        product.price!
                      )}
                    </span>

                    {/* Original MRP */}
                    {product.mrp &&
                      product.price &&
                      product.mrp >
                        product.price && (
                        <>
                          <span
                            style={{
                              fontFamily:
                                "var(--font-sans)",
                              fontSize:
                                "0.85rem",
                              color:
                                "var(--text-subtle)",
                              textDecoration:
                                "line-through",
                            }}
                          >
                            {formatPrice(
                              product.mrp
                            )}
                          </span>

                          {/* Discount Percentage */}
                          <span
                            style={{
                              fontFamily:
                                "var(--font-sans)",
                              fontSize:
                                "0.7rem",
                              fontWeight: 700,
                              letterSpacing:
                                "0.04em",
                              color:
                                "var(--gold)",
                            }}
                          >
                            {discountPercentage}% OFF
                          </span>
                        </>
                      )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {productToAdd && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="quick-add-confirmation-title"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "grid",
            placeItems: "center",
            padding: "1.5rem",
            background: "rgba(44, 42, 40, 0.45)",
          }}
        >
          <div
            style={{
              width: "min(100%, 28rem)",
              padding: "2rem",
              borderRadius: "0.75rem",
              background: "var(--bg-secondary)",
              boxShadow: "0 1rem 3rem rgba(44, 42, 40, 0.2)",
              textAlign: "center",
            }}
          >
            <h2
              id="quick-add-confirmation-title"
              style={{
                margin: "0 0 0.75rem",
                fontFamily: "var(--font-serif)",
                fontSize: "1.5rem",
                fontWeight: 400,
                color: "var(--text)",
              }}
            >
              Confirm your selection
            </h2>
            <p
              style={{
                margin: "0 0 1.5rem",
                color: "var(--text-subtle)",
              }}
            >
              Add {productToAdd.name || "this product"} to your cart?
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "0.75rem",
              }}
            >
              <button
                type="button"
                onClick={() => setProductToAdd(null)}
                style={{
                  padding: "0.7rem 1rem",
                  border: "1px solid var(--text-subtle)",
                  borderRadius: "0.5rem",
                  background: "transparent",
                  color: "var(--text)",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmQuickAdd}
                style={{
                  padding: "0.7rem 1rem",
                  border: "none",
                  borderRadius: "0.5rem",
                  background:
                    "linear-gradient(135deg, var(--gold) 0%, var(--dark-gold) 100%)",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Confirm add
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
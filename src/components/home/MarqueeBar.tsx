"use client";

import * as React from "react";

const brands = [
  "Vogue",
  "Harper's Bazaar",
  "Elle",
  "Cosmopolitan",
  "Marie Claire",
  "Vanity Fair",
  "GQ",
  "Allure",
];

const items = [...brands, ...brands];

export function MarqueeBar() {
  return (
    <div
      style={{
        width: "100%",
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        paddingTop: "1.25rem",
        paddingBottom: "1.25rem",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: "marquee 28s linear infinite",
        }}
      >
        {items.map((brand, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(0.8rem, 0.7rem + 0.5vw, 1rem)",
              color: "var(--text-subtle)",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              paddingInline: "2.5rem",
              whiteSpace: "nowrap",
              cursor: "default",
              transition: "color 0.25s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-subtle)")}
          >
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
}

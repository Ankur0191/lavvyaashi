"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { APP_NAME, APP_DESCRIPTION, FOOTER_LINKS, ROUTES } from "@/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
        paddingTop: "clamp(4rem, 8vw, 7rem)",
        paddingBottom: "2.5rem",
      }}
    >
      <div className="container">
        {/* Main grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "3rem",
            marginBottom: "3.5rem",
          }}
        >
          {/* Brand column */}
          <div style={{ gridColumn: "span 1" }}>
            <Link
              href={ROUTES.HOME}
              style={{
                display: "block",
                marginBottom: "1.5rem",
              }}
            >
              <Image 
                src="/lavvyaashi-logo.png" 
                alt={APP_NAME} 
                width={160} 
                height={48} 
                style={{ height: "40px", width: "auto", objectFit: "contain" }}
              />
            </Link>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.9rem",
                color: "var(--text-muted)",
                lineHeight: 1.75,
                maxWidth: "22rem",
                margin: "0 0 1.75rem",
              }}
            >
              {APP_DESCRIPTION}
            </p>

            {/* Social icons (placeholder) */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {["IG", "FB", "TW"].map((s) => (
                <span
                  key={s}
                  style={{
                    width: "2.25rem",
                    height: "2.25rem",
                    borderRadius: "50%",
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    color: "var(--text-subtle)",
                    cursor: "pointer",
                    transition: "border-color 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent-pink)";
                    e.currentTarget.style.color = "var(--accent-pink)";
                    e.currentTarget.style.boxShadow = "0 0 10px rgba(232,160,191,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.color = "var(--text-subtle)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--text)",
                margin: "0 0 1.5rem",
              }}
            >
              Shop
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--text-muted)", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--text)",
                margin: "0 0 1.5rem",
              }}
            >
              Company
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--text-muted)", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies links */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--text)",
                margin: "0 0 1.5rem",
              }}
            >
              Policies
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {FOOTER_LINKS.policies.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--text-muted)", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider with subtle gradient */}
        <div style={{ borderTop: "1px solid var(--border-light)", background: "linear-gradient(90deg, transparent, rgba(232,160,191,0.1), rgba(168,213,186,0.1), transparent)", height: "1px", width: "100%", marginBottom: "1.75rem" }} />
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--text-subtle)", margin: 0 }}>
            © {year} {APP_NAME}. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {[
              { label: "Privacy", href: ROUTES.PRIVACY },
              { label: "Terms", href: ROUTES.TERMS },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--text-subtle)", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-subtle)")}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

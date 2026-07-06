import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Inter } from "next/font/google";
import "./globals.css";
import { APP_DESCRIPTION, APP_NAME, APP_URL } from "@/constants";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Toaster } from "sonner";

/* ────────────────────────────────────────────────────────────────
   Font definitions — loaded via next/font for zero-CLS
──────────────────────────────────────────────────────────────── */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
  preload: true,
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
  preload: false,
});

/* ────────────────────────────────────────────────────────────────
   Root Metadata
──────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: `${APP_NAME} — Luxury Skincare`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  keywords: [
    "luxury skincare",
    "natural skincare",
    "premium beauty",
    "organic skincare",
    "lavvyaashi",
    "skincare India",
    "face care",
    "body care",
  ],
  authors: [{ name: APP_NAME, url: APP_URL }],
  creator: APP_NAME,
  publisher: APP_NAME,
  category: "Beauty & Skincare",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: APP_URL,
    siteName: APP_NAME,
    title: `${APP_NAME} — Luxury Skincare`,
    description: APP_DESCRIPTION,
    images: [
      {
        url: `${APP_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${APP_NAME} — Luxury Skincare`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} — Luxury Skincare`,
    description: APP_DESCRIPTION,
    images: [`${APP_URL}/og-image.jpg`],
    creator: "@lavvyaashi",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F4EE" },
    { media: "(prefers-color-scheme: dark)",  color: "#1A1814" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/* ────────────────────────────────────────────────────────────────
   Root Layout
──────────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${jost.variable} ${inter.variable}`}
    >
      <body className="antialiased flex flex-col min-h-screen">
        <SmoothScroll>
          <ThemeProvider>
            <Navbar />
            <PageWrapper className="flex-1 pt-navbar">
              {children}
            </PageWrapper>
            <Footer />
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: "var(--bg-card)",
                  color: "var(--text)",
                  border: "1px solid var(--border)",
                  fontFamily: "var(--font-sans)",
                },
              }}
            />
          </ThemeProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}

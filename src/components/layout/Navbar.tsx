"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, Variants } from "framer-motion";
import { cn } from "@/utils";
import { APP_NAME, NAV_ITEMS, ROUTES } from "@/constants";
import { useCartStore } from "@/stores/useCartStore";

// ----------------------------------------------------------------------
// 1. MAIN NAVBAR COMPONENT
// ----------------------------------------------------------------------

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isHidden, setIsHidden] = React.useState(false);
  const { scrollY } = useScroll();
  const { toggleCart, getItemCount } = useCartStore();

  // Contextual Smart Scroll (Disappears on scroll down, appears on scroll up)
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setIsScrolled(latest > 20);

    if (latest > 150 && latest > previous) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  // Prevent background scrolling when mobile navigation drawer is active
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [mobileMenuOpen]);

  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 h-[80px] flex items-center transition-all duration-luxury ease-luxury",
          isScrolled || !isHome
            ? "glass shadow-sm border-b border-brand-border/40"
            : "bg-transparent text-brand-text"
        )}
      >
        <div className="container h-full mx-auto px-4 md:px-8 flex items-center justify-between">

          {/* Mobile Menu Action */}
          <button
            className="md:hidden p-2 -ml-2 text-brand-text hover:text-gold transition-colors focus:outline-none"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5 stroke-[1.2]" />
          </button>

          {/* Editorial Logo */}
          <Link
            href={ROUTES.HOME}
            className="text-xl md:text-2xl font-serif tracking-[0.15em] uppercase flex-1 text-center md:flex-none md:text-left text-brand-text hover:opacity-80 transition-opacity"
          >
            {APP_NAME}
          </Link>

          {/* Desktop Nav - Central Focus Menu */}
          <DesktopNav pathname={pathname} />

          {/* Action Utilities */}
          <div className="flex items-center gap-4 md:gap-6 flex-1 justify-end md:flex-none text-brand-text">
            <button aria-label="Search Catalog" className="hover:text-gold transition-colors p-1">
              <Search className="w-[20px] h-[20px] stroke-[1.2]" />
            </button>

            <Link href={ROUTES.ACCOUNT} aria-label="Customer Profile" className="hover:text-gold transition-colors hidden sm:block p-1">
              <User className="w-[20px] h-[20px] stroke-[1.2]" />
            </Link>

            <button onClick={toggleCart} aria-label="Shopping Cart" className="hover:text-gold transition-colors relative group p-1">
              <ShoppingBag className="w-[20px] h-[20px] stroke-[1.2]" />
              {getItemCount() > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-medium text-white group-hover:scale-110 transition-transform duration-normal"
                >
                  {getItemCount()}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Drawer Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            onClose={() => setMobileMenuOpen(false)}
            pathname={pathname}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ----------------------------------------------------------------------
// 2. DESKTOP NAV COMPONENT
// ----------------------------------------------------------------------

function DesktopNav({ pathname }: { pathname: string }) {
  return (
    <nav className="hidden md:flex items-center gap-8 lg:gap-10 flex-1 justify-center relative h-full">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.label}
            href={item.href}
            className="relative py-2 px-1 text-fluid-xs font-sans font-light uppercase tracking-[0.25em] transition-colors duration-normal hover:text-gold group"
          >
            <span className={cn(
              "relative z-10 transition-opacity duration-normal",
              isActive ? "text-gold opacity-100" : "text-brand-text opacity-80 group-hover:opacity-100"
            )}>
              {item.label}
            </span>

            {/* Smooth Shared Layout Underline Indicator */}
            {isActive && (
              <motion.div
                layoutId="desktop-nav-underline"
                className="absolute left-0 right-0 bottom-0 h-[1px] bg-gold"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 32 }}
              />
            )}

            {/* Inactive Hover Micro-Animation */}
            {!isActive && (
              <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-gold scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-luxury ease-luxury" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

// ----------------------------------------------------------------------
// 3. MOBILE MENU COMPONENT
// ----------------------------------------------------------------------

const menuVariants: Variants = {
  hidden: { x: "-100%" },
  visible: {
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], staggerChildren: 0.08, delayChildren: 0.15 }
  },
  exit: {
    x: "-100%",
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
  }
};

const itemVariants: Variants = {
  hidden: { y: 16, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

function MobileMenu({ onClose, pathname }: { onClose: () => void; pathname: string }) {
  return (
    <>
      {/* Backdrop Backdrop blur filter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 bg-black/30 z-40 backdrop-blur-xs"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Structural Menu Content */}
      <motion.div
        variants={menuVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-y-0 left-0 w-[85vw] max-w-sm bg-brand-bg z-50 shadow-2xl flex flex-col border-r border-brand-border/30"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between p-6 border-b border-brand-border/40">
          <span className="text-lg font-serif tracking-wider uppercase text-brand-text">{APP_NAME}</span>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-brand-text hover:text-gold transition-colors focus:outline-none"
            aria-label="Close Navigation Menu"
          >
            <X className="w-5 h-5 stroke-[1.2]" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-8 px-8 flex flex-col space-y-6">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <motion.div key={item.label} variants={itemVariants}>
                <Link
                  href={item.href}
                  className={cn(
                    "text-fluid-sm font-light uppercase tracking-[0.15em] transition-colors flex items-center justify-between py-1",
                    isActive ? "text-gold" : "text-brand-text hover:text-gold"
                  )}
                >
                  {item.label}
                  {isActive && <span className="w-1 h-1 bg-gold rounded-full" />}
                </Link>
              </motion.div>
            );
          })}

          {/* Menu Drawer Utilities Footer */}
          <motion.div variants={itemVariants} className="pt-8 border-t border-brand-border/40 mt-auto flex flex-col space-y-4">
            <Link
              href={ROUTES.ACCOUNT}
              className="flex items-center space-x-3 text-fluid-xs font-light uppercase tracking-wider text-brand-text hover:text-gold transition-colors"
            >
              <User className="w-[16px] h-[16px] stroke-[1.2]" />
              <span>My Account</span>
            </Link>
          </motion.div>
        </nav>
      </motion.div>
    </>
  );
}
"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { useCommandStore } from "@/stores/admin/useCommandStore";

export function AdminCommandPalette() {
  const { isOpen, setCommandOpen } = useCommandStore();
  const [query, setQuery] = React.useState("");

  // Keyboard shortcut listener
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen(true);
      }
      if (e.key === "Escape" && isOpen) {
        setCommandOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setCommandOpen]);

  // Lock body scroll
  React.useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-[rgba(250,247,241,0.6)] backdrop-blur-md"
            onClick={() => setCommandOpen(false)}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-[var(--bg-card)] rounded-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1),0_0_0_1px_var(--border)] overflow-hidden flex flex-col"
          >
            {/* Input Header */}
            <div className="flex items-center px-4 py-4 border-b border-[var(--border)]">
              <Search className="w-5 h-5 text-[var(--text-muted)] mr-3 shrink-0" />
              <input
                autoFocus
                type="text"
                placeholder="Search orders, customers, or jump to a page..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-[var(--text)] text-base placeholder:text-[var(--text-subtle)]"
              />
              <button
                onClick={() => setCommandOpen(false)}
                className="p-1 rounded bg-[var(--bg-primary)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors text-xs font-medium px-2"
              >
                ESC
              </button>
            </div>

            {/* Results Area */}
            <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-thin">
              {query.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-[var(--text-muted)]">
                  Start typing to search the operating system.
                </div>
              ) : (
                <div className="px-2 py-4">
                  <div className="text-xs font-semibold text-[var(--text-subtle)] uppercase tracking-wider mb-2 px-2">
                    Quick Actions
                  </div>
                  <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[var(--bg-primary)] transition-colors group text-left">
                    <span className="text-sm font-medium text-[var(--text)]">Create new order</span>
                    <span className="text-[10px] text-[var(--text-subtle)] opacity-0 group-hover:opacity-100 transition-opacity">Jump</span>
                  </button>
                  <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[var(--bg-primary)] transition-colors group text-left">
                    <span className="text-sm font-medium text-[var(--text)]">View all customers</span>
                    <span className="text-[10px] text-[var(--text-subtle)] opacity-0 group-hover:opacity-100 transition-opacity">Jump</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

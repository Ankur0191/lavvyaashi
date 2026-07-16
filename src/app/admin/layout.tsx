"use client";

import * as React from "react";
import { Sidebar } from "@/components/admin/layout/Sidebar";
import { Topbar } from "@/components/admin/layout/Topbar";
import { AdminCommandPalette } from "@/components/admin/search/AdminCommandPalette";
import { useSidebarStore } from "@/stores/admin/useSidebarStore";
import { motion } from "framer-motion";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded } = useSidebarStore();

  return (
    <div className="admin-theme min-h-screen text-[var(--text)] bg-[var(--bg-primary)] overflow-hidden">
      <Sidebar />
      <AdminCommandPalette />
      
      <motion.div
        initial={false}
        animate={{
          paddingLeft: isExpanded ? "var(--sidebar-width)" : "var(--sidebar-width-collapsed)",
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col h-screen w-full overflow-hidden"
      >
        <Topbar />
        
        {/* Main Content Area - independent scrolling, max-width bounded */}
        <main className="flex-1 w-full overflow-y-auto scrollbar-thin">
          <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-[var(--space-4)] md:px-[var(--space-5)] py-[var(--space-4)]">
            {children}
          </div>
        </main>
      </motion.div>
    </div>
  );
}

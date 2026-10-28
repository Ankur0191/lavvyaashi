"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LogOut, LayoutPanelLeft } from "lucide-react";
import { cn } from "@/utils";
import { ADMIN_SIDEBAR_LINKS } from "@/constants/admin";
import { useSidebarStore } from "@/stores/admin/useSidebarStore";
import { useRouter } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isExpanded, toggleSidebar } = useSidebarStore();

  const handleLogout = async () => {
    await fetch("/api/admin-auth", { method: "DELETE" });
    router.push("/admin-login");
    router.refresh();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isExpanded && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-[90] backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}
      
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen z-[100] flex flex-col bg-[var(--bg-card)] border-r border-[var(--border)] overflow-hidden transition-all duration-300",
          isExpanded ? "translate-x-0 w-[var(--sidebar-width)]" : "-translate-x-full w-[var(--sidebar-width)]",
          "md:translate-x-0",
          isExpanded ? "md:w-[var(--sidebar-width)]" : "md:w-[var(--sidebar-width-collapsed)]"
        )}
      >
      {/* Header */}
      <div className="flex items-center h-[var(--topbar-height)] px-[var(--space-3)] border-b border-[var(--border)] shrink-0 justify-between">
        <motion.div
          animate={{ opacity: isExpanded ? 1 : 0, width: isExpanded ? "auto" : 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden whitespace-nowrap"
        >
          <Link href="/admin" className="font-serif text-[var(--text-card)] tracking-wider font-semibold">
            LAVVYAASHI
          </Link>
        </motion.div>
        
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-md text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-primary)] transition-colors focus:outline-none shrink-0"
          aria-label="Toggle Sidebar"
        >
          <LayoutPanelLeft className="w-5 h-5 stroke-[1.5]" />
        </button>
      </div>

      {/* Nav Items */}
      <div className="flex-1 overflow-y-auto py-[var(--space-3)] px-[var(--space-2)] scrollbar-thin flex flex-col gap-[var(--space-3)]">
        {ADMIN_SIDEBAR_LINKS.map((group) => (
          <div key={group.category} className="flex flex-col gap-[var(--space-1)]">
            {isExpanded && (
              <span className="text-[10px] font-semibold tracking-widest uppercase text-[var(--text-subtle)] px-3 mb-1">
                {group.category}
              </span>
            )}
            
            {group.items.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              const isSoon = "comingSoon" in item && item.comingSoon;

              if (isSoon) {
                return (
                  <div
                    key={item.label}
                    title={!isExpanded ? `${item.label} — Coming Soon` : undefined}
                    className="relative block cursor-not-allowed"
                  >
                    <div
                      className={cn(
                        "flex items-center rounded-lg text-[var(--text-subtle)] opacity-50",
                        isExpanded
                          ? "flex-row gap-3 px-3 py-2"
                          : "justify-center px-0 py-2.5"
                      )}
                    >
                      <Icon className="w-5 h-5 shrink-0 stroke-[1.5]" />
                      {isExpanded && (
                        <>
                          <span className="whitespace-nowrap text-sm flex-1">{item.label}</span>
                          <span className="text-[9px] font-semibold uppercase tracking-widest bg-[var(--gold)] text-white px-1.5 py-0.5 rounded-full leading-none">
                            Soon
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group relative block"
                  title={!isExpanded ? item.label : undefined}
                >
                  <div
                    className={cn(
                      "flex items-center rounded-lg text-[var(--text-body)] transition-all duration-200",
                      isExpanded
                        ? "flex-row gap-3 px-3 py-2"
                        : "justify-center px-0 py-2.5",
                      isActive
                        ? "bg-[var(--bg-primary)] text-[var(--text)] font-medium"
                        : "text-[var(--text-muted)] hover:bg-[var(--bg-primary)] hover:text-[var(--text)]"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-5 h-5 shrink-0 transition-colors",
                        isActive ? "stroke-[2px] text-[var(--gold)]" : "stroke-[1.5]"
                      )}
                    />
                    
                    {isExpanded && (
                      <span className="whitespace-nowrap text-sm">
                        {item.label}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer (Logout) */}
      <div className="p-[var(--space-2)] border-t border-[var(--border)] shrink-0">
        <button
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center rounded-lg text-[var(--text-body)] text-[var(--text-muted)] hover:bg-[var(--bg-primary)] hover:text-[var(--text)] transition-all duration-200",
            isExpanded ? "flex-row gap-3 px-3 py-2" : "justify-center px-0 py-2.5"
          )}
          title={!isExpanded ? "Logout" : undefined}
        >
          <LogOut className="w-5 h-5 shrink-0 stroke-[1.5]" />
          {isExpanded && (
            <span className="whitespace-nowrap text-sm text-left">Logout</span>
          )}
        </button>
      </div>
      </aside>
    </>
  );
}

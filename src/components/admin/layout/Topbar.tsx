"use client";

import * as React from "react";
import { Search, Bell, Settings } from "lucide-react";
import { useCommandStore } from "@/stores/admin/useCommandStore";

export function Topbar() {
  const { toggleCommand } = useCommandStore();

  return (
    <header className="h-[var(--topbar-height)] bg-[var(--bg-card)]/80 backdrop-blur-md border-b border-[var(--border)] flex items-center justify-between px-[var(--space-3)] sm:px-[var(--space-5)] sticky top-0 z-[50]">
      
      {/* Search (Max Width 600px) */}
      <div className="flex-1 max-w-[600px] flex items-center">
        <button
          onClick={toggleCommand}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg-primary)]/50 hover:bg-[var(--border-light)] transition-colors text-[var(--text-muted)] group text-[var(--text-body)]"
        >
          <Search className="w-[18px] h-[18px] stroke-[1.5] group-hover:text-[var(--text)] transition-colors" />
          <span className="flex-1 text-left whitespace-nowrap overflow-hidden text-ellipsis">Search everywhere...</span>
          <kbd className="hidden sm:inline-flex items-center gap-1 font-sans text-[10px] font-medium bg-[var(--bg-card)] border border-[var(--border)] px-1.5 py-0.5 rounded shadow-sm text-[var(--text-subtle)]">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Actions */}
      <div className="flex items-center gap-[var(--space-2)] shrink-0">
        
        <button className="relative p-2 rounded-full hover:bg-[var(--bg-primary)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--gold)]">
          <Bell className="w-5 h-5 stroke-[1.5]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--gold)] rounded-full ring-2 ring-[var(--bg-card)]" />
        </button>
        
        <button className="p-2 rounded-full hover:bg-[var(--bg-primary)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--gold)]">
          <Settings className="w-5 h-5 stroke-[1.5]" />
        </button>

        <div className="w-[1px] h-6 bg-[var(--border-light)] mx-1" />

        {/* Avatar Placeholder */}
        <button className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--gold)] to-[var(--gold-light)] border border-[var(--border)] shrink-0 ml-1 focus:outline-none focus:ring-2 focus:ring-[var(--gold)]" />
      </div>
    </header>
  );
}

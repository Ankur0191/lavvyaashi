"use client";

import * as React from "react";

interface ThemeProviderProps {
  children: React.ReactNode;
}

/** Light-only theme wrapper — next-themes removed to avoid script-tag warnings. */
export function ThemeProvider({ children }: ThemeProviderProps) {
  // Enforce light class on <html> once on mount
  React.useEffect(() => {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
  }, []);

  return <>{children}</>;
}

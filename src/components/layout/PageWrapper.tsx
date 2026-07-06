"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { pageTransition } from "@/animations/variants";

export function PageWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key="page"
        variants={pageTransition}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={className}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}

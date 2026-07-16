import * as React from "react";
import { cn } from "@/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface AdminCardProps extends HTMLMotionProps<"div"> {
  hoverLift?: boolean;
}

export const AdminCard = React.forwardRef<HTMLDivElement, AdminCardProps>(
  ({ className, hoverLift = false, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={hoverLift ? { y: -2, boxShadow: "0 12px 24px -10px rgba(0,0,0,0.08)" } : undefined}
        transition={{ duration: 0.2 }}
        className={cn(
          "bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] overflow-hidden",
          className
        )}
        {...props}
      />
    );
  }
);
AdminCard.displayName = "AdminCard";

export const AdminCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-[var(--space-3)] py-[var(--space-2)] border-b border-[var(--border-light)] flex items-center justify-between", className)}
      {...props}
    />
  )
);
AdminCardHeader.displayName = "AdminCardHeader";

export const AdminCardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-[var(--text-card)] font-semibold leading-none tracking-tight text-[var(--text)]", className)}
      {...props}
    />
  )
);
AdminCardTitle.displayName = "AdminCardTitle";

export const AdminCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-[var(--space-3)]", className)} {...props} />
  )
);
AdminCardContent.displayName = "AdminCardContent";

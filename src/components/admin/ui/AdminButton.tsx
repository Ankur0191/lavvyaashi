import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";
import { motion, HTMLMotionProps } from "framer-motion";

const adminButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[var(--text)] text-[var(--bg-primary)] hover:bg-[var(--text-muted)] shadow-sm",
        outline: "border border-[var(--border)] bg-transparent hover:bg-[var(--bg-primary)] hover:text-[var(--text)]",
        secondary: "bg-[var(--bg-primary)] text-[var(--text)] hover:bg-[var(--border-light)]",
        ghost: "hover:bg-[var(--bg-primary)] hover:text-[var(--text)] text-[var(--text-muted)]",
        danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-100",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-lg px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface AdminButtonProps
  extends Omit<HTMLMotionProps<"button">, "color">,
    VariantProps<typeof adminButtonVariants> {}

export const AdminButton = React.forwardRef<HTMLButtonElement, AdminButtonProps>(
  ({ className, variant, size, whileTap, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(adminButtonVariants({ variant, size, className }))}
        whileTap={whileTap || { scale: 0.98 }}
        {...props}
      />
    );
  }
);
AdminButton.displayName = "AdminButton";

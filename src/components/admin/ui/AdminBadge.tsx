import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";

const adminBadgeVariants = cva(
  "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-[var(--bg-primary)] text-[var(--text-muted)] border border-[var(--border)]",
        success: "bg-green-50 text-green-700 border border-green-200",
        warning: "bg-yellow-50 text-yellow-700 border border-yellow-200",
        danger: "bg-red-50 text-red-700 border border-red-200",
        gold: "bg-[#FDF9F1] text-[var(--gold)] border border-[#EBE3D0]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface AdminBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof adminBadgeVariants> {}

export function AdminBadge({ className, variant, ...props }: AdminBadgeProps) {
  return (
    <div className={cn(adminBadgeVariants({ variant }), className)} {...props} />
  );
}

import * as React from "react";
import { cn } from "@/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-shimmer rounded-md bg-brand-bg-secondary", className)}
      {...props}
    />
  );
}

export { Skeleton };

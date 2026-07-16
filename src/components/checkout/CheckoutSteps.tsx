import React from "react";
import { cn } from "@/utils";

interface CheckoutStepsProps {
  currentStep: number;
}

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  const steps = ["Cart", "Information", "Payment", "Confirm"];

  return (
    <div className="flex items-center w-full max-w-lg mx-auto mb-12">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-300 z-10",
                index <= currentStep
                  ? "bg-text text-bg-primary"
                  : "bg-bg-secondary text-text-muted border border-border"
              )}
            >
              {index + 1}
            </div>
            <span className={cn(
              "text-[10px] uppercase tracking-widest mt-2 absolute transform translate-y-10 whitespace-nowrap",
              index <= currentStep ? "text-text font-medium" : "text-text-muted"
            )}>
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "flex-1 h-[1px] transition-colors duration-300",
                index < currentStep ? "bg-text" : "bg-border"
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

"use client";

import Lottie from "lottie-react";
import successCheckAnimation from "@/lib/lottie/success-check";
import processingDotsAnimation from "@/lib/lottie/processing-dots";
import { cn } from "@/lib/utils";

type LottieSuccessProps = {
  variant?: "success" | "processing";
  className?: string;
};

export function LottieSuccess({
  variant = "success",
  className
}: LottieSuccessProps) {
  return (
    <div className={cn("pointer-events-none mx-auto size-32", className)}>
      <Lottie
        animationData={
          variant === "success"
            ? successCheckAnimation
            : processingDotsAnimation
        }
        loop={variant === "processing"}
        autoplay
      />
    </div>
  );
}

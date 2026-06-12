"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

type SafeMotionDivProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
};

export function SafeMotionDiv({ children, ...props }: SafeMotionDivProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    const { initial, animate, whileInView, viewport, transition, ...rest } = props;

    return <div {...rest}>{children}</div>;
  }

  return <motion.div {...props}>{children}</motion.div>;
}

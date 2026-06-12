"use client";

import { useEffect, useState, type ComponentProps } from "react";
import { motion } from "framer-motion";

type Props = ComponentProps<typeof motion.div>;

export function SafeMotionDiv(props: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={props.className} style={props.style}>
        {props.children}
      </div>
    );
  }

  return <motion.div {...props} />;
}

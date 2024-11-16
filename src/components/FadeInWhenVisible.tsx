"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function FadeInWhenVisible({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const randomDuration = () => Math.random() * 0.2 + 0.5;

  return (
    <motion.div
      className={cn("w-full", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: randomDuration(), ease: "easeOut" }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
    >
      {children}
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";

export default function AlternateTitle({
  brand,
  name,
}: {
  brand: string;
  name: string;
}) {
  return (
    <motion.div
      initial={{ y: 16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      className="fixed left-10 top-16 z-40 mt-1 xl:mt-0 w-fit rounded-md border bg-background px-2 opacity-85 xl:left-6 xl:top-4 sm:left-4"
    >
      <h1 className="line-clamp-1 max-w-[650px] overflow-ellipsis text-center text-lg font-medium text-foreground/90 sm:max-w-full sm:text-base">
        {brand} {name}
      </h1>
    </motion.div>
  );
}

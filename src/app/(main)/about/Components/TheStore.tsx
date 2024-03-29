"use client";

import { motion } from "framer-motion";
import fadeIn from "@utils/animations/fadeIn";

export default function TheStore() {
  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      <section className="mx-20 text-justify xl:mx-6 sm:mx-2">
        At Game Store, we're dedicated to bringing you the latest and greatest
        in gaming entertainment. Whether you're a casual gamer looking for some
        fun on the weekends or a hardcore enthusiast seeking the next big title,
        we've got something for everyone. Our extensive collection features a
        wide range of games across all platforms, including PC, console, and
        mobile. From action-packed adventures and immersive RPGs to thrilling
        multiplayer experiences and family-friendly favorites, there's no
        shortage of excitement here. But we're more than just a store – we're a
        community. Our passionate team of gaming experts is here to help you
        find the perfect game, answer your questions, and provide tips and
        tricks to enhance your gaming experience.
      </section>
    </motion.div>
  );
}

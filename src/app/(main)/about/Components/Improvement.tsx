"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import fadeIn from "@utils/animations/fadeIn";

export default function Improvement() {
  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="mx-20 flex flex-row gap-6 text-justify xl:mx-6 lg:flex-col sm:mx-2"
    >
      <p className="w-1/2 lg:w-full">
        At Game Toys Store, we're committed to constant innovation and
        improvement. We believe that staying ahead of the curve is essential in
        the ever-evolving world of gaming. That's why we're always on the
        lookout for the latest trends, technologies, and innovations to enhance
        your gaming experience. From updating our product selection with the
        newest releases to implementing cutting-edge features in our store,
        we're dedicated to providing you with the best possible gaming
        environment. Our team is constantly striving to learn and grow,
        attending industry events, and seeking feedback from our customers to
        ensure that we're meeting your needs and expectations. With each passing
        day, we're pushing the boundaries and setting new standards for
        excellence in gaming retail. Join us on this journey of continuous
        improvement, and let's elevate the world of gaming together!
      </p>
      <div className="w-1/2 lg:w-full">
        <Image
          alt="Category"
          src="/assets/images/gameSetup/g5.jpg"
          className="object-fit !relative h-full !w-full rounded-lg"
          layout="fill"
        />
      </div>
    </motion.div>
  );
}

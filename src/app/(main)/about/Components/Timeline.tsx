"use client";

import { motion } from "framer-motion";
import fadeIn from "@utils/animations/fadeIn";

interface Event {
  time: string;
  title: string;
  description: string;
}

export default function Timeline(): JSX.Element {
  const events: Event[] = [
    {
      time: "February 2022",
      title: "Application UI code in Tailwind CSS",
      description:
        "Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order E-commerce & Marketing pages.",
    },
    {
      time: "March 2022",
      title: "Marketing UI design in Figma",
      description:
        "All of the pages and components are first designed in Figma and we keep a parity between the two versions even as we update the project.",
    },
    {
      time: "April 2022",
      title: "E-Commerce UI code in Tailwind CSS",
      description:
        "Get started with dozens of web components and interactive elements built on top of Tailwind CSS.",
    },
    {
      time: "April 2022",
      title: "E-Commerce UI code in Tailwind CSS",
      description:
        "Get started with dozens of web components and interactive elements built on top of Tailwind CSS.",
    },
  ];

  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="mx-[16%] mt-10 h-fit w-auto"
    >
      <ul className="relative border-s border-background/75">
        {events.map((event, index) => (
          <li key={index} className="mb-10 ms-4">
            <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-primary"></div>
            <time className="mb-1 text-sm font-normal leading-none text-background/75">
              {event.time}
            </time>
            <h3 className="text-lg font-semibold text-background">
              {event.title}
            </h3>
            <p className="mb-4 text-base font-light text-background/60">
              {event.description}
            </p>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

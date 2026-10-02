"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useIntro } from "@/lib/intro";

const items = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const { done } = useIntro();
  const [brand, setBrand] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    const pastHero = v > window.innerHeight * 1.35;
    if (pastHero !== brand) setBrand(pastHero);
    // hide while scrolling down through content, return on scroll up
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(pastHero && v > prev);
  });

  return (
    <motion.nav
      aria-label="Primary"
      className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-5 text-fg md:px-10 md:py-7 ${
        brand ? "bg-bg/85 backdrop-blur-md" : ""
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: done ? 1 : 0, y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: done ? "auto" : "none" }}
    >
      <AnimatePresence>
        {brand ? (
          <motion.a
            key="brand"
            href="#"
            data-cursor="link"
            className="text-sm font-bold tracking-[0.04em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            NOGOM
          </motion.a>
        ) : (
          <span key="spacer" />
        )}
      </AnimatePresence>
      <ul className="flex gap-6 md:gap-10">
        {items.map((i) => (
          <li key={i.href}>
            <a
              href={i.href}
              data-cursor="link"
              className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] opacity-70 transition-opacity hover:opacity-100"
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}

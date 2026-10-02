"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import IntroReveal from "./IntroReveal";
import { useIntro } from "@/lib/intro";

/**
 * Signature interaction: the huge NOGOM shrinks and rises into the header
 * position while the introduction resolves beneath it, all driven by one
 * scroll-progress value over a sticky stage.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { done } = useIntro();
  const [small, setSmall] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setSmall(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const scale = useTransform(p, [0, 0.6], [1, small ? 0.4 : 0.24]);
  const y = useTransform(p, [0, 0.6], ["0vh", small ? "-36vh" : "-39vh"]);
  const hint = useTransform(p, [0, 0.1], [1, 0]);
  const textOpacity = useTransform(p, [0.3, 0.62], [0, 1]);
  const textY = useTransform(p, [0.3, 0.62], [48, 0]);

  return (
    <section ref={ref} className="relative h-[230svh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div className="absolute inset-0 will-change-transform" style={{ scale, y }}>
          <IntroReveal />
        </motion.div>

        <motion.div
          className="absolute inset-x-0 top-[38%] mx-auto max-w-5xl px-6 text-center md:top-[40%]"
          style={{ opacity: textOpacity, y: textY }}
        >
          <p className="label mb-6">Software Engineer</p>
          <p className="text-balance text-[clamp(1.6rem,4.2vw,3.5rem)] font-medium leading-[1.12] tracking-[-0.02em]">
            Building AI systems, full-stack products, automation and experimental hardware.
          </p>
        </motion.div>

        <motion.div
          className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-3"
          style={{ opacity: hint }}
          aria-hidden={!done}
        >
          <motion.span
            className="label"
            initial={{ opacity: 0 }}
            animate={{ opacity: done ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          >
            Scroll to explore
          </motion.span>
          <motion.span
            className="block h-10 w-px origin-top bg-fg/50"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: done ? 1 : 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          />
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useIntro } from "@/lib/intro";

const EASE = [0.16, 1, 0.3, 1] as const;

const soft = {
  initial: { opacity: 0, y: 22, filter: "blur(12px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -22, filter: "blur(12px)" },
  transition: { duration: 0.7, ease: EASE },
};

const nameClass =
  "absolute inset-0 flex items-center justify-center text-center font-light uppercase " +
  "text-[clamp(1.05rem,3.4vw,2.6rem)] tracking-[0.32em] pl-[0.32em] leading-[1.6]";

/**
 * The opening sequence: SARBESHWOR GHIMIRE → OM GHIMIRE → NOGOM.
 * Scroll is locked until NOGOM has settled, then released.
 */
export default function IntroReveal() {
  const { setDone } = useIntro();
  const [phase, setPhase] = useState(-1);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase(2);
      setDone(true);
      return;
    }

    const root = document.documentElement;
    root.style.overflow = "hidden";
    const timers = [
      setTimeout(() => setPhase(0), 300),
      setTimeout(() => setPhase(1), 1250),
      setTimeout(() => setPhase(2), 2150),
      setTimeout(() => {
        root.style.overflow = "";
        setDone(true);
      }, 3000),
    ];
    return () => {
      timers.forEach(clearTimeout);
      root.style.overflow = "";
    };
  }, [setDone]);

  return (
    <div className="absolute inset-0" aria-label="Sarbeshwor Ghimire, Om Ghimire, NOGOM" role="img">
      <AnimatePresence>
        {phase === 0 && (
          <motion.h1 key="full" className={nameClass} {...soft}>
            <span>
              <span className="block sm:inline">Sarbeshwor</span>{" "}
              <span className="block sm:inline">Ghimire</span>
            </span>
          </motion.h1>
        )}
        {phase === 1 && (
          <motion.h1 key="om" className={nameClass} {...soft}>
            Om Ghimire
          </motion.h1>
        )}
        {phase === 2 && (
          <h1
            key="nogom"
            className="absolute inset-0 flex items-center justify-center font-bold uppercase
              text-[clamp(4rem,23vw,24rem)] leading-[0.82] tracking-[-0.055em] pr-[0.055em]"
          >
            <span className="flex overflow-hidden py-[0.05em]" aria-hidden>
              {"NOGOM".split("").map((c, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ y: "108%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, ease: EASE, delay: i * 0.06 }}
                >
                  {c}
                </motion.span>
              ))}
            </span>
          </h1>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Mode = "idle" | "link" | "view";

/** Subtle desktop-only cursor: a dot that grows on links and reads VIEW on projects. */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("idle");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 600, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = (e.target as Element | null)?.closest?.("[data-cursor]");
      const kind = t?.getAttribute("data-cursor");
      setMode(kind === "view" ? "view" : kind === "link" ? "link" : "idle");
    };
    const leave = () => x.set(-100);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = mode === "view" ? 84 : mode === "link" ? 40 : 10;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: size,
        height: size,
        backgroundColor: mode === "link" ? "rgba(237,237,237,0)" : "rgba(237,237,237,1)",
        borderColor: "rgba(237,237,237,1)",
        borderWidth: 1,
      }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.span
        className="font-mono text-[0.625rem] tracking-[0.16em] text-bg"
        animate={{ opacity: mode === "view" ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        VIEW
      </motion.span>
    </motion.div>
  );
}

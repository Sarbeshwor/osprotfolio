"use client";

import { useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";

const text = "I build software that turns ideas into working systems.";

function Word({ word, range, p }: { word: string; range: [number, number]; p: MotionValue<number> }) {
  const opacity = useTransform(p, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {word}
    </motion.span>
  );
}

export default function Statement() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });
  const words = text.split(" ");

  return (
    <section ref={ref} className="mx-auto flex min-h-svh max-w-[100rem] flex-col justify-center px-5 py-32 md:px-10">
      <SectionLabel n="01" title="Introduction" />
      <h2 className="mt-12 max-w-[18ch] text-[clamp(2.5rem,8vw,8.5rem)] font-semibold leading-[0.98] tracking-[-0.04em] md:mt-16">
        {words.map((w, i) => (
          <Word key={i} word={w} p={p} range={[i / words.length, (i + 1) / words.length]} />
        ))}
      </h2>
      <Reveal className="mt-16 md:mt-24">
        <p className="label text-fg">AI · Full-Stack · Automation · Hardware</p>
      </Reveal>
    </section>
  );
}

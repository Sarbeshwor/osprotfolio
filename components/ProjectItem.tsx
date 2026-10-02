"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Project } from "@/lib/data";
import Visual from "./Visuals";
import Reveal from "./Reveal";

export default function ProjectItem({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const visualY = useTransform(p, [0, 1], ["-7%", "7%"]);
  const numberY = useTransform(p, [0, 1], [40, -40]);

  const Wrapper = project.href ? "a" : "div";
  const wrapperProps = project.href
    ? { href: project.href, target: "_blank", rel: "noreferrer" }
    : {};

  return (
    <article ref={ref} className="group border-t border-line">
      <Wrapper
        {...wrapperProps}
        data-cursor="view"
        className="grid gap-10 py-14 md:grid-cols-12 md:gap-12 md:py-28"
      >
        <div className="flex flex-col justify-between gap-12 md:col-span-5">
          <div>
            <motion.div style={{ y: numberY }} className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="font-mono text-sm text-muted">{project.index}</span>
              {project.note && <span className="label text-fg">{project.note}</span>}
            </motion.div>
            <h3 className="mt-6 text-[clamp(2.5rem,5.4vw,6rem)] font-semibold leading-[0.95] tracking-[-0.04em] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3">
              {project.title}
            </h3>
            <p className="mt-6 max-w-[34ch] text-lg leading-snug text-muted md:text-xl">
              {project.description}
            </p>
          </div>
          <div className="flex items-end justify-between">
            <ul className="label space-y-1 text-fg/80">
              {project.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <span
              aria-hidden
              className="text-4xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 md:text-5xl"
            >
              →
            </span>
          </div>
        </div>

        <Reveal className="md:col-span-7">
          <div className="relative aspect-[16/10] overflow-hidden border border-line transition-colors duration-500 group-hover:border-fg/40">
            <motion.div
              className={`absolute will-change-transform ${project.preview ? "inset-0" : "inset-[-8%]"}`}
              style={{ y: project.preview ? 0 : visualY }}
            >
              <div className="h-full w-full scale-100 transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
                {project.preview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.preview}
                    alt={`${project.title} website preview`}
                    loading="lazy"
                    className="h-full w-full object-cover object-top"
                  />
                ) : (
                  project.visual && <Visual kind={project.visual} />
                )}
              </div>
            </motion.div>
          </div>
        </Reveal>
      </Wrapper>
    </article>
  );
}

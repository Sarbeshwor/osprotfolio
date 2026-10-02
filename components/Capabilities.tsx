import { capabilities } from "@/lib/data";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";

export default function Capabilities() {
  return (
    <section className="mx-auto max-w-[100rem] px-5 py-24 md:px-10 md:py-40">
      <div className="mb-16 md:mb-24">
        <SectionLabel n="04" title="What I Build" />
      </div>
      <ul className="group/list">
        {capabilities.map((c) => (
          <li
            key={c.title}
            className="border-t border-line py-8 transition-opacity duration-500 md:py-12 group-hover/list:opacity-30 hover:!opacity-100"
          >
            <Reveal className="flex flex-col justify-between gap-3 md:flex-row md:items-baseline">
              <h3 className="text-[clamp(2.25rem,7vw,7rem)] font-semibold uppercase leading-[0.95] tracking-[-0.045em]">
                {c.title}
              </h3>
              <p className="label md:max-w-[28ch] md:text-right">{c.items}</p>
            </Reveal>
          </li>
        ))}
      </ul>
      <div className="border-t border-line" />
    </section>
  );
}

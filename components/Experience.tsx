import { experience } from "@/lib/data";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-[100rem] px-5 py-24 md:px-10 md:py-40">
      <div className="mb-16 md:mb-24">
        <SectionLabel n="03" title="Experience" />
      </div>
      {experience.map((e) => (
        <Reveal key={e.period}>
          <div className="grid gap-4 border-t border-line py-10 md:grid-cols-12 md:gap-12 md:py-14">
            <p className="label md:col-span-3">{e.period}</p>
            <div className="md:col-span-5">
              <h3 className="text-3xl font-semibold tracking-[-0.03em] md:text-5xl">{e.place}</h3>
              <p className="mt-2 text-muted">{e.role}</p>
            </div>
            <p className="max-w-[36ch] text-lg leading-snug text-muted md:col-span-4">{e.summary}</p>
          </div>
        </Reveal>
      ))}
      <div className="border-t border-line" />
    </section>
  );
}

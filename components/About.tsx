import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-[100rem] px-5 py-24 md:px-10 md:py-48">
      <SectionLabel n="05" title="About" />
      <div className="mt-12 grid gap-12 md:mt-20 md:grid-cols-12">
        <Reveal className="md:col-span-8">
          <p className="text-[clamp(1.9rem,4.4vw,4.25rem)] font-medium leading-[1.08] tracking-[-0.03em]">
            I&rsquo;m Sarbeshwor, but most people know me as <span className="underline decoration-1 underline-offset-[0.14em]">NOGOM</span>.
          </p>
        </Reveal>
        <Reveal delay={0.12} className="space-y-6 text-lg leading-relaxed text-muted md:col-span-4 md:col-start-9 md:pt-3">
          <p>
            I like building things that sit somewhere between software, AI and the physical world.
          </p>
          <p>
            Currently exploring AI agents, automation, robotics and products that solve real problems.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

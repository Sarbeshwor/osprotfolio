import { links } from "@/lib/data";
import Reveal from "./Reveal";

const social = [
  { label: "GitHub", href: links.github },
  { label: "LinkedIn", href: links.linkedin },
  { label: "Email", href: `mailto:${links.email}` },
];

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-[100rem] px-5 pb-16 pt-24 md:px-10 md:pb-24 md:pt-40">
      <Reveal>
        <h2 className="text-[clamp(3rem,14vw,15rem)] font-bold uppercase leading-[0.86] tracking-[-0.04em]">
          Let&rsquo;s build
          <br />
          something.
        </h2>
      </Reveal>

      <Reveal delay={0.1} className="mt-16 md:mt-24">
        <a
          href={`mailto:${links.email}`}
          data-cursor="link"
          className="group inline-flex items-center gap-4 border-b border-fg/40 pb-3 text-xl font-medium tracking-[-0.01em] transition-colors hover:border-fg md:text-3xl"
        >
          <span aria-hidden className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">→</span>
          Email me
        </a>
      </Reveal>

      <ul className="mt-20 flex flex-wrap gap-x-10 gap-y-3 md:mt-32">
        {social.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              data-cursor="link"
              className="label transition-colors hover:text-fg"
            >
              {s.label} ↗
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

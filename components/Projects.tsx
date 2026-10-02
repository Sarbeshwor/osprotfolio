import { projects } from "@/lib/data";
import ProjectItem from "./ProjectItem";
import SectionLabel from "./SectionLabel";

export default function Projects() {
  return (
    <section id="work" className="mx-auto max-w-[100rem] px-5 py-24 md:px-10 md:py-40">
      <div className="mb-16 md:mb-28">
        <SectionLabel n="02" title="Selected Work" />
      </div>
      {projects.map((p) => (
        <ProjectItem key={p.index} project={p} />
      ))}
      <div className="border-t border-line" />
    </section>
  );
}

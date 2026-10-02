export default function SectionLabel({ n, title }: { n: string; title: string }) {
  return (
    <p className="label flex gap-6">
      <span className="text-fg">{n}</span>
      <span>{title}</span>
    </p>
  );
}

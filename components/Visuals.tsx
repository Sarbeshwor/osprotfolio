import type { VisualKind } from "@/lib/data";

const r = (n: number) => Math.round(n * 10) / 10;

// deterministic pseudo-random so server and client markup match
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1, vectorEffect: "non-scaling-stroke" as const };

/** Topographic contours: terrain / field data. */
function Contours() {
  const rings = Array.from({ length: 14 }, (_, i) => {
    const base = 22 + i * 17;
    const pts = Array.from({ length: 90 }, (_, k) => {
      const a = (k / 90) * Math.PI * 2;
      const rad = base * (1 + 0.045 * Math.sin(3 * a + i * 0.22) + 0.025 * Math.sin(5 * a - i * 0.3));
      return `${k ? "L" : "M"}${r(400 + rad * 1.3 * Math.cos(a))} ${r(250 + rad * Math.sin(a))}`;
    });
    return pts.join("") + "Z";
  });
  return (
    <g>
      {rings.map((d, i) => (
        <g key={i}>
          <path d={d} {...stroke} opacity={0.18} />
          <path d={d} pathLength={1} className="draw" {...stroke} />
        </g>
      ))}
    </g>
  );
}

/** Booking timeline: rooms × nights. */
function Bookings() {
  const rand = rng(7);
  const rows = Array.from({ length: 8 }, (_, row) => {
    let x = 40 + rand() * 80;
    const bars: { x: number; w: number }[] = [];
    while (x < 700) {
      const w = 60 + rand() * 160;
      bars.push({ x: r(x), w: r(Math.min(w, 760 - x)) });
      x += w + 20 + rand() * 70;
    }
    return { y: 50 + row * 52, bars };
  });
  return (
    <g>
      {Array.from({ length: 15 }, (_, i) => (
        <line key={i} x1={40 + i * 50} x2={40 + i * 50} y1={30} y2={470} {...stroke} opacity={0.1} />
      ))}
      {rows.map((row, ri) =>
        row.bars.map((b, bi) => (
          <g key={`${ri}-${bi}`}>
            <rect x={b.x} y={row.y} width={b.w} height={26} {...stroke} opacity={0.4} />
            <rect
              x={b.x}
              y={row.y}
              width={b.w}
              height={26}
              className="bar"
              fill="currentColor"
              opacity={(ri + bi) % 3 === 0 ? 0.9 : 0.16}
            />
          </g>
        ))
      )}
    </g>
  );
}

/** A looping cursive toolpath, as a plotter would draw it. */
function Toolpath() {
  const pts = Array.from({ length: 400 }, (_, k) => {
    const t = (k / 400) * Math.PI * 2 * 9;
    const x = 70 + (k / 400) * 660 + 20 * Math.sin(t) * -1;
    const y = 240 + 70 * Math.cos(t) + 40 * Math.sin(t / 9);
    return `${k ? "L" : "M"}${r(x)} ${r(y)}`;
  }).join("");
  return (
    <g>
      <path d={pts} {...stroke} opacity={0.2} />
      <path d={pts} pathLength={1} className="draw" {...stroke} strokeWidth={1.5} />
      <g fontFamily="var(--font-mono), monospace" fontSize="10" fill="currentColor" opacity={0.5} letterSpacing="1">
        <text x="70" y="452">G1 X42.10 Y18.60 F1200</text>
        <text x="70" y="468">G1 X43.85 Y21.05</text>
      </g>
    </g>
  );
}

export default function Visual({ kind }: { kind: VisualKind }) {
  return (
    <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" className="h-full w-full text-fg" aria-hidden>
      {kind === "contours" && <Contours />}
      {kind === "bookings" && <Bookings />}
      {kind === "toolpath" && <Toolpath />}
    </svg>
  );
}

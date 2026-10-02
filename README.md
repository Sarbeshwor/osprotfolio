# NOGOM

Portfolio of Sarbeshwor Ghimire. Next.js (static export), TypeScript, Tailwind CSS v4, Framer Motion.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out
```

- Content (projects, experience, capabilities, links) lives in `lib/data.ts`.
- To add a project, append to `projects`. Add a new `visual` kind in `components/Visuals.tsx` if you want a new preview.
- Pushes to `main` deploy `./out` to GitHub Pages via `.github/workflows`.

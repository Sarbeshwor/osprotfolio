# OS Portfolio

A responsive personal portfolio website styled as an operating system interface.

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```

Visit `http://localhost:5173` to view the site in development mode.

### Production Build
```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

## 📦 Deployment

### GitHub Pages (Automatic)

This repository is configured for automatic deployment to GitHub Pages via GitHub Actions.

**Setup:**
1. Go to repository **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Push to the `main` branch to trigger automatic deployment

The site will be available at: `https://yourusername.github.io/osprotfolio/`

### Manual Deployment

After building, deploy the `dist/` folder to any static hosting service:
- Netlify
- Vercel
- Cloudflare Pages
- AWS S3 + CloudFront

## ⚙️ Configuration

### Base Path

The `vite.config.ts` has `base: '/osprotfolio/'` configured for GitHub Pages deployment at a subdirectory.

**For different deployment scenarios:**

- **Root domain** (e.g., `yourdomain.com`): Change to `base: '/'`
- **Subdirectory** (e.g., `yourdomain.com/portfolio/`): Change to `base: '/portfolio/'`

```ts
// vite.config.ts
export default defineConfig({
  base: '/osprotfolio/', // ← Adjust this
  // ...
})
```

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS 4** - Styling
- **Radix UI** - Accessible components
- **Material UI** - Additional components
- **Motion** - Animations

## 📁 Project Structure

```
osprotfolio/
├── src/
│   ├── app/
│   │   ├── App.tsx           # Main app component
│   │   ├── components/       # React components
│   │   └── pictures/         # Image assets
│   ├── styles/               # CSS styles
│   └── main.tsx              # Entry point
├── public/                   # Static assets
├── dist/                     # Build output (generated)
└── vite.config.ts            # Vite configuration
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 📄 License

See LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

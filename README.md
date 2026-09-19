# Portfolio site

A single-page portfolio for a bioinformatician: research, experience, projects, skills, and a small DNA-to-protein lab bench. Built with React, Vite, TypeScript, and Tailwind CSS.

Live site: https://nothandogama.github.io/

## Requirements

- Node.js 20 or newer
- npm (comes with Node)

## Local development

```sh
npm install
npm run dev
```

That starts the Vite dev server at http://localhost:5173.

```sh
npm run build
npm run preview
```

`build` type-checks and writes a production bundle to `dist/`. `preview` serves that bundle locally.

```sh
npm run lint
```

## Editing content

All copy, links, and lists live in [`src/data/content.ts`](src/data/content.ts). Edit that file and leave the components alone unless you are changing layout or behaviour.

Empty URL fields (`github`, `linkedin`, project `repoUrl`) stay empty until you have a real link. The site already treats those as disabled “coming soon” buttons.

## Deployment

This repo is a GitHub user site. Pushing to `main` runs `.github/workflows/deploy.yml`, which builds with Node 20 and publishes `dist/` to GitHub Pages.

One-time GitHub setup: **Settings → Pages → Source: GitHub Actions**. After that, every push to `main` (or a manual workflow run) updates https://nothandogama.github.io/.

If you ever move this project to a project repository instead of `nothandogama.github.io`, change `base` in `vite.config.ts` to `'/<repo-name>/'`.

# Aarohan site

Next.js (static export) site for Aarohan, NIT Durgapur.

## Run locally
```
npm install
npm run dev
```
Open http://localhost:3000

## Edit content
- Events: the `EVENTS` list at the top of `app/page.js`
- Colours and layout: `app/globals.css`
- Logo: `public/logo.png`

## Host on GitHub Pages
1. Push this folder to a GitHub repo (branch `main`).
2. In the repo go to Settings > Pages and set Source to "GitHub Actions".
3. Every push to `main` builds and deploys the site.
   It will be live at `https://<username>.github.io/<repo-name>/`.

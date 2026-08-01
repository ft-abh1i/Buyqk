# BuyQK mobile homepage

Pixel-focused React + Vite + TypeScript implementation of the supplied BuyQK mobile homepage reference.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The layout is calibrated for a **432 px mobile viewport**, matching the supplied 864 × 1536 reference at 2× density. It remains responsive down to 320 px.

Add the final WebP artwork using the exact filenames listed in `public/assets/README.md`. Until those files exist, the interface shows built-in fallbacks rather than broken images.

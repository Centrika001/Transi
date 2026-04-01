/**
 * FOCUS GROUP PRESENTATION DATA
 *
 * Instructions:
 * 1. Place your image files in the public/assets/ folders
 * 2. Update the paths below to match your file names
 * 3. Run `npm run dev` to start the presentation
 *
 * Supported image formats: PNG, JPG, SVG, WebP
 */

const data = {
  // ─── SECTION 1: Our Brand ───────────────────────────────────
  ourBrand: {
    title: 'Our Brand',
    slides: [
      {
        label: 'Logo',
        image: '/assets/our-brand/logo.png',
      },
      {
        label: 'Logo Variation',
        image: '/assets/our-brand/logo-variation.png',
      },
      {
        label: 'Color Palette',
        image: '/assets/our-brand/color-palette.png',
      },
      // Add more brand assets here:
      // { label: 'Typography', image: '/assets/our-brand/typography.png' },
    ],
  },

  // ─── SECTION 2: Our App Screenshots ─────────────────────────
  ourApp: {
    title: 'Our App',
    slides: [
      {
        label: 'Login Screen',
        image: '/assets/our-app/login.png',
      },
      {
        label: 'Home Screen',
        image: '/assets/our-app/home.png',
      },
      {
        label: 'Details Screen',
        image: '/assets/our-app/details.png',
      },
      // Add more screenshots:
      // { label: 'Settings', image: '/assets/our-app/settings.png' },
    ],
  },

  // ─── SECTION 3: Competitor Logos ─────────────────────────────
  competitorLogos: {
    title: 'Competitor Logos',
    competitors: [
      {
        name: 'Competitor A',
        logo: '/assets/competitors/logos/competitor-a.png',
      },
      {
        name: 'Competitor B',
        logo: '/assets/competitors/logos/competitor-b.png',
      },
      {
        name: 'Competitor C',
        logo: '/assets/competitors/logos/competitor-c.png',
      },
    ],
  },

  // ─── SECTION 4: App Comparison ──────────────────────────────
  appComparison: {
    title: 'App Comparison',
    // Each "screen" groups the equivalent screenshot from each app
    screens: [
      {
        label: 'Login Screen',
        apps: [
          { name: 'Our App', image: '/assets/our-app/login.png' },
          { name: 'Competitor A', image: '/assets/competitors/app-1/login.png' },
          { name: 'Competitor B', image: '/assets/competitors/app-2/login.png' },
          { name: 'Competitor C', image: '/assets/competitors/app-3/login.png' },
        ],
      },
      {
        label: 'Home Screen',
        apps: [
          { name: 'Our App', image: '/assets/our-app/home.png' },
          { name: 'Competitor A', image: '/assets/competitors/app-1/home.png' },
          { name: 'Competitor B', image: '/assets/competitors/app-2/home.png' },
          { name: 'Competitor C', image: '/assets/competitors/app-3/home.png' },
        ],
      },
      {
        label: 'Details Screen',
        apps: [
          { name: 'Our App', image: '/assets/our-app/details.png' },
          { name: 'Competitor A', image: '/assets/competitors/app-1/details.png' },
          { name: 'Competitor B', image: '/assets/competitors/app-2/details.png' },
          { name: 'Competitor C', image: '/assets/competitors/app-3/details.png' },
        ],
      },
    ],
  },
}

export default data

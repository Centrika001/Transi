/**
 * FOCUS GROUP PRESENTATION DATA
 *
 * Instructions:
 * 1. Place your image files in the public/assets/ folders
 * 2. Edit the competitor names and screen list below
 * 3. Run `npm run dev` to start the presentation
 *
 * Supported image formats: PNG, JPG, SVG, WebP
 */

// ─── EDIT NAMES HERE ─────────────────────────────────
const OUR_NAME = 'Our App'
const COMPETITOR_1 = 'Competitor A'
const COMPETITOR_2 = 'Competitor B'
const COMPETITOR_3 = 'Competitor C'
// ─────────────────────────────────────────────────────

// Screen names used in both "Our App" and "App Comparison" sections
const SCREENS = [
  { label: 'Login Screen',          file: 'login' },
  { label: 'Home Screen',           file: 'home' },
  { label: 'Money Transfer Screen', file: 'money-transfer' },
  { label: 'Payment Screen',        file: 'payment' },
  { label: 'Confirmation Page',     file: 'confirmation' },
]

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
        label: 'Avatar',
        image: '/assets/our-brand/avatar.png',
      },
    ],
  },

  // ─── SECTION 2: Our App Screenshots ─────────────────────────
  ourApp: {
    title: OUR_NAME,
    slides: SCREENS.map((s) => ({
      label: s.label,
      image: `/assets/our-app/${s.file}.png`,
    })),
  },

  // ─── SECTION 3: Competitor Logos ─────────────────────────────
  competitorLogos: {
    title: 'Competitor Logos',
    competitors: [
      { name: COMPETITOR_1, logo: '/assets/competitors/logos/competitor-a.png' },
      { name: COMPETITOR_2, logo: '/assets/competitors/logos/competitor-b.png' },
      { name: COMPETITOR_3, logo: '/assets/competitors/logos/competitor-c.png' },
    ],
  },

  // ─── SECTION 4: App Comparison ──────────────────────────────
  appComparison: {
    title: 'App Comparison',
    screens: SCREENS.map((s) => ({
      label: s.label,
      apps: [
        { name: OUR_NAME,     image: `/assets/our-app/${s.file}.png` },
        { name: COMPETITOR_1, image: `/assets/competitors/app-1/${s.file}.png` },
        { name: COMPETITOR_2, image: `/assets/competitors/app-2/${s.file}.png` },
        { name: COMPETITOR_3, image: `/assets/competitors/app-3/${s.file}.png` },
      ],
    })),
  },
}

export default data

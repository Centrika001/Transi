/**
 * FOCUS GROUP PRESENTATION DATA
 *
 * Names are configured via the in-app settings panel (press S).
 * This file defines the structure, screens, and image paths.
 *
 * Supported image formats: PNG, JPG, SVG, WebP
 */

// Screen names used in both "Our App" and "App Comparison" sections
const SCREENS = [
  { label: 'Login Screen',          file: 'login' },
  { label: 'Home Screen',           file: 'home' },
  { label: 'Money Transfer Screen', file: 'money-transfer' },
  { label: 'Payment Screen',        file: 'payment' },
  { label: 'Confirmation Page',     file: 'confirmation' },
]

export default function buildData(names) {
  const { ourName, competitor1, competitor2, competitor3 } = names

  return {
    ourBrand: {
      title: 'Our Brand',
      slides: [
        { label: 'Logo', image: '/assets/our-brand/logo.png' },
        { label: 'Avatar', image: '/assets/our-brand/avatar.png' },
      ],
    },

    ourApp: {
      title: ourName,
      slides: SCREENS.map((s) => ({
        label: s.label,
        image: `/assets/our-app/${s.file}.png`,
      })),
    },

    competitorLogos: {
      title: 'Competitor Logos',
      competitors: [
        { name: competitor1, logo: '/assets/competitors/logos/competitor-a.png' },
        { name: competitor2, logo: '/assets/competitors/logos/competitor-b.png' },
        { name: competitor3, logo: '/assets/competitors/logos/competitor-c.png' },
      ],
    },

    appComparison: {
      title: 'App Comparison',
      screens: SCREENS.map((s) => ({
        label: s.label,
        apps: [
          { name: ourName,     image: `/assets/our-app/${s.file}.png` },
          { name: competitor1, image: `/assets/competitors/app-1/${s.file}.png` },
          { name: competitor2, image: `/assets/competitors/app-2/${s.file}.png` },
          { name: competitor3, image: `/assets/competitors/app-3/${s.file}.png` },
        ],
      })),
    },
  }
}

/**
 * FOCUS GROUP PRESENTATION DATA
 *
 * Names are configured via the in-app settings panel (press S).
 * This file defines the structure, screens, and image paths.
 *
 * Supported image formats: PNG, JPG, SVG, WebP
 */

// All slides across every section, each with a unique id
export const ALL_SLIDES = [
  // Our Brand
  { id: 'brand:logo',         section: 'Our Brand',      label: 'Logo' },
  { id: 'brand:avatar',       section: 'Our Brand',      label: 'Avatar' },
  // Our App
  { id: 'app:login',          section: 'Our App',        label: 'Login Screen' },
  { id: 'app:home',           section: 'Our App',        label: 'Home Screen' },
  { id: 'app:money-transfer', section: 'Our App',        label: 'Money Transfer Screen' },
  { id: 'app:payment',        section: 'Our App',        label: 'Payment Screen' },
  { id: 'app:confirmation',   section: 'Our App',        label: 'Confirmation Page' },
  // Competitor Logos
  { id: 'logos:a',             section: 'Competitor Logos', label: 'Competitor 1 Logo' },
  { id: 'logos:b',             section: 'Competitor Logos', label: 'Competitor 2 Logo' },
  { id: 'logos:c',             section: 'Competitor Logos', label: 'Competitor 3 Logo' },
  { id: 'logos:compare',       section: 'Competitor Logos', label: 'All Logos Side by Side' },
  // App Comparison
  { id: 'compare:login',          section: 'App Comparison', label: 'Login Screen' },
  { id: 'compare:home',           section: 'App Comparison', label: 'Home Screen' },
  { id: 'compare:money-transfer', section: 'App Comparison', label: 'Money Transfer Screen' },
  { id: 'compare:payment',        section: 'App Comparison', label: 'Payment Screen' },
  { id: 'compare:confirmation',   section: 'App Comparison', label: 'Confirmation Page' },
]

// App screen files (shared between Our App and App Comparison)
const APP_SCREENS = [
  { label: 'Login Screen',          file: 'login',          id: 'app:login',    compareId: 'compare:login' },
  { label: 'Home Screen',           file: 'home',           id: 'app:home',     compareId: 'compare:home' },
  { label: 'Money Transfer Screen', file: 'money-transfer', id: 'app:money-transfer', compareId: 'compare:money-transfer' },
  { label: 'Payment Screen',        file: 'payment',        id: 'app:payment',  compareId: 'compare:payment' },
  { label: 'Confirmation Page',     file: 'confirmation',   id: 'app:confirmation', compareId: 'compare:confirmation' },
]

export default function buildData(names, disabledSlides = []) {
  const { ourName, competitor1, competitor2, competitor3 } = names
  const enabled = (id) => !disabledSlides.includes(id)
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')

  const brandSlides = []
  if (enabled('brand:avatar')) brandSlides.push({ label: 'Icon', image: `${base}/assets/our-brand/avatar.png` })
  if (enabled('brand:logo'))   brandSlides.push({ label: 'Logo',   image: `${base}/assets/our-brand/logo.png` })

  const appSlides = APP_SCREENS
    .filter((s) => enabled(s.id))
    .map((s) => ({ label: s.label, image: `${base}/assets/our-app/${s.file}.png` }))

  const competitors = []
  if (enabled('logos:a')) competitors.push({ name: competitor1, logo: `${base}/assets/competitors/logos/competitor-a.png` })
  if (enabled('logos:b')) competitors.push({ name: competitor2, logo: `${base}/assets/competitors/logos/competitor-b.png` })
  if (enabled('logos:c')) competitors.push({ name: competitor3, logo: `${base}/assets/competitors/logos/competitor-c.png` })
  const showLogosCompare = enabled('logos:compare')

  const compareScreens = APP_SCREENS
    .filter((s) => enabled(s.compareId))
    .map((s) => ({
      label: s.label,
      apps: [
        { name: ourName,     image: `${base}/assets/our-app/${s.file}.png` },
        { name: competitor1, image: `${base}/assets/competitors/app-1/${s.file}.png` },
        { name: competitor2, image: `${base}/assets/competitors/app-2/${s.file}.png` },
        { name: competitor3, image: `${base}/assets/competitors/app-3/${s.file}.png` },
      ],
    }))

  return {
    ourBrand: { title: 'Our Brand', slides: brandSlides },
    ourApp: { title: ourName, slides: appSlides },
    competitorLogos: { title: 'Competitor Logos', competitors, showCompare: showLogosCompare },
    appComparison: { title: 'App Comparison', screens: compareScreens },
  }
}

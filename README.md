# Transi — Focus Group Presentation

A simple presentation tool for running focus groups. The moderator navigates through slides using clicks, keyboard arrows, or swipe gestures.

## Sections

1. **Our Brand** — Logo and branding assets, shown one at a time
2. **Our App** — Mobile app screenshots, shown one at a time
3. **Competitor Logos** — Each competitor logo individually, then all side-by-side
4. **App Comparison** — Equivalent screens (login, home, etc.) from all apps side-by-side

## Setup

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Adding Your Images

Place your image files in the `public/assets/` folders:

```
public/assets/
├── our-brand/          # Logo, color palette, etc.
│   ├── logo.png
│   ├── logo-variation.png
│   └── color-palette.png
├── our-app/            # Your app screenshots
│   ├── login.png
│   ├── home.png
│   └── details.png
└── competitors/
    ├── logos/           # Competitor logos
    │   ├── competitor-a.png
    │   ├── competitor-b.png
    │   └── competitor-c.png
    ├── app-1/           # Competitor A screenshots
    │   ├── login.png
    │   ├── home.png
    │   └── details.png
    ├── app-2/           # Competitor B screenshots
    └── app-3/           # Competitor C screenshots
```

Then update `src/presentationData.js` to match your filenames and labels.

## Navigation

- **Click** the Next/Previous buttons
- **Keyboard**: Arrow keys, Space, Enter (forward), Backspace (back)
- **Swipe** left/right on touch devices
- **Section tabs** at the top to jump between sections

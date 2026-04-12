# Design System Strategy: The Cartographic Lens

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Surveyor"**

This design system moves beyond the standard "SaaS-dashboard" aesthetic to embrace an editorial, high-precision geospatial identity. We treat the digital interface as a living map—a high-end, layered artifact where technical precision meets organic earth tones. 

To break the "template" look, this system utilizes **Intentional Asymmetry** and **Tonal Depth**. We avoid rigid, boxed-in grids in favor of overlapping elements that mimic the stacking of GIS data layers. Hero sections should feature expansive white space paired with extreme-scale typography, creating a feeling of vastness—like viewing a landscape from a high-altitude drone.

---

## 2. Colors: The Earth & The Instrument
Our palette represents the intersection of the physical landscape (Greens/Terracotta) and the digital tools used to measure it (Technical Blue).

### Tone Roles
- **Primary (`#154212`)**: Represents the dense vegetation and NDVI data. Used for primary actions and deep-tone backgrounds.
- **Secondary (`#96482d`)**: The "Arica Earth" tone. Used for soil-related data visualization and warm accents that ground the technical UI.
- **Tertiary/Accent (`#003b64`)**: The "Hydraulic Precision" blue. Reserved for data-heavy elements, water resource indicators, and precise technical highlights.

### The "No-Line" Rule
To achieve a premium, editorial feel, **1px solid borders are prohibited for sectioning.** Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` section should sit directly against a `surface` background. The transition of color is the boundary.

### The "Glass & Gradient" Rule
To move beyond a "flat" appearance, use Glassmorphism for floating technical panels. Use a semi-transparent `surface` color with a `20px` backdrop-blur. 
*   **Signature Texture:** Apply a subtle radial gradient from `primary` to `primary_container` on large CTAs to provide a "lit from within" feel, mimicking a high-resolution satellite display.

---

## 3. Typography: Technical Authority
We pair **Manrope** (Display/Headline) with **Inter** (Body) to balance high-end editorial style with functional legibility.

- **Display (L/M/S):** Manrope. Extra-bold weight with tight letter-spacing (-2%). Used for "hero" statements that command attention.
- **Headline (L/M/S):** Manrope. Semi-bold. Used for section headers. These should often be paired with a `secondary` or `tertiary` color to break monochromatic monotony.
- **Title (L/M/S):** Inter. Medium weight. Used for card titles and navigation.
- **Body (L/M/S):** Inter. Regular weight. Optimized for readability in technical reports.
- **Label (M/S):** Inter. All-caps with +5% letter-spacing. Used for technical metadata, coordinates, and "kicker" text above headlines.

---

## 4. Elevation & Depth: Tonal Layering
Traditional dropshadows are often a "crutch" for poor layout. This system uses **Tonal Layering** to define hierarchy.

### The Layering Principle
Treat the UI as a series of stacked physical sheets:
1.  **Base Layer:** `surface` (The "Tabletop")
2.  **Section Layer:** `surface-container-low` (The "Paper")
3.  **Component Layer:** `surface-container-lowest` (The "Focused Card")

### Ambient Shadows & Ghost Borders
- **Shadows:** When a floating effect is required (e.g., a modal or floating drone menu), use an ultra-diffused shadow: `box-shadow: 0 24px 48px rgba(25, 28, 29, 0.06)`. The color is a tint of the `on-surface` token, not pure black.
- **The Ghost Border:** If a border is required for accessibility, use the `outline-variant` token at **15% opacity**. This creates a "suggestion" of a boundary without cluttering the visual field.

---

## 5. Components: Precision Primitives

### Buttons
- **Primary:** No border. Gradient fill from `primary` to `primary_container`. `md` (0.375rem) roundedness.
- **Secondary:** `surface-container-high` background with `on-surface` text. No border.
- **Tertiary:** No background. `on-surface` text with a subtle `primary` underline on hover.

### Cards
**Forbid the use of divider lines.** Separate content using the Spacing Scale (Vertical rhythm).
- **Layout:** Use `surface-container-lowest` with a "Ghost Border." 
- **Header:** Include a `label-sm` in `secondary` color for technical categorization (e.g., "SATELLITE DATA // 04.24").

### Technical Inputs
- **Text Fields:** Use a solid `surface-container-high` background. On focus, transition to a `tertiary` (Technical Blue) bottom-border (2px).
- **Chips:** `sm` (0.125rem) roundedness to feel more "industrial" and technical than "bubbly" consumer apps.

### Map-Specific Components (Additional)
- **Coordinate Overlay:** A floating glassmorphic panel in the bottom-right corner showing Lat/Long data using `label-md` in `tertiary`.
- **Topographic Watermark:** Use SVG topographic line patterns as a background texture on `surface-container-low` sections, at 5% opacity.

---

## 6. Do's and Don'ts

### Do
- **Do** use asymmetrical layouts where text is left-aligned and imagery or maps bleed off the right edge of the screen.
- **Do** use "nested depth"—placing high-priority data in the "lowest" (brightest) surface container to make it pop.
- **Do** use high-quality, desaturated photography of landscapes, allowing the `primary` and `secondary` UI colors to provide the saturation.

### Don't
- **Don't** use 100% opaque black or high-contrast grey borders. It breaks the "Cartographic Lens" immersion.
- **Don't** use standard 45-degree gradients. Use soft, wide-angle radial gradients to mimic natural light hitting a lens.
- **Don't** use "bubbly" or fully rounded buttons. Stick to the `md` (0.375rem) radius to maintain a professional, technical edge.
- **Don't** use dividers. If you feel the need for a line, increase the vertical whitespace by one increment in your spacing scale instead.
# Home Page Implementation Plan

## Status: READY FOR EXECUTION

## Decisions Made
- Fonts: Poppins (headings) + Inter (body)
- SVG illustrations: Include inline (car + motorcycle in hero)
- Calculator: Visual teaser only (links to /calculadora)
- Map: Real Google Maps iframe
- Brand colors: Navy #1E3A5F, Red #C8102E, Orange #F5A623

---

## Phase 1: Foundation (3 files to update)

### 1.1 `src/index.html`
- Change `lang="en"` to `lang="es"`
- Update `<title>` to "CIA Vial del Llano | Cursos para Descuento en Comparendos"
- Add `<meta name="description">` with SEO text
- Add `<meta name="theme-color" content="#1E3A5F">`
- Add Google Fonts preconnect + Poppins (600,700) + Inter (400,500,600)
- Add body classes: `font-body text-text-primary bg-white antialiased`

### 1.2 `src/styles.css`
- Keep `@import "tailwindcss"`
- Add `@theme` block with:
  - Brand colors (primary, accent, highlight + light/hover variants)
  - Semantic colors (success, warning, error, info + light variants)
  - Neutral gray scale (50-900)
  - Text colors (text-primary, text-secondary, text-inverse)
  - Surface colors (background, surface, surface-alt, border)
  - WhatsApp color (#25D366)
  - Font families (--font-sans: Poppins, --font-body: Inter)
  - Animations (float, fade-in, slide-up, pulse-glow, whatsapp-pulse)
- Add @keyframes (float, fade-in, slide-up, pulse-glow, whatsapp-pulse, scroll-bounce)
- Add utility CSS classes:
  - `.hero-gradient` - gradient + dot pattern overlay (::before)
  - `.glass` - frosted glass effect
  - `.wave-divider` - SVG wave section divider
  - `.card-hover` - cubic-bezier lift on hover
  - `.faq-content` / `.faq-content.open` - CSS grid accordion
  - `.scroll-indicator` - bounce animation
  - `:focus-visible` - a11y focus ring

### 1.3 `src/app/app.ts`
- Add `changeDetection: ChangeDetectionStrategy.OnPush`
- Import HeaderComponent, FooterComponent, WhatsappButtonComponent
- Keep RouterOutlet
- Remove signal('title') (unused)

### 1.4 `src/app/app.html`
- Replace content with layout shell:
  ```html
  <app-header />
  <main>
    <router-outlet />
  </main>
  <app-footer />
  <app-whatsapp-button />
  ```

---

## Phase 2: Core Layer (6 files to create)

### 2.1 `src/app/core/models/testimonial.model.ts`
```typescript
export interface Testimonial {
  readonly name: string;
  readonly role: string;
  readonly location: string;
  readonly quote: string;
  readonly rating: number; // 1-5
  readonly initials: string;
}
```

### 2.2 `src/app/core/models/faq.model.ts`
```typescript
export interface Faq {
  readonly question: string;
  readonly answer: string;
}
```

### 2.3 `src/app/core/data/config.data.ts`
- Company info: name, phone, whatsapp number, address, city, hours, coordinates
- Social links: Facebook, Instagram
- Google Maps embed URL

### 2.4 `src/app/core/data/testimonials.data.ts`
- 3-4 testimonials with names, roles, locations, quotes, ratings

### 2.5 `src/app/core/data/faqs.data.ts`
- 5 FAQ items (time limits, documents, duration, cost, same-day)

### 2.6 `src/app/core/services/whatsapp.service.ts`
- `providedIn: 'root'` service
- `inject()` pattern
- `generateLink(message?: string): string` - builds wa.me URL
- `openChat(message?: string): void` - window.open with SSR guard
- Default message: "Hola, quiero información sobre los cursos para descuento en comparendos"

---

## Phase 3: Shared Components (3 components)

### 3.1 Header Component (`src/app/shared/components/header/header.component.ts`)
- Fixed positioning, transparent → solid on scroll
- Logo + nav links (Inicio, Cursos, Calculadora, Ubicación, FAQ)
- WhatsApp CTA button in nav
- Mobile hamburger menu with slide panel
- SSR-safe scroll listener (isPlatformBrowser)
- Signals: `isScrolled`, `isMobileMenuOpen`
- OnPush, inline template

### 3.2 Footer Component (`src/app/shared/components/footer/footer.component.ts`)
- 4-column layout: Brand/description, Quick links, Contact info, Social/legal
- Navy background, white text
- Copyright year (computed from current year)
- OnPush, inline template

### 3.3 WhatsApp Floating Button (`src/app/shared/components/whatsapp-button/whatsapp-button.component.ts`)
- Fixed bottom-right FAB
- Green circle with WhatsApp SVG icon
- Pulse glow animation
- Tooltip on hover: "¿Necesitas ayuda?"
- Injects WhatsappService
- OnPush, inline template
- aria-label for accessibility

---

## Phase 4: Home Page Sections (9 section components)

All under `src/app/pages/home/components/`

### 4.1 `hero-section.component.ts`
- hero-gradient background with dot pattern
- Left: headline, subheadline, urgency badge, 2 CTA buttons (WhatsApp + Calculator anchor)
- Right: inline SVG illustration (car + motorcycle from Claude template)
- Bottom: stats bar (5,000+ cursos, 98% satisfacción, 10+ años)
- Wave divider at bottom
- Responsive: stack on mobile

### 4.2 `trust-badges-section.component.ts`
- Gray background bar
- 4 badges: MinTransporte, RUNT, SIMIT, SuperTransporte
- Text labels (no actual logos yet - use styled text/icons)
- Grayscale → color on hover
- "Habilitados y vigilados por las entidades oficiales"

### 4.3 `discounts-section.component.ts`
- Section header with pill badge "DESCUENTOS DISPONIBLES"
- 2-card grid:
  - Card 1: Comparendo Manual (50% first 5 business days, 25% days 6-20)
  - Card 2: Fotomulta (50% days 1-11, 25% days 12-26)
- Each card: gradient header, discount tiers, WhatsApp CTA
- Warning banner below: deadline reminder with alert icon

### 4.4 `steps-section.component.ts`
- Section header with pill badge "PROCESO SIMPLE"
- 4 steps: Consulta → Agenda → Curso → Descuento
- Gradient icon backgrounds, numbered badges
- Connecting line between steps (horizontal desktop, vertical mobile)
- CTA: "Comenzar ahora" → WhatsApp

### 4.5 `calculator-preview-section.component.ts`
- Section header with pill badge "CALCULA TU AHORRO"
- Visual mockup of calculator form (no functionality)
- Placeholder select, date input, radio buttons (styled)
- CTA button: "Ir a la Calculadora Completa" → /calculadora (routerLink)
- Secondary CTA: WhatsApp

### 4.6 `testimonials-section.component.ts`
- Section header with pill badge "TESTIMONIOS"
- 3-card grid
- Each card: avatar circle with initials, stars, quote, name+role
- card-hover effect
- Loads data from testimonials.data.ts

### 4.7 `location-section.component.ts`
- Section header with pill badge "UBICACIÓN"
- 2-column: info (address, hours, phone, navigation buttons) + Google Maps iframe
- Navigation buttons: Google Maps + Waze deep links
- Responsive: stack on mobile

### 4.8 `faq-section.component.ts`
- Section header with pill badge "PREGUNTAS FRECUENTES"
- 5 accordion items with CSS grid animation
- Signal for tracking open item index
- Chevron rotation on open/close
- Link: "Ver todas las preguntas" → /preguntas-frecuentes
- Loads data from faqs.data.ts

### 4.9 `final-cta-section.component.ts`
- Red/navy gradient background
- Icon + headline + subheadline
- Large WhatsApp CTA button
- Response time indicator: "Respuesta en menos de 5 minutos"

---

## Phase 5: Assembly

### 5.1 `src/app/pages/home/home.component.ts`
- Imports all 9 section components
- OnPush, inline template
- Simple vertical stack of sections
- Optional: scroll-based animations (IntersectionObserver) — defer to later

### 5.2 `src/app/app.routes.ts`
```typescript
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: '**', redirectTo: '' }
];
```

---

## Phase 6: Build & Verify
- Run `npm run build`
- Fix any TypeScript/template compilation errors
- Verify SSR doesn't crash (no unguarded window/document access)

---

## File Creation Order (for implementation)
1. `src/index.html` (update)
2. `src/styles.css` (update)
3. `src/app/core/models/testimonial.model.ts` (create)
4. `src/app/core/models/faq.model.ts` (create)
5. `src/app/core/data/config.data.ts` (create)
6. `src/app/core/data/testimonials.data.ts` (create)
7. `src/app/core/data/faqs.data.ts` (create)
8. `src/app/core/services/whatsapp.service.ts` (create)
9. `src/app/shared/components/header/header.component.ts` (create)
10. `src/app/shared/components/footer/footer.component.ts` (create)
11. `src/app/shared/components/whatsapp-button/whatsapp-button.component.ts` (create)
12. `src/app/pages/home/components/hero-section.component.ts` (create)
13. `src/app/pages/home/components/trust-badges-section.component.ts` (create)
14. `src/app/pages/home/components/discounts-section.component.ts` (create)
15. `src/app/pages/home/components/steps-section.component.ts` (create)
16. `src/app/pages/home/components/calculator-preview-section.component.ts` (create)
17. `src/app/pages/home/components/testimonials-section.component.ts` (create)
18. `src/app/pages/home/components/location-section.component.ts` (create)
19. `src/app/pages/home/components/faq-section.component.ts` (create)
20. `src/app/pages/home/components/final-cta-section.component.ts` (create)
21. `src/app/pages/home/home.component.ts` (create)
22. `src/app/app.routes.ts` (update)
23. `src/app/app.ts` (update)
24. `src/app/app.html` (update)
25. `src/app/app.css` (update - may remain empty)

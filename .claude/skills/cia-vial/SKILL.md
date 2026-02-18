---
name: cia-vial
description: CIA Vial del Llano project overview: architecture, pages, services, tech stack. Trigger: When starting work on project, navigating pages, or understanding architecture.
license: MIT
compatibility: opencode
metadata:
  author: cia-vial-team
  version: "1.0.0"
  scope: [root]
  audience: developers
  framework: angular
  project: cia-vial-del-llano
  auto_invoke:
    - "Understanding project architecture"
    - "Navigating between pages"
    - "Starting work on CIA Vial del Llano"
    - "Locating pages or components"
allowed-tools: Read, Glob, Grep, WebSearch, Task
---

# CIA Vial del Llano - Project Overview

## What I do

I provide comprehensive knowledge about the CIA Vial del Llano project architecture, helping agents understand:

- Project structure and organization
- Page relationships and dependencies
- Tech stack and framework decisions
- Where to implement new features
- How services interact with each other

## When to use me

Use this skill when:

- Starting work on the CIA Vial del Llano project
- Need to understand overall architecture
- Deciding where to implement a new feature
- Understanding page/component structure
- Navigating the codebase

## Project Overview

**CIA Vial del Llano** is a web application for a traffic education center (Centro Integral de Atención) located in Meta, Colombia.

**Business Model**: Informational and lead-generation site

- Provides information about traffic infraction courses (comparendos/fotomultas)
- Offers 50% discount (paid within 5 days) or 25% discount (paid within 90 days) on fines
- Converts visitors into clients via WhatsApp

**Tech Stack**:

- **Frontend Framework**: Angular 21 (standalone components, SSR enabled)
- **Language**: TypeScript 5.9 (strict mode)
- **Styling**: Tailwind CSS 4
- **Testing**: Vitest
- **SSR**: Angular Universal via `@angular/ssr`

## Architecture Decisions

### 1. Standalone Components (No NgModules)

All components are standalone - do NOT set `standalone: true` (it's the default in Angular 21+):

```typescript
@Component({
  selector: 'app-hero-section',
  // standalone: true  ← DO NOT add this, it's implicit
  imports: [RouterLink, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
```

### 2. OnPush Change Detection Everywhere

Optimal performance for SSR and web:

- Only checks for changes when inputs or signals change
- All components MUST use OnPush

### 3. Signal-based State Management

Modern Angular signals instead of RxJS subjects:

```typescript
// ✅ CORRECT - Signals
export class InfraccionesService {
  private readonly _infracciones = signal<Infraccion[]>([]);
  readonly infracciones = this._infracciones.asReadonly();
}

// ❌ WRONG - BehaviorSubject (deprecated for new code)
private infracciones$ = new BehaviorSubject<Infraccion[]>([]);
```

### 4. Page-based Lazy Loading

Each page is lazy-loaded for optimal bundle size:

```typescript
// app.routes.ts
{
  path: 'calculadora',
  loadComponent: () =>
    import('./pages/calculadora/calculadora.component')
      .then(m => m.CalculadoraComponent)
}
```

### 5. Server-Side Rendering (SSR)

The project uses `@angular/ssr` for:

- Better SEO (meta tags, structured data)
- Faster initial page loads
- Social media previews

**IMPORTANT**: Do not use browser-only APIs (`window`, `document`, `localStorage`) directly. Use `isPlatformBrowser()` guard or Angular's `inject(PLATFORM_ID)`.

## Project Structure

```
src/app/
├── core/                    # Core application logic
│   ├── data/                # Static data (no API)
│   │   ├── infracciones.data.ts   # Traffic infraction database (~200 items)
│   │   ├── testimonios.data.ts    # Client testimonials
│   │   ├── faqs.data.ts           # Frequently asked questions
│   │   └── config.ts              # App-wide configuration (phone, address, etc.)
│   │
│   ├── models/              # TypeScript interfaces
│   │   ├── infraccion.model.ts    # Infraction type (code, name, value, category)
│   │   └── testimonio.model.ts    # Testimonial type
│   │
│   └── services/            # Core singleton services
│       ├── whatsapp.service.ts    # WhatsApp message generation and redirect
│       ├── infracciones.service.ts # Infraction search/filter logic
│       └── seo.service.ts         # Meta tags and structured data management
│
├── pages/                   # Page components (lazy-loaded)
│   ├── home/                # Landing page
│   │   ├── home.component.ts
│   │   ├── home.component.html
│   │   └── sections/        # Page sections (hero, trust, how-it-works, etc.)
│   │       ├── hero/
│   │       ├── trust-badges/
│   │       ├── descuentos-info/
│   │       ├── como-funciona/
│   │       ├── calculadora-rapida/
│   │       ├── testimonios/
│   │       ├── ubicacion-preview/
│   │       └── faqs-home/
│   │
│   ├── cursos/              # Courses information page
│   ├── calculadora/         # Fine discount calculator page
│   ├── consultar-multas/    # Fine lookup tool page
│   ├── ubicacion/           # Location/map page
│   ├── preguntas-frecuentes/ # FAQ page
│   ├── nosotros/            # About page
│   └── contacto/            # Contact page
│
└── shared/                  # Shared resources (cross-feature)
    ├── components/          # Reusable UI components
    │   ├── header/          # Site navigation header
    │   ├── footer/          # Site footer
    │   ├── whatsapp-button/ # Floating WhatsApp CTA button
    │   ├── cta-section/     # Call-to-action section
    │   ├── trust-badges/    # Official entity logos
    │   ├── testimonial-card/ # Client testimonial card
    │   ├── countdown-timer/ # Days remaining counter
    │   ├── discount-card/   # Discount display (50%/25%)
    │   └── faq-accordion/   # FAQ accordion component
    └── pipes/
        └── currency-cop.pipe.ts  # Colombian peso formatter
```

## Page Descriptions

| Page                 | Route                   | Purpose                                                         |
| -------------------- | ----------------------- | --------------------------------------------------------------- |
| Home                 | `/`                     | Landing page - hero, discounts info, how it works, testimonials |
| Cursos               | `/cursos`               | Detailed course information                                     |
| Calculadora          | `/calculadora`          | Interactive fine discount calculator                            |
| Consultar Multas     | `/consultar-multas`     | Look up infraction codes and values                             |
| Ubicación            | `/ubicacion`            | Map and directions to the center                                |
| Preguntas Frecuentes | `/preguntas-frecuentes` | FAQ page                                                        |
| Nosotros             | `/nosotros`             | About the company                                               |
| Contacto             | `/contacto`             | Contact form and info                                           |

## Core Services

### WhatsApp Service (`whatsapp.service.ts`)

Primary conversion mechanism - generates pre-filled WhatsApp messages:

```typescript
// Generates wa.me link with pre-filled message
whatsappService.openChat('Quiero información sobre el curso para mi comparendo');
whatsappService.openChatForInfraction(infraccion);
```

### Infracciones Service (`infracciones.service.ts`)

Search and filter traffic infractions from static data:

```typescript
// Search by code or description
infraccionesService.search('C02');
infraccionesService.filter({ categoria: 'TRANSITO' });
```

### SEO Service (`seo.service.ts`)

Manage meta tags for SSR:

```typescript
seoService.setTitle('Calculadora de Descuentos | CIA Vial del Llano');
seoService.setDescription('Calcula tu descuento en multas...');
```

## Brand Colors (Tailwind Theme)

The project uses these semantic color classes:

| Class                             | Color                 | Usage               |
| --------------------------------- | --------------------- | ------------------- |
| `bg-primary` / `text-primary`     | `#1E3A5F` (navy blue) | Primary brand color |
| `bg-primary-light`                | `#2D5A87`             | Hover states        |
| `bg-accent-red`                   | `#C8102E`             | Accent/urgency      |
| `bg-highlight`                    | `#F5A623`             | CTA, highlights     |
| `text-gray-600` / `text-gray-700` | Neutral               | Body text           |

## Decision Tree: Where to implement?

```
New UI section for a page?
└─ Add to pages/<page-name>/sections/ or directly in page component

New reusable component (used in 2+ pages)?
└─ shared/components/

New page?
└─ pages/<page-name>/<page-name>.component.ts
└─ Register in app.routes.ts with loadComponent

New business logic (WhatsApp, calculator, search)?
└─ core/services/

New static data (infractions, FAQs, testimonials)?
└─ core/data/

New data model/interface?
└─ core/models/
```

## SSR Considerations

```typescript
// ✅ Correct - Guard browser-only code
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';

export class MyComponent {
  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Browser-only code (window, document, localStorage)
    }
  }
}

// ❌ Wrong - Direct browser API use (breaks SSR)
window.scrollTo(0, 0);
localStorage.getItem('key');
```

## Commands

```bash
# Development
npm start                     # Start dev server (web)
npm run build                 # Build for production
npm test                      # Run unit tests

# SSR
npm run serve:ssr:cia-vial-del-llano  # Run SSR server locally
```

## Related Skills

For specific patterns, use these skills:

- **Components**: [`angular-component`](../angular-component/SKILL.md)
- **Pages/Features**: [`angular-feature`](../angular-feature/SKILL.md)
- **HTTP**: [`angular-http`](../angular-http/SKILL.md)
- **API/Data**: [`cia-vial-api`](../cia-vial-api/SKILL.md)

## References

- **Main AGENTS.md**: `.claude/AGENTS.md`
- **Development Plan**: `PLAN_DESARROLLO_COMPLETO.md`

---

**Skill Version**: 1.0.0
**Last Updated**: February 2026
**Maintained by**: CIA Vial del Llano Team

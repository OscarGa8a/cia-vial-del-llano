---
name: angular-feature
description: Create complete Angular feature modules with routes, pages, components, and services for CIA Vial del Llano
license: MIT
compatibility: opencode
metadata:
  audience: developers
  framework: angular
  project: cia-vial-del-llano
---

## What I do

I create complete Angular feature pages following CIA Vial del Llano's architecture:

1. **Generate page directory structure** under `src/app/pages/`
2. **Create routes configuration** with lazy loading
3. **Register page** in `app.routes.ts`
4. **Follow all project conventions** (OnPush, Signals, path aliases)
5. **Add SSR-safe patterns** (`isPlatformBrowser` guards for browser APIs)
6. **Verify build** after creation

## When to use me

Use this skill when you need to:
- Create a new page from scratch
- Scaffold a page with multiple sections/components
- Set up a page with services and data integration
- Create shared components used across pages

## Page structure template

```
src/app/pages/<page-name>/
├── components/           # Page-specific components
│   ├── <section-name>/
│   │   ├── <section-name>.component.ts
│   │   ├── <section-name>.component.html  (only if template is large)
│   │   └── <section-name>.component.scss  (only if styles are needed)
│   └── index.ts         # Barrel exports
├── <page-name>.component.ts   # Main page component
├── <page-name>.component.html (only if template is large)
└── <page-name>.component.scss (only if styles needed)
```

**Note**: Prefer inline templates for small/medium components. Only extract to `.html` files when the template is large.

## Routes configuration pattern

```typescript
// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'cursos',
    loadComponent: () =>
      import('./pages/cursos/cursos.component').then((m) => m.CursosComponent),
  },
  {
    path: 'calculadora',
    loadComponent: () =>
      import('./pages/calculadora/calculadora.component').then(
        (m) => m.CalculadoraComponent
      ),
  },
];
```

## Page component pattern

```typescript
// src/app/pages/calculadora/calculadora.component.ts
import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

/**
 * Fine discount calculator page.
 * Allows users to calculate how much they can save on traffic fines
 * by taking a CIA Vial del Llano course.
 */
@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculadoraComponent {
  private platformId = inject(PLATFORM_ID);
  private title = inject(Title);
  private meta = inject(Meta);

  // State
  protected selectedInfraccion = signal<string | null>(null);
  protected isLoading = signal(false);

  // Computed
  protected hasSelection = computed(() => this.selectedInfraccion() !== null);

  constructor() {
    this.title.setTitle('Calculadora de Descuentos | CIA Vial del Llano');
    this.meta.updateTag({
      name: 'description',
      content: 'Calcula cuánto puedes ahorrar en tu comparendo tomando un curso vial.',
    });
  }

  /**
   * Handle infraction selection
   */
  protected selectInfraccion(codigo: string): void {
    this.selectedInfraccion.set(codigo);
  }
}
```

## SSR-safe pattern

```typescript
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({ ... })
export class SomeComponent {
  private platformId = inject(PLATFORM_ID);

  protected initMap(): void {
    // Always guard browser-only APIs
    if (isPlatformBrowser(this.platformId)) {
      // window, document, localStorage, etc. are safe here
    }
  }
}
```

## Service pattern (static data)

```typescript
// src/app/core/services/infracciones.service.ts
import { Injectable } from '@angular/core';
import { INFRACCIONES } from '../data/infracciones.data';
import { Infraccion } from '../models/infraccion.model';

/**
 * Service for querying traffic infractions and discount calculations.
 */
@Injectable({ providedIn: 'root' })
export class InfraccionesService {
  private readonly infracciones: Infraccion[] = INFRACCIONES;

  getAll(): Infraccion[] {
    return this.infracciones;
  }

  getByGravedad(gravedad: 'leve' | 'grave' | 'gravisima'): Infraccion[] {
    return this.infracciones.filter((i) => i.gravedad === gravedad);
  }

  calcularDescuento(infraccion: Infraccion): number {
    const porcentaje = infraccion.gravedad === 'leve' ? 0.5 : 0.25;
    return infraccion.valorSMLMV * porcentaje;
  }
}
```

## Shared component placement

```
src/app/shared/
├── components/
│   ├── header/                  # Site header/nav
│   ├── footer/                  # Site footer
│   ├── whatsapp-button/         # Floating WhatsApp CTA
│   ├── discount-card/           # Reusable discount display card
│   └── section-header/          # Section title/subtitle block
└── pipes/
    └── currency-cop/            # Colombian Peso formatting
```

## WhatsApp CTA pattern

```typescript
// src/app/core/services/whatsapp.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WhatsappService {
  private readonly phone = '573XXXXXXXXX';

  openChat(message: string): void {
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${this.phone}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  openCourseInquiry(infraccionCodigo?: string): void {
    const base = 'Hola, me interesa información sobre los cursos de educación vial';
    const msg = infraccionCodigo
      ? `${base} para la infracción ${infraccionCodigo}.`
      : `${base}.`;
    this.openChat(msg);
  }
}
```

**Note**: `window.open` in a service is fine for user-triggered actions, but if called during SSR initialization, guard with `isPlatformBrowser`.

## Register in app routes

```typescript
// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'cursos', loadComponent: () => import('./pages/cursos/cursos.component').then(m => m.CursosComponent) },
  { path: 'calculadora', loadComponent: () => import('./pages/calculadora/calculadora.component').then(m => m.CalculadoraComponent) },
  { path: 'consultar-multas', loadComponent: () => import('./pages/consultar-multas/consultar-multas.component').then(m => m.ConsultarMultasComponent) },
  { path: 'ubicacion', loadComponent: () => import('./pages/ubicacion/ubicacion.component').then(m => m.UbicacionComponent) },
  { path: 'preguntas-frecuentes', loadComponent: () => import('./pages/preguntas-frecuentes/preguntas-frecuentes.component').then(m => m.PreguntasFrecuentesComponent) },
  { path: 'nosotros', loadComponent: () => import('./pages/nosotros/nosotros.component').then(m => m.NosotrosComponent) },
  { path: 'contacto', loadComponent: () => import('./pages/contacto/contacto.component').then(m => m.ContactoComponent) },
  { path: '**', redirectTo: '' },
];
```

## Important rules

1. **ALWAYS use lazy loading** for page routes (`loadComponent`)
2. **Do NOT set `standalone: true`** in `@Component` — it is implicit in Angular 21+
3. **Use OnPush change detection** on every component
4. **Guard browser APIs** with `isPlatformBrowser()` for SSR safety
5. **No authentication guards** — this is a public informational site
6. **No API calls** — data lives in `src/app/core/data/` static files
7. **WhatsApp is the primary CTA** — every page should have a clear path to contact
8. **Run build verification** after scaffolding: `npm run build`

## Questions to ask before creating

1. **Page purpose**: What does this page show/do?
2. **Sections needed**: What sections does this page have?
3. **Data**: Does it use static data (infractions, FAQs, testimonials)?
4. **WhatsApp CTA**: What should the WhatsApp message say on this page?
5. **SEO**: What title/description should the page have?

## After creating

1. Verify all imports resolve correctly
2. Check route is registered in `app.routes.ts`
3. Run `npx tsc --noEmit` to verify TypeScript
4. Run `npm run build` to ensure no errors
5. Test navigation to the page

## Pages in CIA Vial del Llano

- **home** — Landing with hero, benefits, courses, testimonials, FAQ preview, CTA
- **cursos** — Course catalog (C1-C4 discount levels)
- **calculadora** — Fine discount calculator by infraction code
- **consultar-multas** — Fine lookup and guidance tool
- **ubicacion** — Location, map, hours, directions
- **preguntas-frecuentes** — FAQ accordion
- **nosotros** — About the school, certifications, team
- **contacto** — Contact form → WhatsApp redirect

## Example usage

```
Use the angular-feature skill to create the "calculadora" page.
It should let users select their infraction type and show how much
they can save by taking a CIA Vial del Llano course.
```

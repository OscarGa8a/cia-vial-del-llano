---
name: angular-component
description: Create Angular standalone components following CIA Vial del Llano project standards
license: MIT
compatibility: opencode
metadata:
  audience: developers
  framework: angular
  project: cia-vial-del-llano
---

## What I do

I create Angular standalone components following the CIA Vial del Llano project conventions:

1. **Generate component files** (.ts, .html, .css/.scss, .spec.ts)
2. **Use OnPush change detection strategy** for all components
3. **Use Angular Signals** (input(), output(), signal()) instead of @Input/@Output
4. **Follow naming conventions**:
   - Components: `*.component.ts` with `Component` suffix
   - Sections: `*.component.ts` for page sections (e.g. `hero.component.ts`)
5. **Add JSDoc documentation** (English) with examples
6. **Do NOT set `standalone: true`** (implicit in Angular 21+)
7. **Update barrel exports** (index.ts) if applicable
8. **Follow code style**: 2 spaces, single quotes, 100 char max

## When to use me

Use this skill when you need to:

- Create a new standalone component
- Create a new page section component
- Create a reusable UI component for shared/components
- Create a feature-specific component

## Component structure patterns

### Standard Component Pattern

````typescript
import { ChangeDetectionStrategy, Component, input, output, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Brief description of component
 *
 * @example
 * ```html
 * <app-discount-card [porcentaje]="50" (ctaClick)="handleCta()"></app-discount-card>
 * ```
 */
@Component({
  selector: 'app-discount-card',
  templateUrl: './discount-card.component.html',
  styleUrls: ['./discount-card.component.css'],
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscountCardComponent {
  // Inputs using signals
  readonly porcentaje = input.required<25 | 50>();
  readonly dias = input<number>(5);

  // Outputs
  readonly ctaClick = output<void>();

  // Internal state
  protected readonly isHighlighted = signal(false);

  // Computed values
  protected readonly cardTitle = computed(() => `${this.porcentaje()}% de descuento`);

  protected handleCtaClick(): void {
    this.ctaClick.emit();
  }
}
````

### Page Component Pattern

```typescript
import { Component, inject, signal, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';

/**
 * Calculadora page - fine discount calculator
 */
@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculadoraComponent implements OnInit {
  private seoService = inject(SeoService);
  private platformId = inject(PLATFORM_ID);

  protected readonly result = signal<DescuentoResult | null>(null);

  ngOnInit(): void {
    this.seoService.setPage({
      title: 'Calculadora de Descuentos',
      description: 'Calcula tu descuento en comparendos y fotomultas...',
    });
  }
}
```

### Page Section Component Pattern (inline template preferred for small sections)

```typescript
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Hero section for the home page
 */
@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="bg-primary text-white py-16 px-4">
      <h1 class="text-3xl font-bold">{{ title() }}</h1>
    </section>
  `,
})
export class HeroComponent {
  readonly title = input('Ahorra en tus multas de tránsito');
}
```

## Important rules

1. **ALWAYS use OnPush change detection**
2. **NEVER use @Input/@Output** - use input()/output() signals instead
3. **NEVER set `standalone: true`** - it's the default in Angular 21+
4. **ALWAYS add JSDoc** with at least one @example for shared components
5. **Component selector must start with 'app-'**
6. **NEVER use `@HostBinding` or `@HostListener`** - use `host` object instead
7. **Use inject() function** instead of constructor DI
8. **All comments/docs in English**, UI text in Spanish
9. **SSR safety**: Guard `window`/`document` usage with `isPlatformBrowser()`

## File locations

- Shared components: `src/app/shared/components/<component-name>/`
- Page sections: `src/app/pages/<page-name>/sections/<section-name>/`
- Pages: `src/app/pages/<page-name>/`

## After creating

1. Verify imports are correct
2. Run `npx tsc --noEmit` to verify TypeScript
3. Run `npm run build` to check SSR compatibility
4. Create unit tests in `.spec.ts` file

## Questions to ask

Before creating, ask the user:

- Where should this component live? (shared vs page-specific vs section)
- Is this a page, section, or reusable component?
- What inputs/outputs are needed?
- Does it need SSR safety (no window/document)?

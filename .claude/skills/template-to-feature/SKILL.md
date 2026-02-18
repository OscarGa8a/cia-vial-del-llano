---
name: template-to-feature
description: Convert HTML/Figma/images into fully functional Angular features following CIA Vial del Llano patterns. Trigger: When user asks to "convert template to feature", "implement design", "create feature from template", "convert HTML to Angular", "convert image to feature", or "implement screenshot as component".
license: MIT
compatibility: opencode
metadata:
  author: CIA Vial del Llano Team
  version: "2.0"
  scope: [root, pages, components]
  framework: angular
  project: cia-vial-del-llano
  auto_invoke: "Converting templates, designs, or images to Angular features"
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, Task, Question
---

## What I do

I convert HTML templates, Figma designs, images, screenshots, or visual mockups into fully functional Angular features following CIA Vial del Llano's strict architecture patterns:

1. **Analyze the template/design/image** and identify sections/components
2. **Request missing information** (source path, page name, purpose, etc.)
3. **Create page structure** with proper folder organization
4. **Implement components** using Angular 21+ standalone patterns
5. **Apply Tailwind styling** with semantic classes (no var(), no hex colors)
6. **Add TypeScript logic** with Signals (not BehaviorSubjects)
7. **Follow CIA Vial conventions** (OnPush, JSDoc, SSR-safe, no `standalone: true`)
8. **Integrate with routing** in `app.routes.ts`

## When to use me

Use this skill when:

- Converting HTML templates to Angular components
- Implementing Figma designs as pages/sections
- Creating features from image screenshots (PNG, JPG, etc.)
- Building components from UI mockups or wireframes
- Converting visual designs to code
- Migrating static HTML to Angular

---

## Required Information

Before starting, I need to gather:

### 1. Template/Design Source

**Any of these formats:**

- **HTML file path** (e.g., `templates/hero.html`)
- **Figma URL** (e.g., `https://figma.com/file/abc123`)
- **Image/Screenshot path** (e.g., `designs/home-page.png`)
- **Design mockup** in any image format (PNG, JPG, JPEG, WebP, SVG)

**How I Handle Images:**

- I can **read and analyze** image files directly
- I'll identify UI sections, layout structure, colors, typography
- I'll map visual design to CIA Vial brand colors (navy, red, orange)
- I'll ask clarifying questions about interactive elements

### 2. Feature Details

- **Page or component name** (e.g., "hero-section", "calculadora")
- **Feature type** (full page or reusable component)
- **WhatsApp CTA**: What should clicking "Contactar" do?

### 3. Functional Requirements

- **Main purpose** (what does this section/page do?)
- **Data sources** (static data from `core/data/`? or purely static copy?)
- **User interactions** (buttons, forms, accordion, calculator)

---

## Workflow Steps

### Step 1: Gather Information

If the user hasn't provided all required information, **ASK FOR IT**:

```
I'll help you convert this template to an Angular feature!

To get started, I need some information:

1. **Template Source**
   - Where is the HTML/image located? (file path)
   - OR: Do you have a Figma URL?

2. **Feature Details**
   - What page/component name? (e.g., "hero-section", "calculadora")
   - Is this a full page or a reusable section component?

3. **Functionality**
   - What is the main purpose of this feature?
   - What happens when users click the CTA / WhatsApp button?

Please provide as much detail as possible!
```

**DO NOT PROCEED** until you have at least:

- ✅ Template source (HTML file, Figma URL, or screenshot)
- ✅ Feature/component name
- ✅ Basic purpose/description

### Step 2: Analyze Design Structure

Once you have the design source:

#### If HTML File:

1. **Read the HTML** using Read tool
2. Parse structure and identify sections
3. Extract classes and styles

#### If Figma URL:

1. Ask user to describe key sections
2. Request color palette and typography
3. Identify components and layout

#### If Image/Screenshot:

1. **Read the image** using Read tool (images can be read directly)
2. **Analyze visually**:
   - Layout structure (hero, sections, footer)
   - UI components (cards, buttons, forms, accordions)
   - Color scheme → map to CIA Vial theme (navy, red, orange, white)
   - Typography (text sizes, weights, hierarchy)
   - Spacing and alignment
   - Interactive elements (buttons, inputs, links)
3. **Ask clarifying questions**:
   - "What happens when user clicks [button]?"
   - "Should [section] be scrollable?"
   - "What data populates [list]?"
   - "Is this a static page or does it need dynamic data?"

**Color Mapping Strategy:**

- Navy blue → `bg-primary` / `text-primary` (#1E3A5F)
- Red accent → `bg-accent` / `text-accent` (#C8102E)
- Orange CTA → `bg-cta` / `text-cta` (#F5A623)
- White surface → `bg-surface` / `bg-white`
- Light gray → `bg-background` (#F8F9FA)

#### Common Analysis Steps (All Sources):

3. **Identify sections/components**:
   - Main page component
   - Reusable section components (hero, cards, FAQ, testimonials)
   - Shared components (WhatsApp button, section header)
4. **List all sections**:
   - Hero / header
   - Content sections
   - CTA sections
   - Forms
5. **Identify data requirements**:
   - Is it static copy? → inline in template
   - Uses infractions data? → `InfraccionesService`
   - Uses testimonials/FAQs? → `core/data/` static files

**Present analysis to user**:

```markdown
## Template Analysis

**Page: home**

**Identified Sections:**

1. HeroSection — headline, subheadline, CTA button → WhatsApp
2. BenefitsSection — 3-column grid with icons and text
3. CoursesSection — course cards with discount levels
4. TestimonialsSection — carousel of student reviews
5. CtaSection — final call to action banner

**Data Needs:**

- Static copy (inline in templates)
- Course levels from `core/data/cursos.data.ts`
- Testimonials from `core/data/testimonios.data.ts`

**User Interactions:**

- CTA buttons → WhatsApp with pre-filled message
- Course cards → possibly link to /cursos page

Does this look correct? Any adjustments needed?
```

### Step 3: Create Feature Structure

Use the `angular-feature` skill to scaffold:

```
src/app/pages/<page-name>/
├── components/
│   ├── <section-name>/
│   │   ├── <section-name>.component.ts
│   │   └── (optional) <section-name>.component.html
│   └── index.ts
├── <page-name>.component.ts
└── (optional) <page-name>.component.html
```

**If it's a shared component**, place it in:

```
src/app/shared/components/<component-name>/
└── <component-name>.component.ts
```

### Step 4: Implement Components

For **each component** identified:

#### 4.1. Create Component File

```typescript
import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { WhatsappService } from '@core/services/whatsapp.service';

/**
 * Hero section for the home page.
 * Displays headline, subheadline, and primary CTA to WhatsApp.
 *
 * @example
 * <app-hero-section />
 */
@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSectionComponent {
  private whatsapp = inject(WhatsappService);

  /**
   * Navigate to WhatsApp with pre-filled course inquiry message.
   */
  protected openWhatsApp(): void {
    this.whatsapp.openCourseInquiry();
  }
}
```

#### 4.2. Create Template (HTML)

**CRITICAL RULES**:

- ✅ Use Tailwind classes (no inline styles)
- ✅ Use semantic color classes (`bg-primary`, not `bg-[#1E3A5F]`)
- ✅ Use `[class]` or `[class.xxx]` bindings (not `[ngClass]`)
- ✅ Use `@if`, `@for`, `@else` (new control flow)
- ✅ Use signals with `()` syntax in templates
- ✅ Add `aria-*` attributes for accessibility (WCAG AA)
- ✅ Use `NgOptimizedImage` for static images (not base64)
- ❌ NO `var()` in class attributes
- ❌ NO hex colors in templates
- ❌ NO `*ngIf`, `*ngFor` (legacy)
- ❌ NO arrow functions in templates
- ❌ NO `standalone: true` in `@Component`

```html
<!-- hero-section.component.html -->
<section class="bg-primary text-white py-20 px-4" aria-labelledby="hero-title">
  <div class="max-w-4xl mx-auto text-center">
    <h1 id="hero-title" class="text-4xl md:text-5xl font-bold mb-4">
      Reduce tu comparendo hasta un 50%
    </h1>
    <p class="text-lg md:text-xl text-white/80 mb-8">
      Toma un curso de educación vial en CIA Vial del Llano y obtén el descuento máximo.
    </p>
    <button
      type="button"
      class="bg-cta hover:bg-cta/90 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors"
      (click)="openWhatsApp()"
    >
      Consultar ahora por WhatsApp
    </button>
  </div>
</section>
```

### Step 5: Implement Page Component

Main page component orchestrates section components:

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { inject } from '@angular/core';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { BenefitsSectionComponent } from './components/benefits-section/benefits-section.component';
import { CoursesSectionComponent } from './components/courses-section/courses-section.component';

/**
 * Home page — main landing page for CIA Vial del Llano.
 *
 * Sections:
 * - Hero with primary CTA
 * - Benefits of taking the course
 * - Course discount levels (C1-C4)
 * - Testimonials
 * - FAQ preview
 * - Final CTA
 */
@Component({
  selector: 'app-home',
  imports: [HeroSectionComponent, BenefitsSectionComponent, CoursesSectionComponent],
  template: `
    <main>
      <app-hero-section />
      <app-benefits-section />
      <app-courses-section />
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private titleService = inject(Title);
  private meta = inject(Meta);

  constructor() {
    this.titleService.setTitle('CIA Vial del Llano | Cursos de Educación Vial en Meta');
    this.meta.updateTag({
      name: 'description',
      content:
        'Reduce tu comparendo hasta un 50% con los cursos de educación vial de CIA Vial del Llano en Villavicencio, Meta.',
    });
  }
}
```

### Step 6: WhatsApp Integration

Every page/section with a CTA should use `WhatsappService`:

```typescript
// src/app/core/services/whatsapp.service.ts
@Injectable({ providedIn: 'root' })
export class WhatsappService {
  openCourseInquiry(context?: string): void {
    const base = 'Hola, me interesa información sobre los cursos de educación vial';
    const msg = context ? `${base}: ${context}` : `${base}.`;
    this.openChat(msg);
  }

  private openChat(message: string): void {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/573XXXXXXXXX?text=${encoded}`, '_blank', 'noopener,noreferrer');
  }
}
```

### Step 7: Configure Route

Register in `src/app/app.routes.ts`:

```typescript
{
  path: 'nueva-pagina',
  loadComponent: () =>
    import('./pages/nueva-pagina/nueva-pagina.component').then(
      (m) => m.NuevaPaginaComponent
    ),
}
```

### Step 8: Update Barrel Exports (if needed)

```typescript
// src/app/pages/home/components/index.ts
export * from './hero-section/hero-section.component';
export * from './benefits-section/benefits-section.component';
export * from './courses-section/courses-section.component';
```

---

## Critical Patterns to Follow

### 1. Angular 21+ Patterns

```typescript
// ✅ CORRECT: Modern patterns
- Use `input()` for inputs (not @Input)
- Use `output()` for outputs (not @Output)
- Use `signal()` for state
- Use `computed()` for derived values
- Use `inject()` for dependency injection
- Use OnPush change detection
- Do NOT set standalone: true (implicit in Angular 21+)

// ❌ WRONG: Legacy patterns
- @Input() / @Output() decorators
- BehaviorSubject for state
- constructor DI
- NgModules
- standalone: true in @Component
```

### 2. Template Syntax

```html
<!-- ✅ CORRECT: New control flow -->
@if (condition) {
<div>Content</div>
} @for (item of items(); track item.id) {
<app-card [data]="item" />
} @else {
<p>No items</p>
}

<!-- ❌ WRONG: Legacy directives -->
<div *ngIf="condition">Content</div>
<div *ngFor="let item of items">...</div>
```

### 3. Styling with Tailwind

```html
<!-- ✅ CORRECT: Semantic classes -->
<div class="bg-primary text-white"></div>
<div [class.active]="isActive()"></div>
<div [class]="statusClasses()"></div>

<!-- ❌ WRONG: var(), hex colors, NgClass -->
<div class="bg-[var(--color-primary)]"></div>
<div class="bg-[#1E3A5F]"></div>
<div [ngClass]="{ 'active': isActive }"></div>
```

### 4. SSR Safety

```typescript
// ✅ Guard browser-only APIs
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';

export class SomeComponent {
  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Safe to use window, document, etc.
    }
  }
}
```

### 5. Accessibility (WCAG AA)

```html
<!-- ✅ Proper heading hierarchy -->
<h1>Page title</h1>
<h2>Section title</h2>

<!-- ✅ Button accessibility -->
<button type="button" aria-label="Consultar por WhatsApp">Consultar</button>

<!-- ✅ Image alt text -->
<img ngSrc="/assets/logo.png" alt="CIA Vial del Llano logo" width="120" height="40" />

<!-- ✅ Form labels -->
<label for="nombre">Nombre</label>
<input id="nombre" type="text" />

<!-- ✅ ARIA landmarks -->
<main>
  ,
  <nav>
    ,
    <header>
      ,
      <footer>
        ,
        <section aria-labelledby="..."></section>
      </footer>
    </header>
  </nav>
</main>
```

---

## Quality Checklist

Before completing, verify:

### Code Quality

- [ ] All components use `OnPush` change detection
- [ ] No `standalone: true` in `@Component`
- [ ] All inputs use `input()` function
- [ ] All outputs use `output()` function
- [ ] All state uses `signal()`
- [ ] All computed values use `computed()`
- [ ] All DI uses `inject()`
- [ ] JSDoc on all public methods/components
- [ ] TypeScript strict mode compliant

### Styling

- [ ] No `var()` in class attributes
- [ ] No hex colors in templates
- [ ] Semantic Tailwind classes used (`bg-primary`, `bg-cta`, etc.)
- [ ] `[class]` or `[class.xxx]` bindings (not `[ngClass]`)
- [ ] Responsive design with breakpoints

### Templates

- [ ] New control flow (`@if`, `@for`, `@else`)
- [ ] No legacy directives (`*ngIf`, `*ngFor`)
- [ ] Signal syntax with `()` in templates
- [ ] No arrow functions in templates
- [ ] Accessibility attributes (aria-\*, proper roles, labels)
- [ ] `NgOptimizedImage` for static images

### Architecture

- [ ] Pages under `src/app/pages/`
- [ ] Shared components under `src/app/shared/components/`
- [ ] Route registered in `app.routes.ts` (lazy-loaded)
- [ ] SSR-safe (no bare browser API usage)
- [ ] WhatsApp CTA wired to `WhatsappService`

### Testing

- [ ] TypeScript compiles: `npx tsc --noEmit`
- [ ] App builds: `npm run build`
- [ ] No console errors in browser

---

## Communication Pattern

### When Starting

```
I'll convert this design to an Angular feature!

**Analysis Summary:**
- Feature: home page
- Sections: 5 (Hero, Benefits, Courses, Testimonials, CTA)
- Route: / (root)
- Data: static copy + cursos.data.ts

**Files to create:**
1. src/app/pages/home/home.component.ts
2. src/app/pages/home/components/hero-section/...
3. src/app/pages/home/components/benefits-section/...
4. src/app/pages/home/components/courses-section/...
5. src/app/pages/home/components/index.ts

Proceeding with implementation...
```

### When Complete

```
Template conversion complete!

**Created Files:**
- 6 TypeScript files
- 4 HTML templates

**Next Steps:**
1. Navigate to http://localhost:4200
2. Verify the page renders correctly
3. Test WhatsApp CTA buttons
4. Run npm run build to verify SSR

Would you like me to:
- Add more sections?
- Implement additional pages?
- Add the calculator logic?
```

---

## Notes

- **Always ask for clarification** if requirements are unclear
- **Present analysis before implementation** to confirm understanding
- **Follow CIA Vial del Llano patterns strictly** (no exceptions)
- **Use modern Angular patterns** (Signals, standalone, new control flow)
- **Document everything** with JSDoc in English
- **Test compilation** before marking complete

---

## Related Skills

- `angular-component` — Create standalone components
- `angular-feature` — Scaffold page structure
- `tailwind-4` — Tailwind styling patterns
- `cia-vial` — Project overview and business context
- `git-commit` — Commit changes when complete

---

## Success Criteria

A successful conversion includes:

✅ All components implemented with modern Angular patterns
✅ Styling matches design using Tailwind semantic classes
✅ TypeScript compiles without errors
✅ Route configured and lazy-loaded
✅ WhatsApp CTAs wired correctly
✅ SSR-safe (no bare window/document usage)
✅ Accessible (WCAG AA: labels, headings, alt text, ARIA)
✅ JSDoc documentation on all components

---

**Version:** 2.0
**Last Updated:** February 2026
**Maintained by:** CIA Vial del Llano Development Team

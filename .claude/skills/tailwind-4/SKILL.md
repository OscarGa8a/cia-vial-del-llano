---
name: tailwind-4
description: Tailwind CSS 4 patterns and best practices for Angular projects. Trigger: When styling with Tailwind (class, [class], [style] bindings) in Angular templates or components.
license: MIT
compatibility: opencode
metadata:
  author: prowler-cloud (adapted for Angular 21+)
  version: "4.0"
  scope: [root, ui, components]
  framework: angular
  project: cia-vial-del-llano
  auto_invoke: "Working with Tailwind classes in Angular"
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, Task
---

## ⚠️ IMPORTANT: Modern Angular Patterns

This skill uses **modern Angular 21+ patterns** for class and style bindings:

- ✅ `[class]` and `[class.xxx]` bindings (modern, recommended)
- ✅ `[style]` and `[style.property]` bindings (modern, recommended)
- ⚠️ NgClass and NgStyle are **legacy directives** - avoid unless absolutely necessary

**Angular official docs now recommend direct bindings over directive-based approaches.**

See: https://angular.dev/guide/templates/binding#css-class-and-style-property-bindings

---

## What I do

I provide Tailwind CSS 4 best practices for Angular projects:

1. **Use semantic class names** from the `@theme` configuration
2. **Avoid inline var() in class attributes** - use semantic classes instead
3. **Use [class] and [class.xxx] bindings for conditional styling** (Modern Angular pattern)
4. **Use [style] binding for dynamic values** that can't be expressed in Tailwind
5. **Follow Tailwind 4 conventions** with CSS variables in `@theme`

## When to use me

Use this skill when:

- Styling Angular components with Tailwind CSS
- Working with conditional classes using `[class]` and `[class.xxx]` bindings
- Defining or modifying theme colors in `styles.css`
- Choosing between `class`, `[class]`, or `[style]` binding

---

## Styling Decision Tree for Angular

```
Static classes only?              → class="..."
Single conditional class?         → [class.class-name]="condition"
Multiple conditional classes?     → [class]="classesObject"
Computed conditional classes?     → [class]="computedClasses()" with signal
Single dynamic style property?    → [style.property]="value"
Single style with unit?           → [style.property.unit]="value"
Multiple dynamic styles?          → [style]="stylesObject"
Computed styles?                  → [style]="computedStyles()" with signal
Library that needs CSS vars?      → [style]="{ '--var': value }"
```

**Modern Angular Recommendations:**

- ✅ Use `[class.class-name]="condition"` for single conditional classes
- ✅ Use `[class]="object"` for multiple conditional classes
- ✅ Use `[style.property]="value"` for single dynamic styles
- ✅ Use `[style]="object"` for multiple dynamic styles
- ✅ Use computed signals for complex logic
- ⚠️ NgClass/NgStyle are legacy - only use if absolutely necessary (see below)

---

## Critical Rules

### 1. Never Use var() in class Attribute

```html
<!-- ❌ NEVER: var() in class -->
<div class="bg-[var(--color-primary)]"></div>
<div class="text-[var(--color-text-primary)]"></div>

<!-- ✅ ALWAYS: Use semantic Tailwind classes -->
<div class="bg-primary"></div>
<div class="text-text-primary"></div>
```

**Why?** Tailwind 4 with `@theme` generates utility classes automatically from CSS variables. Using `bg-primary` is cleaner and works with Tailwind's purge/tree-shaking.

### 2. Never Use Hex Colors in Templates

```html
<!-- ❌ NEVER: Hex colors in class -->
<p class="text-[#10B981]"></p>
<div class="bg-[#1E293B]"></div>

<!-- ✅ ALWAYS: Use theme color classes -->
<p class="text-primary"></p>
<div class="bg-secondary"></div>
```

### 3. Use Modern [class] Bindings (Not NgClass)

**Angular 14+ introduced better class binding syntax. NgClass is now considered legacy.**

```html
<!-- ❌ LEGACY: NgClass directive (deprecated pattern) -->
<div [ngClass]="{ 'active': isActive() }"></div>

<!-- ✅ MODERN: Direct class binding -->
<div [class.active]="isActive()"></div>

<!-- ❌ WRONG: className doesn't exist in Angular -->
<div className="base-class"></div>
<div className={cn("base", isActive && "active")}></div>

<!-- ✅ CORRECT: Use class attribute -->
<div class="base-class"></div>
<div [class.active]="isActive()"></div>
```

**When to use NgClass (rare cases only):**

- Space-separated class names in a single object key
- Object mutations where reference stays the same

**For 99% of cases, use modern `[class]` and `[class.xxx]` bindings.**

---

## NgClass vs Modern [class] Binding

**IMPORTANT:** Angular 14+ introduced improved `[class]` binding syntax. NgClass directive is now considered **legacy** and should only be used in rare edge cases.

### Modern Pattern (Recommended)

```html
<!-- ✅ Single conditional class -->
<div [class.active]="isActive()"></div>

<!-- ✅ Multiple conditional classes (object) -->
<div
  [class]="{ 
  'active': isActive(),
  'disabled': isDisabled(),
  'highlighted': isSelected()
}"
></div>

<!-- ✅ Computed classes with signals -->
<div [class]="buttonClasses()"></div>
```

```typescript
// Component
protected buttonClasses = computed(() => ({
  'btn': true,
  'btn-primary': this.variant() === 'primary',
  'btn-disabled': this.isDisabled(),
}));
```

### Legacy Pattern (Avoid)

```html
<!-- ⚠️ LEGACY: NgClass directive (avoid unless necessary) -->
<div [ngClass]="{ 'active': isActive() }"></div>

<!-- ⚠️ LEGACY: Requires importing NgClass -->
import { NgClass } from '@angular/common'; @Component({ imports: [NgClass], // Extra import needed
... })
```

### Why Modern [class] is Better

1. **No imports needed** - Built into Angular template syntax
2. **Better performance** - Direct binding, no directive overhead
3. **Better type safety** - TypeScript can infer types better
4. **Cleaner code** - More readable and concise
5. **Official recommendation** - Angular docs now recommend this approach
6. **Smaller bundles** - No need to import NgClass directive

### When to Use NgClass (Edge Cases Only)

NgClass should **only** be used for these specific cases:

```html
<!-- 1. Space-separated class names in object keys -->
<div [ngClass]="{ 'text-sm font-bold': isCompact() }"></div>

<!-- Modern alternative (preferred): -->
<div [class]="isCompact() ? 'text-sm font-bold' : ''"></div>

<!-- 2. Object mutations (when you modify object instead of replacing) -->
<!-- Note: Modern [class] requires creating new object for changes -->
```

### Migration Guide

```typescript
// ❌ OLD (NgClass)
<div [ngClass]="{ 'active': isActive(), 'disabled': isDisabled() }"></div>

// ✅ NEW (Modern [class])
<div [class]="{ 'active': isActive(), 'disabled': isDisabled() }"></div>

// OR even better:
<div [class.active]="isActive()" [class.disabled]="isDisabled()"></div>

// ❌ OLD (NgClass with computed)
protected classes = computed(() => ({
  'btn': true,
  'btn-primary': this.isPrimary(),
}));
<div [ngClass]="classes()"></div>

// ✅ NEW (Modern [class])
protected classes = computed(() => ({
  'btn': true,
  'btn-primary': this.isPrimary(),
}));
<div [class]="classes()"></div>  // Same template syntax, just remove Ng
```

**Remove NgClass import:**

```typescript
// ❌ OLD
import { NgClass } from '@angular/common';

@Component({
  imports: [NgClass, ...],
})

// ✅ NEW (no import needed)
@Component({
  imports: [...],  // NgClass not needed
})
```

---

## Modern Angular Class Binding Patterns

**Angular 21 recommends using direct `[class]` bindings instead of NgClass directive.**

### Static Classes

```html
<!-- ✅ Simple static classes -->
<div class="flex items-center justify-between gap-4"></div>
<ion-button class="rounded-lg px-4 py-2"></ion-button>
```

### Single Conditional Class

```html
<!-- ✅ Best practice for single conditional class -->
<div [class.active]="isActive()"></div>
<div [class.highlighted]="isSelected()"></div>
<div [class.disabled]="isDisabled()"></div>

<!-- ✅ Combine with static classes -->
<div class="btn btn-primary" [class.btn-loading]="isLoading()"></div>
```

### Multiple Conditional Classes (Object Binding)

```html
<!-- ✅ Modern pattern: bind to class property with object -->
<div
  [class]="{ 
  'bg-primary': status() === 'active',
  'bg-error': status() === 'error',
  'opacity-50': isDisabled(),
  'cursor-not-allowed': isDisabled()
}"
></div>
```

### Multiple Conditional Classes (String Array)

```html
<!-- ✅ Array of class names -->
<div [class]="['base-class', 'another-class']"></div>

<!-- ✅ Dynamic array from component -->
<div [class]="buttonClasses()"></div>
```

```typescript
// Component
protected buttonClasses = computed(() => [
  'btn',
  'btn-' + this.size(),
  this.variant() === 'primary' ? 'btn-primary' : 'btn-secondary'
]);
```

### Multiple Conditional Classes (String)

```html
<!-- ✅ String of space-separated classes -->
<div [class]="'flex items-center gap-2'"></div>

<!-- ✅ Computed string from component -->
<div [class]="statusClasses()"></div>
```

```typescript
// Component
protected statusClasses = computed(() => {
  const base = 'px-2 py-1 rounded-lg text-xs font-semibold';

  switch (this.status()) {
    case 'pending':
      return `${base} bg-warning-light text-warning`;
    case 'confirmed':
      return `${base} bg-success-light text-success`;
    case 'cancelled':
      return `${base} bg-error-light text-error`;
    default:
      return `${base} bg-secondary-light text-secondary`;
  }
});
```

### Complex Conditional Logic with Computed Signals

```typescript
// ✅ Best practice: Use computed signals for complex class logic
protected cardClasses = computed(() => ({
  'rounded-2xl': true,
  'p-4': true,
  'shadow-lg': !this.isFlat(),
  'bg-white': !this.variant(),
  'bg-primary': this.variant() === 'primary',
  'bg-secondary': this.variant() === 'secondary',
  'opacity-75': this.isDisabled(),
  'cursor-not-allowed': this.isDisabled(),
  'border-2': this.highlighted(),
  'border-primary': this.highlighted(),
}));
```

```html
<!-- Template -->
<div [class]="cardClasses()">Content</div>
```

### Combining Static and Dynamic Classes

```html
<!-- ✅ Static classes + individual conditional -->
<div class="btn btn-lg" [class.btn-primary]="isPrimary()">
  <!-- ✅ Static classes + object binding -->
  <div class="btn" [class]="{ 'btn-primary': isPrimary(), 'btn-loading': isLoading() }">
    <!-- ✅ Multiple bindings (later ones override earlier) -->
    <div class="base-class" [class]="dynamicClasses()" [class.override]="shouldOverride()"></div>
  </div>
</div>
```

### Class Binding Precedence

When multiple bindings target the same class:

1. Static `class="..."` is applied first
2. `[class]="..."` binding is applied second
3. `[class.specific]="..."` bindings are applied last (highest precedence)

```html
<!-- ✅ Understanding precedence -->
<div
  class="btn"                           <!-- Applied first -->
  [class]="baseClasses()"              <!-- Applied second -->
  [class.btn-primary]="isPrimary()"    <!-- Highest precedence -->
>
```

---

## Dynamic Values with [style] Binding

When you need truly dynamic values (percentages, pixels from data):

### Single style property

```html
<!-- ✅ Dynamic width -->
<div [style.width.%]="progress"></div>

<!-- ✅ Dynamic opacity -->
<div [style.opacity]="isVisible ? 1 : 0"></div>

<!-- ✅ Dynamic transform -->
<div [style.transform]="'translateX(' + offset + 'px)'"></div>
```

### Multiple style properties

```html
<!-- ✅ Object syntax -->
<div
  [style]="{
  width: percentage + '%',
  height: height + 'px',
  opacity: isVisible ? 1 : 0
}"
></div>
```

### CSS Custom Properties (for complex theming)

```html
<!-- ✅ Setting CSS variables for child components -->
<div [style.--progress-value]="progress + '%'" class="progress-container">
  <div class="w-[var(--progress-value)] h-2 bg-primary"></div>
</div>
```

---

## Tailwind 4 @theme Configuration

**CIA Vial del Llano uses Tailwind 4** with CSS variables in `styles.css`:

```css
/* src/styles.css */
@import 'tailwindcss';

@theme {
  /* Brand colors */
  --color-navy: #1e3a5f; /* Primary navy blue */
  --color-red: #c8102e; /* Accent red */
  --color-orange: #f5a623; /* CTA orange */

  /* Semantic aliases */
  --color-primary: var(--color-navy);
  --color-accent: var(--color-red);
  --color-cta: var(--color-orange);

  /* Neutral */
  --color-background: #f8f9fa;
  --color-surface: #ffffff;
  --color-border: #e2e8f0;
  --color-text-primary: #1a202c;
  --color-text-secondary: #718096;

  /* Status */
  --color-success: #22c55e;
  --color-error: #ef4444;
  --color-warning: #f97316;
}
```

### Available Semantic Classes (from project theme)

**Brand Colors**:

- `bg-primary`, `text-primary`, `border-primary` — Navy blue #1E3A5F
- `bg-accent`, `text-accent`, `border-accent` — Red #C8102E
- `bg-cta`, `text-cta`, `border-cta` — Orange #F5A623

**Backgrounds**:

- `bg-background` — Page background #F8F9FA
- `bg-surface` — Cards/panels (white)

**Borders**:

- `border-border` — Default border #E2E8F0

**Text**:

- `text-text-primary` — Main text #1A202C
- `text-text-secondary` — Secondary text #718096

**Status**:

- `bg-success`, `text-success` — Green #22C55E
- `bg-error`, `text-error` — Red #EF4444
- `bg-warning`, `text-warning` — Orange #F97316

---

## Common Tailwind Patterns for Angular

### Layout

#### Flexbox

```html
<!-- ✅ Horizontal layout -->
<div class="flex items-center justify-between gap-4">
  <span>Label</span>
  <button class="px-4 py-2 bg-cta text-white rounded-lg">Action</button>
</div>

<!-- ✅ Vertical layout -->
<div class="flex flex-col gap-2">
  <input class="border border-border rounded-lg px-3 py-2" />
  <input class="border border-border rounded-lg px-3 py-2" />
</div>

<!-- ✅ Centered content -->
<div class="flex items-center justify-center min-h-screen">
  <div class="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
</div>
```

#### Grid

```html
<!-- ✅ Simple grid -->
<div class="grid grid-cols-2 gap-4">
  <app-card></app-card>
  <app-card></app-card>
</div>

<!-- ✅ Responsive grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  @for (item of items(); track item.id) {
  <app-card [data]="item"></app-card>
  }
</div>
```

### Spacing

```html
<!-- ✅ Padding -->
<div class="p-4">All sides</div>
<div class="px-4 py-2">Horizontal & vertical</div>
<div class="pt-14 px-5 pb-4">Individual sides</div>

<!-- ✅ Margin -->
<div class="m-4">All sides</div>
<div class="mx-auto">Center horizontally</div>
<div class="mt-8 mb-4">Top & bottom</div>

<!-- ✅ Gap (for flex/grid) -->
<div class="flex gap-4">...</div>
<div class="grid gap-6">...</div>
```

### Typography

```html
<!-- ✅ Headings -->
<h1 class="text-2xl font-bold text-text-primary">Title</h1>
<h2 class="text-xl font-semibold text-text-secondary">Subtitle</h2>

<!-- ✅ Body text -->
<p class="text-sm text-text-secondary">Description</p>
<span class="text-xs text-text-muted">Caption</span>

<!-- ✅ Text utilities -->
<p class="uppercase tracking-wide font-medium">Label</p>
<p class="truncate">Long text that will be truncated...</p>
<p class="line-clamp-2">Multi-line text that will be clamped to 2 lines...</p>
```

### Borders & Shadows

```html
<!-- ✅ Borders -->
<div class="border border-border rounded-lg"></div>
<div class="border-t border-b border-border"></div>
<div class="border-l-4 border-l-primary"></div>

<!-- ✅ Rounded corners -->
<div class="rounded-lg"></div>
<div class="rounded-full"></div>
<div class="rounded-2xl"></div>

<!-- ✅ Shadows -->
<div class="shadow-sm"></div>
<div class="shadow-md"></div>
<div class="shadow-lg"></div>
```

### States & Interactions

```html
<!-- ✅ Hover -->
<button class="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors">
  Button
</button>
<div class="hover:shadow-lg transition-shadow">Card</div>

<!-- ✅ Active -->
<button class="active:scale-95 transition-transform">Click me</button>

<!-- ✅ Focus -->
<input class="focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />

<!-- ✅ Disabled -->
<button [disabled]="isDisabled()" class="disabled:opacity-50 disabled:cursor-not-allowed">
  Submit
</button>
```

### Responsive Design

```html
<!-- ✅ Responsive widths -->
<div class="w-full md:w-1/2 lg:w-1/3"></div>

<!-- ✅ Responsive display -->
<div class="hidden md:block">Desktop only</div>
<div class="block md:hidden">Mobile only</div>

<!-- ✅ Responsive text -->
<h1 class="text-xl md:text-2xl lg:text-3xl">Responsive heading</h1>

<!-- ✅ Responsive grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  <!-- Items -->
</div>
```

---

## Advanced Patterns

### Computed Classes with Signals

```typescript
// Component
protected statusClasses = computed(() => {
  const status = this.status();
  const baseClasses = 'px-2 py-1 rounded-lg text-xs font-semibold';

  switch (status) {
    case 'pending':
      return `${baseClasses} bg-warning-light text-warning`;
    case 'confirmed':
      return `${baseClasses} bg-success-light text-success`;
    case 'cancelled':
      return `${baseClasses} bg-error-light text-error`;
    default:
      return `${baseClasses} bg-secondary-light text-secondary`;
  }
});
```

```html
<!-- Template -->
<span [class]="statusClasses()">{{ status() }}</span>
```

### Dynamic Border Colors

```typescript
// Component
protected borderColorClass = computed(() => {
  switch (this.status()) {
    case 'confirmed': return 'border-l-success';
    case 'cancelled': return 'border-l-error';
    case 'pending': return 'border-l-warning';
    default: return 'border-l-primary';
  }
});
```

```html
<!-- Template -->
<div class="border-l-4" [class]="borderColorClass()">
  <!-- Content -->
</div>
```

### Progress Bars

```html
<!-- ✅ Static progress -->
<div class="w-full bg-secondary-100 rounded-full h-2">
  <div class="bg-primary h-2 rounded-full w-[75%]"></div>
</div>

<!-- ✅ Dynamic progress -->
<div class="w-full bg-secondary-100 rounded-full h-2">
  <div
    class="bg-primary h-2 rounded-full transition-all duration-300"
    [style.width.%]="progress()"
  ></div>
</div>
```

### Badges with Dynamic Colors

```typescript
// Component
protected badgeClasses = computed(() => ({
  'px-2 py-0.5 rounded-full text-xs font-medium': true,
  'bg-primary-light text-primary': this.type() === 'primary',
  'bg-success-light text-success': this.type() === 'success',
  'bg-warning-light text-warning': this.type() === 'warning',
}));
```

```html
<!-- Template -->
<span [class]="badgeClasses()">{{ count() }}</span>
```

---

## Arbitrary Values (Use Sparingly)

Tailwind allows arbitrary values for one-off cases:

```html
<!-- ✅ OK: Specific pixel values not in design system -->
<div class="w-[327px] h-[480px]"></div>
<div class="top-[117px] left-[23px]"></div>

<!-- ✅ OK: Custom grid template -->
<div class="grid grid-cols-[1fr_2fr_1fr] gap-4"></div>

<!-- ✅ OK: Specific percentages -->
<div class="w-[75%]"></div>

<!-- ❌ AVOID: Colors should use theme -->
<div class="bg-[#10B981]"></div>
<!-- Use bg-primary instead -->

<!-- ❌ AVOID: Values that should be in theme -->
<div class="text-[#27272a]"></div>
<!-- Use text-text-primary instead -->
```

**When to use arbitrary values**:

- ✅ Specific pixel values from designs
- ✅ One-off percentages
- ✅ Custom grid templates
- ❌ Colors (use theme instead)
- ❌ Common spacing (use Tailwind scale)

---

## Style Organization Best Practices

### 1. Group Classes Logically

```html
<!-- ✅ Good: Grouped by concern -->
<div
  class="
  flex items-center justify-between gap-4
  p-4 rounded-lg border border-border
  bg-white shadow-md
  hover:shadow-lg transition-shadow
"
>
  <!-- Content -->
</div>
```

**Recommended order**:

1. Layout (flex, grid, position)
2. Spacing (p-, m-, gap-)
3. Sizing (w-, h-, min-, max-)
4. Borders & radius
5. Background & colors
6. Typography
7. Effects (shadow, opacity)
8. States (hover, focus, active)
9. Transitions

### 2. Extract Repeated Patterns to Component Classes

If you find yourself repeating the same class combination:

```html
<!-- ❌ Repeated pattern -->
<div class="bg-white rounded-2xl p-4 shadow-md border border-border">...</div>
<div class="bg-white rounded-2xl p-4 shadow-md border border-border">...</div>
<div class="bg-white rounded-2xl p-4 shadow-md border border-border">...</div>
```

**Option A**: Create a reusable component:

```typescript
// card.component.ts
@Component({
  selector: 'app-card',
  template: `
    <div class="bg-white rounded-2xl p-4 shadow-md border border-border">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardComponent {}
```

**Option B**: Use CSS @apply in component styles:

```scss
// component.scss
.custom-card {
  @apply bg-white rounded-2xl p-4 shadow-md border border-border;
}
```

```html
<!-- Template -->
<div class="custom-card">...</div>
```

**Recommendation**: Prefer Option A (component) for better reusability and TypeScript support.

### 3. Use Computed Signals for Complex Class Logic

```typescript
// ✅ Good: Computed signal for complex logic
protected cardClasses = computed(() => {
  const base = 'rounded-2xl p-4 shadow-sm';
  const border = `border-l-4 border-l-${this.borderColor()}`;
  const opacity = this.status() === 'cancelled' ? 'opacity-75' : '';

  return `${base} ${border} ${opacity}`.trim();
});
```

```html
<!-- Template -->
<div [class]="cardClasses()">...</div>
```

---

## Common Mistakes to Avoid

### 1. ❌ Using className instead of class

```html
<!-- ❌ WRONG: React pattern -->
<div className="flex items-center"></div>

<!-- ✅ CORRECT: Angular pattern -->
<div class="flex items-center"></div>
```

### 2. ❌ Using var() in class attribute

```html
<!-- ❌ WRONG: var() in class -->
<div class="bg-[var(--color-primary)]"></div>

<!-- ✅ CORRECT: Semantic class -->
<div class="bg-primary"></div>
```

### 3. ❌ Using hex colors in templates

```html
<!-- ❌ WRONG: Hex color -->
<p class="text-[#10B981]"></p>

<!-- ✅ CORRECT: Theme color -->
<p class="text-primary"></p>
```

### 4. ❌ Overusing [ngClass] for static classes

```html
<!-- ❌ LEGACY: Unnecessary [ngClass] -->
<div [ngClass]="'flex items-center gap-2'"></div>

<!-- ✅ MODERN: Use class for static -->
<div class="flex items-center gap-2"></div>
```

### 5. ❌ Not using computed signals for dynamic classes

```typescript
// ❌ WRONG: Recalculating in template
```

```html
<div
  [class]="status() === 'active' ? 'bg-success' : status() === 'error' ? 'bg-error' : 'bg-secondary'"
></div>
```

```typescript
// ✅ CORRECT: Computed signal
protected statusClass = computed(() => {
  switch (this.status()) {
    case 'active': return 'bg-success';
    case 'error': return 'bg-error';
    default: return 'bg-secondary';
  }
});
```

```html
<div [class]="statusClass()"></div>
```

### 6. ❌ Using NgClass for simple conditional classes

```html
<!-- ❌ LEGACY: Unnecessary NgClass -->
<div [ngClass]="{ 'active': isActive() }"></div>

<!-- ✅ MODERN: Direct class binding -->
<div [class.active]="isActive()"></div>
```

**Use NgClass only for edge cases. Modern Angular prefers `[class]` bindings.**

---

## Working with Custom CSS Variables

Sometimes you need to set custom CSS variables for complex interactions:

```typescript
// Component
protected progressStyle = computed(() => ({
  '--progress-value': `${this.progress()}%`,
  '--progress-color': this.getProgressColor(),
}));
```

```html
<!-- Template -->
<div [style]="progressStyle()" class="progress-container">
  <div class="progress-bar w-[var(--progress-value)] bg-[var(--progress-color)]"></div>
</div>
```

**Note**: This is an escape hatch. Prefer Tailwind utilities when possible.

---

## Chart/Library Integration

When working with chart libraries that don't accept className:

```typescript
// ✅ Constants with var() - ONLY for library props
protected readonly CHART_COLORS = {
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)',
  text: 'var(--color-text-primary)',
  gridLine: 'var(--color-border)',
};

// Usage with Recharts or similar (can't use className)
// <XAxis tick={{ fill: CHART_COLORS.text }} />
// <CartesianGrid stroke={CHART_COLORS.gridLine} />
```

**For Mapbox or other map libraries**:

```typescript
// Style object for Mapbox
protected readonly mapStyle = {
  'fill-color': 'var(--color-primary)',
  'fill-opacity': 0.8,
  'stroke-color': 'var(--color-primary-dark)',
};
```

---

## Checklist for Styling Components

Before committing styled components:

- [ ] No `className` attributes (use `class` instead)
- [ ] No `var()` in class attributes (use semantic classes)
- [ ] No hex colors in templates (use theme classes)
- [ ] Static classes use `class="..."`
- [ ] Conditional classes use `[class]` or `[class.xxx]` bindings (not NgClass)
- [ ] Dynamic values use `[style.property]` or `[style]`
- [ ] Complex class logic uses computed signals
- [ ] Repeated patterns extracted to components
- [ ] Classes organized logically (layout → spacing → colors → states)
- [ ] Responsive breakpoints used appropriately
- [ ] Arbitrary values only used when necessary

---

## Quick Reference

### Decision Matrix

| Scenario                 | Solution                      | Example                               |
| ------------------------ | ----------------------------- | ------------------------------------- |
| Static classes           | `class="..."`                 | `<div class="flex gap-4">`            |
| Single conditional class | `[class.class-name]="cond"`   | `<div [class.active]="isActive()">`   |
| Multiple conditional     | `[class]="classObject"`       | `<div [class]="cardClasses()">`       |
| Computed classes         | `computed(() => ...)`         | `classes = computed(() => ({...}))`   |
| Single dynamic style     | `[style.property]="value"`    | `<div [style.width.%]="progress()">`  |
| Style with unit          | `[style.property.unit]="val"` | `<div [style.height.px]="height()">`  |
| Multiple dynamic styles  | `[style]="styleObject"`       | `<div [style]="containerStyles()">`   |
| CSS variables            | `[style.--var]="value"`       | `<div [style.--color]="color()">`     |
| Theme color              | Semantic class                | `<div class="bg-primary">`            |
| Border color             | `border-{color}`              | `<div class="border-primary">`        |
| Hover state              | `hover:{utility}`             | `<div class="hover:bg-primary-dark">` |

---

## Resources

- [Tailwind CSS 4 Docs](https://tailwindcss.com/docs)
- [Tailwind CSS Variables (@theme)](https://tailwindcss.com/docs/adding-custom-styles#using-css-variables)
- [Angular Class Binding](https://angular.dev/guide/templates/class-binding)
- [Angular Style Binding](https://angular.dev/guide/templates/style-binding)
- [CIA Vial AGENTS.md](../../../AGENTS.md)

---

## Project-Specific Notes

**CIA Vial del Llano Tailwind Setup**:

- ✅ Uses Tailwind CSS 4
- ✅ Configuration in `src/styles.css` with `@theme`
- ✅ Brand colors: navy (`#1E3A5F`), red (`#C8102E`), orange (`#F5A623`)
- ✅ Semantic color aliases (primary, accent, cta, etc.)
- ✅ No Ionic — pure Angular web components only

**Common classes used in the project**:

- Layout: `flex`, `items-center`, `justify-between`, `gap-4`, `grid`, `grid-cols-*`
- Spacing: `px-4`, `py-6`, `px-6`, `py-12`, `gap-8`
- Colors: `bg-white`, `bg-primary`, `text-text-primary`, `text-text-secondary`, `bg-cta`
- Borders: `border`, `border-border`, `border-l-4`, `rounded-lg`, `rounded-2xl`
- Effects: `shadow-sm`, `shadow-md`, `shadow-lg`
- Typography: `text-2xl`, `text-lg`, `text-sm`, `font-bold`, `font-semibold`
- Responsive: `md:grid-cols-2`, `lg:grid-cols-3`, `hidden md:block`

**Follow these patterns** when styling new components to maintain consistency.

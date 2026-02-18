---
name: angular-performance
description: Angular performance optimization, lazy loading, OnPush patterns. Trigger: When optimizing performance or implementing lazy loading.
license: MIT
compatibility: opencode
metadata:
  author: angular-community
  version: "1.0.0"
  scope: [root]
  audience: developers
  framework: angular
  auto_invoke:
    - "Optimizing performance"
    - "Implementing lazy loading"
    - "Working with OnPush change detection"
allowed-tools: Read, Edit, Write, Glob, Grep
---

# Angular Performance - Optimization Patterns

## What I do

I provide patterns for optimizing Angular application performance through lazy loading, OnPush change detection, and other best practices.

## When to use me

Use this skill when:

- Optimizing application performance
- Implementing lazy loading
- Working with OnPush change detection
- Reducing bundle size
- Improving rendering performance

## Critical Patterns

### ALWAYS

- ✅ Use OnPush change detection for all components
- ✅ Lazy load feature modules
- ✅ Use trackBy with \*ngFor / @for
- ✅ Unsubscribe from observables
- ✅ Use pure pipes

### NEVER

- ❌ Use Default change detection strategy
- ❌ Create methods in templates (creates new function every check)
- ❌ Use complex logic in templates
- ❌ Mutate objects/arrays directly with OnPush

## Pattern 1: OnPush Change Detection

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-venue-card',
  changeDetection: ChangeDetectionStrategy.OnPush, // REQUIRED
  // ...
})
export class VenueCardComponent {
  // With OnPush, component only checks when:
  // 1. Input properties change (by reference)
  // 2. Signals change
  // 3. Events fire (click, etc.)
  // 4. Async pipe emits
}
```

## Pattern 2: Lazy Loading Routes

```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: 'player',
    loadChildren: () => import('./features/player/player.routes').then((m) => m.playerRoutes),
  },
  {
    path: 'owner',
    loadChildren: () => import('./features/owner/owner.routes').then((m) => m.ownerRoutes),
  },
];
```

## Pattern 3: TrackBy Function

```typescript
@Component({
  template: `
    @for (venue of venues(); track venue.id) {
      <app-venue-card [venue]="venue" />
    }
  `,
})
export class VenueListComponent {
  protected readonly venues = signal<Venue[]>([]);

  // trackBy prevents unnecessary re-renders
  // Angular uses venue.id to identify which items changed
}
```

## Pattern 4: Image Optimization

```typescript
// Use native image loading attributes
<img
  [src]="venue.image"
  [alt]="venue.name"
  loading="lazy"
  decoding="async"
  width="300"
  height="200"
/>
```

## Pattern 5: Virtual Scrolling (CDK)

```typescript
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  imports: [ScrollingModule],
  template: `
    <cdk-virtual-scroll-viewport itemSize="100" class="viewport">
      @for (venue of venues(); track venue.id) {
        <app-venue-card [venue]="venue" />
      }
    </cdk-virtual-scroll-viewport>
  `
})
```

## Decision Trees

### When to use OnPush?

```
Always → Use OnPush for all components
Exception? → None (use OnPush everywhere)
```

### When to lazy load?

```
Feature module? → Lazy load
Large dependency? → Lazy load
Used on specific route? → Lazy load
Used everywhere? → Don't lazy load (keep in main bundle)
```

## Performance Checklist

- [ ] All components use OnPush
- [ ] Features are lazy loaded
- [ ] @for loops use track
- [ ] Images use lazy loading
- [ ] No subscriptions without cleanup
- [ ] No complex template expressions
- [ ] Pure pipes only

## Related Skills

- **Components**: [angular-component](../angular-component/SKILL.md)
- **State**: [angular-state](../angular-state/SKILL.md)

---

**Skill Version**: 1.0.0
**Last Updated**: January 2026

# CIA Vial del Llano - AI Agent Instructions

> **AI Agent Ruleset for CIA Vial del Llano** - Traffic Education Web Platform
>
> Version: 1.0.0 | Last Updated: February 2026 | License: MIT

This file provides context and guidelines for AI coding agents working on the CIA Vial del Llano project.

---

## Navigation

- **Start here** for cross-project norms and Angular conventions
- Use skills ([`.claude/skills/`](skills/)) for detailed patterns on-demand
- Feature docs override this file when guidance conflicts

### Documentation Hierarchy (Priority Order)

1. **Skills** ([`.claude/skills/`](skills/)) - Most detailed, ALWAYS invoke first when applicable
2. **Main AGENTS.md** (this file) - Project-wide conventions
3. **CLAUDE.md** (root) - Extended documentation for humans

---

## Available Skills

Use these skills for detailed patterns on-demand. Skills provide comprehensive guides for specific tasks and ensure consistency across the codebase.

### Generic Skills (Reusable in Any Angular Project)

#### Framework Skills (Angular 21+)

| Skill | Description | URL |
|-------|-------------|-----|
| `angular-component` | Create standalone components (OnPush, Signals, JSDoc) | [SKILL.md](skills/angular-component/SKILL.md) |
| `angular-feature` | Scaffold feature pages, components, services | [SKILL.md](skills/angular-feature/SKILL.md) |
| `angular-http` | HTTP services, interceptors, API integration patterns | [SKILL.md](skills/angular-http/SKILL.md) |
| `angular-guards` | Route guards, auth protection, navigation guards | [SKILL.md](skills/angular-guards/SKILL.md) |
| `angular-forms` | Reactive forms, validation, form utilities | [SKILL.md](skills/angular-forms/SKILL.md) |
| `angular-state` | Signal-based state management patterns | [SKILL.md](skills/angular-state/SKILL.md) |
| `angular-testing` | Unit tests with Vitest, component tests, service tests | [SKILL.md](skills/angular-testing/SKILL.md) |
| `angular-performance` | Performance optimization, lazy loading, OnPush patterns | [SKILL.md](skills/angular-performance/SKILL.md) |
| `angular-error-handling` | Error handling, logging, monitoring patterns | [SKILL.md](skills/angular-error-handling/SKILL.md) |

#### UI Skills

| Skill | Description | URL |
|-------|-------------|-----|
| `tailwind-4` | Modern [class] bindings, semantic classes, no var()/NgClass | [SKILL.md](skills/tailwind-4/SKILL.md) |
| `template-to-feature` | Convert HTML/Figma/images to Angular features | [SKILL.md](skills/template-to-feature/SKILL.md) |

#### Testing Skills

| Skill | Description | URL |
|-------|-------------|-----|
| `playwright-e2e` | Playwright E2E tests, page objects, best practices | [SKILL.md](skills/playwright-e2e/SKILL.md) |

#### Code Quality Skills

| Skill | Description | URL |
|-------|-------------|-----|
| `typescript` | TypeScript strict mode patterns and best practices | [SKILL.md](skills/typescript/SKILL.md) |

#### Workflow Skills

| Skill | Description | URL |
|-------|-------------|-----|
| `git-commit` | Conventional commits with detailed bodies (Semantic Versioning) | [SKILL.md](skills/git-commit/SKILL.md) |
| `git-pr` | Pull request workflow, review guidelines, best practices | [SKILL.md](skills/git-pr/SKILL.md) |

### CIA Vial del Llano - Project Skills (Business Logic)

| Skill | Description | URL |
|-------|-------------|-----|
| `cia-vial` | Project overview, architecture, module navigation | [SKILL.md](skills/cia-vial/SKILL.md) |
| `cia-vial-api` | Backend API endpoints, models, data flow | [SKILL.md](skills/cia-vial-api/SKILL.md) |

### Meta Skills (Skill Management)

| Skill | Description | URL |
|-------|-------------|-----|
| `skill-creator` | Create new AI agent skills following best practices | [SKILL.md](skills/skill-creator/SKILL.md) |
| `skill-sync` | Sync skill metadata to AGENTS.md auto-invoke sections | [SKILL.md](skills/skill-sync/SKILL.md) |

---

## Auto-invoke Skills

When performing these actions, **ALWAYS invoke the corresponding skill FIRST**:

| Action | Skill |
|--------|-------|
| Creating new component (standard, page, modal) | `angular-component` |
| Creating new feature module from scratch | `angular-feature` |
| Creating HTTP services or API integrations | `angular-http` |
| Working with interceptors or HTTP middleware | `angular-http` |
| Creating or modifying route guards | `angular-guards` |
| Creating reactive forms | `angular-forms` |
| Adding form validation | `angular-forms` |
| Working with form utilities | `angular-forms` |
| Implementing signal-based state | `angular-state` |
| Creating global state services | `angular-state` |
| Writing unit tests (Vitest) | `angular-testing` |
| Writing component tests | `angular-testing` |
| Writing service tests | `angular-testing` |
| Optimizing performance | `angular-performance` |
| Implementing lazy loading | `angular-performance` |
| Implementing error handling | `angular-error-handling` |
| Converting HTML template to Angular | `template-to-feature` |
| Converting Figma design to feature | `template-to-feature` |
| Converting image/screenshot to component/feature | `template-to-feature` |
| Implementing mockup/wireframe as feature | `template-to-feature` |
| Implementing visual design from any source | `template-to-feature` |
| Styling with Tailwind (class bindings) | `tailwind-4` |
| Working with conditional classes | `tailwind-4` |
| Migrating from NgClass to modern [class] | `tailwind-4` |
| Choosing between class/[class]/[style] binding | `tailwind-4` |
| Writing E2E tests with Playwright | `playwright-e2e` |
| Writing TypeScript interfaces/types | `typescript` |
| Committing changes to repository | `git-commit` |
| Creating pull request | `git-pr` |
| Understanding project architecture | `cia-vial` |
| Navigating between project modules | `cia-vial` |
| Working with project API endpoints | `cia-vial-api` |
| Creating new AI agent skills | `skill-creator` |
| Updating auto-invoke tables | `skill-sync` |

---

## Project Overview

**CIA Vial del Llano** is a web application (Angular + SSR) for a traffic education center in Meta, Colombia.

**Business Purpose**: Informational and conversion site for traffic infraction courses offering 25%-50% discounts on fines.

**Tech Stack**: Angular 21 (standalone components, SSR), TypeScript 5.9, Tailwind CSS 4, Vitest
**Architecture**: Page-based modules with lazy loading, OnPush change detection, Signal-based state management

---

## Quick Start

### Setup Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run unit tests
npm test

# Build for production
npm run build

# Run SSR server
npm run serve:ssr:cia-vial-del-llano
```

### Development Workflow

1. **Development**: Use `npm start` and develop in browser at http://localhost:4200
2. **SSR**: Use `npm run build` then `npm run serve:ssr:cia-vial-del-llano`
3. **Hot Reload**: Auto-reloads on file changes

---

## Project Structure

```
cia-vial-del-llano/
├── .claude/                 # AI agent instructions and skills
│   ├── AGENTS.md           # This file - main navigation
│   └── skills/             # Detailed skill guides
│
├── src/app/
│   ├── core/                # Core application logic
│   │   ├── data/            # Static data (infractions, testimonials, FAQs)
│   │   ├── models/          # Domain models (Infraction, Testimonial, etc.)
│   │   └── services/        # Core services (WhatsApp, SEO, Infractions)
│   │
│   ├── pages/               # Page components (lazy-loaded)
│   │   ├── home/            # Landing page with sections
│   │   ├── cursos/          # Courses information
│   │   ├── calculadora/     # Fine discount calculator
│   │   ├── consultar-multas/# Fine lookup tool
│   │   ├── ubicacion/       # Location/map page
│   │   ├── preguntas-frecuentes/ # FAQ page
│   │   ├── nosotros/        # About page
│   │   └── contacto/        # Contact page
│   │
│   └── shared/              # Shared components, pipes, utilities
│       ├── components/      # Reusable UI (header, footer, whatsapp-button, etc.)
│       └── pipes/           # Custom pipes (currency-cop, etc.)
│
├── public/                  # Static assets
│
└── src/environments/        # Environment configurations
```

### Path Aliases

Check `tsconfig.json` for configured path aliases.

---

## Critical Patterns - NON-NEGOTIABLE

### ALWAYS

- ✅ Use standalone components (default in Angular 21+, do NOT set `standalone: true` explicitly)
- ✅ Use OnPush change detection (`changeDetection: ChangeDetectionStrategy.OnPush`)
- ✅ Use Angular Signals for state (`signal()`, `computed()`, `effect()`)
- ✅ Use `inject()` for dependency injection
- ✅ Use modern template syntax (`@if`, `@for`, `@else`)
- ✅ Write JSDoc documentation in English
- ✅ Use `NgOptimizedImage` for static images (not for base64)
- ✅ Use conventional commits format
- ✅ Ensure WCAG AA accessibility (AXE checks, focus management, ARIA)

### NEVER

- ❌ Set `standalone: true` in `@Component` decorator (it's implicit in Angular 21+)
- ❌ Use NgModules (deprecated in Angular standalone)
- ❌ Use `@Input/@Output` decorators (use `input()/output()` signals)
- ❌ Use `*ngIf/*ngFor` (use `@if/@for` control flow)
- ❌ Use BehaviorSubject for new code (use signals)
- ❌ Use `var()` in Tailwind className
- ❌ Use `[ngClass]` directive (use `[class]` bindings)
- ❌ Use `[ngStyle]` directive (use `[style]` bindings)
- ❌ Use `@HostBinding` or `@HostListener` decorators (use `host` object instead)
- ❌ Write arrow functions in templates
- ❌ Assume globals like `new Date()` are available in templates
- ❌ Commit secrets/tokens in code

---

## Code Style Guidelines

### TypeScript & Angular

- **Strict mode**: Enabled with all strict flags
- **Component architecture**: Standalone components only
- **Change detection**: Use `OnPush` strategy for all components
- **State management**: Use Angular Signals for reactive state
- **Dependency injection**: Use `inject()` function
- **Naming conventions**:
  - Components: `*.component.ts` with `Component` suffix
  - Pages: `*.component.ts` with `Component` suffix (also acceptable: `*.page.ts`)
  - Services: `*.service.ts`

### Code Formatting

- **Indentation**: 2 spaces
- **Quotes**: Single quotes for TypeScript
- **Line endings**: LF (Unix-style)
- **Charset**: UTF-8
- **Max line length**: 100 characters (see `.prettierrc` / `prettier` in `package.json`)

### Component Selector Naming

```typescript
// ✅ Correct
@Component({
  selector: 'app-hero-section',
})

// ❌ Wrong
@Component({
  selector: 'hero-section', // Missing 'app-' prefix
})
```

### Import Organization

Group imports in this order:

1. Angular core imports
2. Third-party libraries
3. Local imports

```typescript
// ✅ Example
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WhatsappService } from '../../core/services/whatsapp.service';
import { DiscountCardComponent } from '../../shared/components/discount-card/discount-card.component';
```

---

## Documentation Standards

### Language

- **Code comments/JSDoc**: ALWAYS in English
- **UI labels/content**: Spanish (user-facing)
- **Commit messages**: English

---

## Testing Instructions

### Running Tests

```bash
# Run all unit tests
npm test

# Build for production (integration check)
npm run build
```

### Testing Requirements

1. **Unit Tests** (Vitest):
   - Test all services, components, and utilities
   - Test files: `*.spec.ts` colocated with source files

2. **E2E Tests** (Playwright):
   - Critical user flows: landing → calculator → WhatsApp contact

See [`angular-testing` skill](skills/angular-testing/SKILL.md) for detailed patterns.

### Before Committing

**ALWAYS run before committing**:

```bash
npm run build
```

---

## Git Workflow & Commit Guidelines

### Commit Message Convention

Use **Conventional Commits** format - see [`git-commit` skill](skills/git-commit/SKILL.md) for details.

```
<type>(<scope>): <subject>
```

**Types**: `feat`, `fix`, `refactor`, `style`, `docs`, `test`, `chore`, `perf`

**Examples**:

```
feat(calculadora): add fine discount calculator
fix(header): fix mobile navigation overflow
refactor(whatsapp): extract message templates to constants
```

### Branch Naming

```
<type>/<short-description>
```

Examples: `feat/calculadora`, `fix/header-mobile`, `refactor/whatsapp-service`

---

## Security Considerations

- ⚠️ Never commit API keys or WhatsApp tokens in code
- ⚠️ Use environment variables for production secrets
- **Environment Files**:
  - `src/environments/environment.ts` (development)
  - `src/environments/environment.prod.ts` (production)

---

## Common Development Tasks

### Creating a New Page

Use [`angular-feature` skill](skills/angular-feature/SKILL.md) for step-by-step guide.

### Creating a New Component

Use [`angular-component` skill](skills/angular-component/SKILL.md) for patterns.

### Creating a New Service

Use [`angular-http` skill](skills/angular-http/SKILL.md) for HTTP services or [`angular-feature` skill](skills/angular-feature/SKILL.md) for general services.

---

## Additional Resources

- **Angular Docs**: https://angular.dev
- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **Vitest Docs**: https://vitest.dev

---

**Version**: 1.0.0
**Last Updated**: February 2026
**Maintained by**: CIA Vial del Llano Development Team
**License**: MIT

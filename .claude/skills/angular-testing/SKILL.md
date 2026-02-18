---
name: angular-testing
description: Angular unit tests with Vitest, component tests, service tests. Trigger: When writing unit tests, component tests, or service tests.
license: MIT
compatibility: opencode
metadata:
  author: angular-community
  version: "2.0.0"
  scope: [root]
  audience: developers
  framework: angular
  auto_invoke:
    - "Writing unit tests (Vitest)"
    - "Writing component tests"
    - "Writing service tests"
    - "Testing Angular code"
allowed-tools: Read, Edit, Write, Glob, Grep
---

# Angular Testing - Unit & Component Tests

## What I do

I provide patterns for writing unit tests in Angular 21+ using **Vitest** (not Jasmine/Karma), covering components, services, pipes, and more.

## When to use me

Use this skill when:

- Writing unit tests for components
- Writing unit tests for services
- Testing reactive forms and validation
- Mocking dependencies
- Testing computed signals

## Critical Patterns

### ALWAYS

- ✅ Use `TestBed` for Angular testing
- ✅ Use `vi.fn()` and `vi.spyOn()` for mocks (Vitest, not Jasmine)
- ✅ Test public API, not implementation details
- ✅ Use `fixture.detectChanges()` to trigger change detection
- ✅ Use `afterEach` for cleanup

### NEVER

- ❌ Use `jasmine.createSpyObj()` — use `vi.fn()` instead
- ❌ Test private methods directly
- ❌ Use real HTTP calls in unit tests
- ❌ Skip cleanup (subscriptions, timers)

## Vitest Setup

The project uses Vitest configured in `vitest.config.ts` (or `angular.json` via `@analogjs/vitest-angular`).
Test files are colocated with source: `*.spec.ts`.

Run tests with:

```bash
npm test
```

---

## Pattern 1: Service Test (Static Data)

```typescript
// src/app/core/services/infracciones.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { InfraccionesService } from './infracciones.service';

describe('InfraccionesService', () => {
  let service: InfraccionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InfraccionesService],
    });
    service = TestBed.inject(InfraccionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all infracciones', () => {
    const infracciones = service.getAll();
    expect(infracciones.length).toBeGreaterThan(0);
  });

  it('should filter by gravedad', () => {
    const leves = service.getByGravedad('leve');
    expect(leves.every((i) => i.gravedad === 'leve')).toBe(true);
  });

  it('should calculate 50% discount for leve infraction', () => {
    const leve = service.getAll().find((i) => i.gravedad === 'leve')!;
    const descuento = service.calcularDescuento(leve);
    expect(descuento).toBe(leve.valorSMLMV * 0.5);
  });
});
```

## Pattern 2: Service Test (with mocked dependencies)

```typescript
// src/app/core/services/whatsapp.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { WhatsappService } from './whatsapp.service';
import { PLATFORM_ID } from '@angular/core';

describe('WhatsappService', () => {
  let service: WhatsappService;
  let windowOpenSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WhatsappService, { provide: PLATFORM_ID, useValue: 'browser' }],
    });
    service = TestBed.inject(WhatsappService);
    windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open WhatsApp with encoded message', () => {
    service.openChat('Hola mundo');
    expect(windowOpenSpy).toHaveBeenCalledWith(
      expect.stringContaining('wa.me'),
      '_blank',
      'noopener,noreferrer',
    );
  });

  it('should include infraction code in course inquiry message', () => {
    service.openCourseInquiry('C01');
    expect(windowOpenSpy).toHaveBeenCalledWith(
      expect.stringContaining('C01'),
      '_blank',
      expect.any(String),
    );
  });
});
```

## Pattern 3: Component Test (Standalone)

```typescript
// src/app/shared/components/discount-card/discount-card.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { DiscountCardComponent } from './discount-card.component';

describe('DiscountCardComponent', () => {
  let component: DiscountCardComponent;
  let fixture: ComponentFixture<DiscountCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscountCardComponent], // standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(DiscountCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display infraction value', () => {
    fixture.componentRef.setInput('valorSMLMV', 15);
    fixture.detectChanges();

    const el = fixture.nativeElement.querySelector('[data-testid="valor"]');
    expect(el?.textContent).toContain('15');
  });

  it('should emit ctaClick when button is clicked', () => {
    const emitSpy = vi.spyOn(component.ctaClick, 'emit');

    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(emitSpy).toHaveBeenCalled();
  });
});
```

## Pattern 4: Component with Service Dependencies

```typescript
// src/app/pages/calculadora/calculadora.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CalculadoraComponent } from './calculadora.component';
import { InfraccionesService } from '../../core/services/infracciones.service';
import { WhatsappService } from '../../core/services/whatsapp.service';

describe('CalculadoraComponent', () => {
  let component: CalculadoraComponent;
  let fixture: ComponentFixture<CalculadoraComponent>;

  const mockInfraccionesService = {
    getAll: vi
      .fn()
      .mockReturnValue([{ codigo: 'C01', descripcion: 'Test', gravedad: 'leve', valorSMLMV: 8 }]),
    calcularDescuento: vi.fn().mockReturnValue(4),
  };

  const mockWhatsappService = {
    openCourseInquiry: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculadoraComponent],
      providers: [
        { provide: InfraccionesService, useValue: mockInfraccionesService },
        { provide: WhatsappService, useValue: mockWhatsappService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load infracciones on init', () => {
    expect(mockInfraccionesService.getAll).toHaveBeenCalled();
  });

  it('should update selection signal on infraction select', () => {
    component['selectInfraccion']('C01');
    expect(component['selectedInfraccion']()).toBe('C01');
  });
});
```

## Pattern 5: Testing Signals

```typescript
// Testing component with signals
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';

describe('SomeComponent', () => {
  let component: SomeComponent;
  let fixture: ComponentFixture<SomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SomeComponent);
    component = fixture.componentInstance;
  });

  it('should update computed signal when input changes', () => {
    fixture.componentRef.setInput('value', 100);
    fixture.detectChanges();

    expect(component['displayValue']()).toBe('$100');
  });

  it('should react to signal updates', () => {
    component['isOpen'].set(true);
    fixture.detectChanges();

    const panel = fixture.nativeElement.querySelector('.panel');
    expect(panel).not.toBeNull();
  });
});
```

## Pattern 6: Testing Pipes

```typescript
// src/app/shared/pipes/currency-cop/currency-cop.pipe.spec.ts
import { describe, it, expect } from 'vitest';
import { CurrencyCopPipe } from './currency-cop.pipe';

describe('CurrencyCopPipe', () => {
  let pipe: CurrencyCopPipe;

  beforeEach(() => {
    pipe = new CurrencyCopPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format number as Colombian peso', () => {
    expect(pipe.transform(1000000)).toContain('1.000.000');
  });

  it('should return empty string for null', () => {
    expect(pipe.transform(null)).toBe('');
  });
});
```

## Decision Trees

### What to test?

```
Component?
├─ Public inputs → Test with fixture.componentRef.setInput()
├─ Public methods → Call and assert
├─ Computed signals → Assert computed values via signal getter
├─ Event emitters → vi.spyOn(component.output, 'emit')
└─ Template rendering → Query DOM and assert

Service (static data)?
├─ Public methods → Call and assert return values
├─ Filtering logic → Test each filter case
├─ Calculation logic → Test edge cases and rounding
└─ Error handling → Test null/undefined inputs

Service (with side effects)?
├─ window.open calls → vi.spyOn(window, 'open')
├─ localStorage → vi.spyOn(localStorage, 'setItem')
└─ SSR guard → Provide PLATFORM_ID as 'server' or 'browser'
```

### Mock strategy

```
Dependency type?
├─ Static data service → Mock return values with vi.fn()
├─ WhatsApp service → Mock openChat/openCourseInquiry with vi.fn()
├─ Browser API (window) → vi.spyOn(window, 'method')
├─ Angular service (Title/Meta) → Provide real or mock
└─ PLATFORM_ID → { provide: PLATFORM_ID, useValue: 'browser' }
```

## Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- --testPathPattern="calculadora"
```

## Related Skills

- **Components**: [angular-component](../angular-component/SKILL.md)
- **Services**: [angular-http](../angular-http/SKILL.md)
- **E2E Testing**: [playwright-e2e](../playwright-e2e/SKILL.md)

---

**Skill Version**: 2.0.0
**Last Updated**: February 2026

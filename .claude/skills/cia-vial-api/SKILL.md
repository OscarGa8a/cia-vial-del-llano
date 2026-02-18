---
name: cia-vial-api
description: CIA Vial del Llano data models, static data, and core services. Trigger: When working with project data models, services, or business logic.
license: MIT
compatibility: opencode
metadata:
  author: cia-vial-team
  version: "1.0.0"
  scope: [root]
  audience: developers
  project: cia-vial-del-llano
  auto_invoke:
    - "Working with project data models"
    - "Implementing WhatsApp integration"
    - "Working with infraction data"
allowed-tools: Read, Edit, Write, Glob, Grep
---

# CIA Vial del Llano - Data Models & Services

## What I do

I provide information about CIA Vial del Llano data structures, static data, and core services.

## When to use me

Use this skill when:

- Working with data models (Infraccion, Testimonio, etc.)
- Implementing WhatsApp integration
- Working with the infractions database
- Understanding SEO service patterns
- Creating new services

## Data Architecture

The project is **primarily static** - there is no backend API. Data is stored in TypeScript files under `src/app/core/data/`:

```
core/
├── data/
│   ├── infracciones.data.ts   # ~200 traffic infractions with codes and values
│   ├── testimonios.data.ts    # Client testimonials
│   ├── faqs.data.ts           # FAQ items
│   └── config.ts              # App configuration (phone, address, schedule)
├── models/
│   ├── infraccion.model.ts
│   └── testimonio.model.ts
└── services/
    ├── whatsapp.service.ts
    ├── infracciones.service.ts
    └── seo.service.ts
```

## Core Models

### Infraccion

```typescript
// core/models/infraccion.model.ts
export interface Infraccion {
  codigo: string; // e.g., "C02"
  descripcion: string; // Full description of the infraction
  valor: number; // Fine value in COP
  categoria: InfraccionCategoria;
  gravedad: InfraccionGravedad;
}

export type InfraccionCategoria =
  | 'TRANSITO'
  | 'EMBRIAGUEZ'
  | 'VELOCIDAD'
  | 'DOCUMENTOS'
  | 'VEHICULO'
  | 'PEATONES'
  | 'OTROS';

export type InfraccionGravedad = 'LEVE' | 'GRAVE' | 'GRAVISIMA';
```

### Testimonio

```typescript
// core/models/testimonio.model.ts
export interface Testimonio {
  nombre: string;
  ciudad: string;
  texto: string;
  calificacion: 1 | 2 | 3 | 4 | 5;
  comparendo?: string; // Optional - type of infraction
}
```

### AppConfig

```typescript
// core/data/config.ts
export const AppConfig = {
  company: {
    name: 'CIA Vial del Llano',
    phone: '+573XXXXXXXXX', // WhatsApp number
    address: 'Meta, Colombia',
    schedule: 'Lunes a Viernes 8am - 5pm',
  },
  discounts: {
    early: 50, // 50% discount (within 5 days)
    standard: 25, // 25% discount (within 90 days)
    earlyDays: 5,
    standardDays: 90,
  },
} as const;
```

## Core Services

### WhatsApp Service

Primary conversion mechanism for the site:

```typescript
// core/services/whatsapp.service.ts
import { Injectable } from '@angular/core';
import { AppConfig } from '../data/config';

@Injectable({ providedIn: 'root' })
export class WhatsappService {
  /**
   * Opens WhatsApp with a pre-filled message
   */
  openChat(message?: string): void {
    const phone = AppConfig.company.phone.replace('+', '');
    const encodedMessage = message ? encodeURIComponent(message) : '';
    const url = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(url, '_blank');
  }

  /**
   * Opens WhatsApp with infraction-specific message
   */
  openChatForInfraction(infraccion: Infraccion): void {
    const message = `Hola, tengo un comparendo código ${infraccion.codigo} y quiero información sobre el descuento`;
    this.openChat(message);
  }

  /**
   * Opens WhatsApp for general course inquiry
   */
  openChatForCourse(): void {
    this.openChat('Hola, quiero información sobre los cursos para descuento en comparendos');
  }
}
```

**IMPORTANT**: `window.open` is browser-only. Inject `PLATFORM_ID` and check `isPlatformBrowser()` before calling.

### Infracciones Service

Search and filter static infraction data:

```typescript
// core/services/infracciones.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { INFRACCIONES_DATA } from '../data/infracciones.data';

@Injectable({ providedIn: 'root' })
export class InfraccionesService {
  private readonly _query = signal('');
  private readonly _categoria = signal<InfraccionCategoria | null>(null);

  readonly query = this._query.asReadonly();

  readonly results = computed(() => {
    const q = this._query().toLowerCase();
    const cat = this._categoria();

    return INFRACCIONES_DATA.filter((i) => {
      const matchesQuery =
        !q || i.codigo.toLowerCase().includes(q) || i.descripcion.toLowerCase().includes(q);
      const matchesCategory = !cat || i.categoria === cat;
      return matchesQuery && matchesCategory;
    });
  });

  setQuery(query: string): void {
    this._query.set(query);
  }

  setCategoria(categoria: InfraccionCategoria | null): void {
    this._categoria.set(categoria);
  }

  getByCode(codigo: string): Infraccion | undefined {
    return INFRACCIONES_DATA.find((i) => i.codigo === codigo);
  }
}
```

### SEO Service

Manage meta tags for SSR pages:

```typescript
// core/services/seo.service.ts
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private meta = inject(Meta);
  private title = inject(Title);

  setPage(config: { title: string; description: string; keywords?: string }): void {
    this.title.setTitle(`${config.title} | CIA Vial del Llano`);
    this.meta.updateTag({ name: 'description', content: config.description });
    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }
  }
}
```

## Discount Calculation Logic

Core business logic for the calculator:

```typescript
/**
 * Calculate discount amount based on days since infraction
 *
 * @param valorComparendo - Original fine value in COP
 * @param diasTranscurridos - Days since infraction was issued
 * @returns Discount result with amount to pay
 */
export function calcularDescuento(
  valorComparendo: number,
  diasTranscurridos: number,
): DescuentoResult {
  if (diasTranscurridos <= 5) {
    const descuento = valorComparendo * 0.5;
    return {
      porcentaje: 50,
      descuento,
      totalAPagar: valorComparendo - descuento,
      aplica: true,
    };
  } else if (diasTranscurridos <= 90) {
    const descuento = valorComparendo * 0.25;
    return {
      porcentaje: 25,
      descuento,
      totalAPagar: valorComparendo - descuento,
      aplica: true,
    };
  } else {
    return {
      porcentaje: 0,
      descuento: 0,
      totalAPagar: valorComparendo,
      aplica: false,
    };
  }
}

export interface DescuentoResult {
  porcentaje: 0 | 25 | 50;
  descuento: number;
  totalAPagar: number;
  aplica: boolean;
}
```

## Data Files Pattern

Static data files export typed arrays:

```typescript
// core/data/infracciones.data.ts
import { Infraccion } from '../models/infraccion.model';

export const INFRACCIONES_DATA: ReadonlyArray<Infraccion> = [
  {
    codigo: 'C02',
    descripcion: 'Conducir sin portar licencia de conducción',
    valor: 439000,
    categoria: 'DOCUMENTOS',
    gravedad: 'LEVE',
  },
  // ... more items
] as const;
```

```typescript
// core/data/faqs.data.ts
export interface Faq {
  pregunta: string;
  respuesta: string;
  categoria?: string;
}

export const FAQS_DATA: ReadonlyArray<Faq> = [
  {
    pregunta: '¿Cuánto tiempo tengo para tomar el curso?',
    respuesta: 'Para el 50% de descuento tienes 5 días hábiles...',
  },
  // ... more items
];
```

## Related Skills

- **Project Overview**: [cia-vial](../cia-vial/SKILL.md)
- **HTTP**: [angular-http](../angular-http/SKILL.md)
- **State**: [angular-state](../angular-state/SKILL.md)

---

**Skill Version**: 1.0.0
**Last Updated**: February 2026

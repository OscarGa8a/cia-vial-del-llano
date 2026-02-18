# Guía de Documentación JSDoc/TSDoc

Esta guía define tres niveles de documentación para componentes, servicios, interfaces y funciones del proyecto.

## Niveles de Documentación

### Nivel Básico (Basic)

Documentación mínima requerida para todo código público. Se enfoca en descripciones concisas de una línea.

**Qué documentar:**

- Descripción breve del componente/clase/función (una línea)
- Parámetros de funciones con descripción corta
- Inputs/outputs de componentes (descripción simple)
- Propiedades públicas importantes

**Qué omitir:**

- Ejemplos de uso
- Detalles de implementación
- Casos edge/especiales
- Dependencias internas

**Ejemplo Componente:**

```typescript
/**
 * Muestra una tarjeta de producto con imagen, precio y acciones.
 */
@Component({
  selector: "app-product-card",
  imports: [Icon, Button],
  templateUrl: "./product-card.html",
  styleUrl: "./product-card.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCard {
  /** Producto a mostrar en la tarjeta. */
  product = input.required<Product>();

  /** Emite cuando el usuario hace clic en el producto. */
  productClick = output<Product>();

  /** Si true, muestra el badge "Nuevo". */
  showNewBadge = computed(() => this.product().new);
}
```

**Ejemplo Servicio:**

```typescript
/**
 * Gestiona la detección de breakpoints responsive.
 */
@Injectable({
  providedIn: "root",
})
export class Breakpoint {
  /** Breakpoint actual activo. */
  readonly currentBreakpoint = toSignal(/* ... */);

  /** True si viewport es móvil (xs o sm). */
  readonly isMobile = computed(() => ["xs", "sm"].includes(this.currentBreakpoint()));
}
```

**Ejemplo Función:**

```typescript
/**
 * Formatea un número como precio en COP.
 */
function formatPrice(amount: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(amount);
}
```

---

### Nivel Medio (Medium)

Documentación completa para APIs públicas y componentes reutilizables. Incluye ejemplos básicos **solo para componentes, servicios y guards**.

**Qué documentar:**

- Todo lo del nivel básico
- Ejemplos de uso simple para componentes, servicios y guards (un caso común)
- Comportamientos importantes
- Parámetros opcionales y valores por defecto
- Tipos de retorno (cuando no sea obvio)
- Señales computed y su lógica
- Documentar parámetros en funciones con @param
- Documentar las inyecciones (`inject`) y los servicios inyectados (describe propósito breve)

**Qué omitir:**

- Múltiples ejemplos
- Detalles de arquitectura interna
- Casos edge muy específicos
- Historia/razones de implementación
- Ejemplos en funciones e interfaces (reservados para nivel avanzado, excepto guards)

**Ejemplo Componente:**

````typescript
/**
 * Botón reutilizable con variantes de estilo y tamaños configurables.
 *
 * @example
 * ```typescript
 * <app-button variant="primary" size="lg" (click)="handleClick()">
 *   Click me
 * </app-button>
 * ```
 */
@Component({
  selector: "app-button",
  imports: [],
  templateUrl: "./button.html",
  styleUrl: "./button.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  /** Variante visual del botón. */
  variant = input<"primary" | "secondary" | "primaryOutline">("primary");

  /** Tamaño del botón. */
  size = input<"sm" | "md" | "lg">("md");

  /** Clases CSS adicionales para personalización. */
  classes = input<string>("");

  /** Si true, deshabilita el botón. */
  disabled = input<boolean>(false);

  /** Clases CSS finales aplicadas al botón. */
  protected readonly buttonClasses = computed(() => {
    const base = "btn";
    const variant = `btn-${this.variant()}`;
    const size = `btn-${this.size()}`;
    return `${base} ${variant} ${size} ${this.classes()}`;
  });
}
````

**Ejemplo Servicio:**

````typescript
/**
 * Gestiona la detección de breakpoints responsive basados en Tailwind.
 *
 * @example
 * ```typescript
 * export class MyComponent {
 *   private readonly breakpoint = inject(Breakpoint);
 *
 *   readonly isMobileView = computed(() => this.breakpoint.isMobile());
 * }
 * ```
 */
@Injectable({
  providedIn: "root",
})
export class Breakpoint {
  /** Breakpoint actual activo (xs, sm, md, lg, xl, 2xl). */
  readonly currentBreakpoint = toSignal(/* ... */);

  /** True si viewport es móvil (xs o sm). */
  readonly isMobile = computed(() => ["xs", "sm"].includes(this.currentBreakpoint()));

  /** True si viewport es tablet (md). */
  readonly isTablet = computed(() => this.currentBreakpoint() === "md");

  /** True si viewport es desktop (lg, xl, 2xl). */
  readonly isDesktop = computed(() => ["lg", "xl", "2xl"].includes(this.currentBreakpoint()));
}
````

**Ejemplo Función:**

```typescript
/**
 * Formatea un número como precio en pesos colombianos.
 *
 * @param amount - Cantidad numérica a formatear
 * @returns String formateado como precio (ej: "$180.000")
 */
function formatPrice(amount: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(amount);
}
```

**Ejemplo Interface:**

```typescript
/**
 * Representa un producto en el catálogo.
 */
export interface Product {
  /** Identificador único del producto. */
  id: string;
  /** Nombre del producto. */
  name: string;
  /** Slug URL-friendly del producto. */
  slug: string;
  /** Precio base del producto. */
  price: number;
  /** Código de moneda ISO 4217. */
  currency: string;
  /** URL de la imagen principal del producto. */
  imageUrl: string;
  /** Si true, el producto está en stock. */
  inStock: boolean;
  /** Si true, el producto es de la nueva colección. */
  new?: boolean;
  /** Tallas disponibles del producto. */
  sizes: ProductSize[];
}
```

---

### Nivel Avanzado (Advanced)

Documentación exhaustiva para componentes complejos, servicios core y APIs críticas.

**Qué documentar:**

- Todo lo del nivel medio
- Múltiples ejemplos de uso (casos comunes y avanzados)
- Detalles de comportamiento y efectos secundarios
- Relaciones con otros componentes/servicios
- Consideraciones de rendimiento
- Casos edge y limitaciones conocidas
- Tags especiales: `@see`, `@throws`, `@deprecated`, `@internal`
- Lifecycle hooks y su propósito
- Efectos y side effects

**Incluir TODO:**

**Ejemplo Componente Complejo:**

````typescript
/**
 * Carousel de imágenes responsive con navegación y paginación.
 *
 * Implementa un carousel usando Swiper con soporte responsive automático,
 * navegación por flechas y dots de paginación. Se adapta al número de
 * slides visibles según el breakpoint activo.
 *
 * @example
 * Uso básico con imágenes:
 * ```typescript
 * <app-image-carousel [images]="productImages" />
 * ```
 *
 * @example
 * Con configuración personalizada:
 * ```typescript
 * <app-image-carousel
 *   [images]="images"
 *   [showNavigation]="true"
 *   [showPagination]="false"
 *   [loop]="true" />
 * ```
 *
 * @see ProductCarousel para carousel de productos
 * @see https://swiperjs.com/element para documentación de Swiper Element
 */
@Component({
  selector: "app-image-carousel",
  imports: [Icon],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: "./image-carousel.html",
  styleUrl: "./image-carousel.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCarousel {
  /** URLs de las imágenes a mostrar en el carousel. */
  images = input.required<string[]>();

  /** Si true, muestra flechas de navegación. */
  showNavigation = input<boolean>(true);

  /** Si true, muestra dots de paginación. */
  showPagination = input<boolean>(true);

  /** Si true, habilita loop infinito del carousel. */
  loop = input<boolean>(false);

  /** ViewChild reference al elemento Swiper para control programático. */
  private readonly swiperRef = viewChild<ElementRef<SwiperContainer>>("swiperRef");

  /** Icono chevron izquierdo para navegación. */
  protected readonly ChevronLeftIcon = ChevronLeftIcon;

  /** Icono chevron derecho para navegación. */
  protected readonly ChevronRightIcon = ChevronRightIcon;

  constructor() {
    /**
     * Inicializa Swiper cuando el componente se monta y las imágenes cambian.
     * Usa effect() para reaccionar a cambios en swiperRef e images signals.
     */
    effect(() => {
      const swiperEl = this.swiperRef()?.nativeElement;
      const images = this.images();

      if (!swiperEl || images.length === 0) return;

      this.initializeSwiper(swiperEl);
    });
  }

  /**
   * Inicializa la instancia de Swiper con configuración responsive.
   *
   * Configura breakpoints adaptados a Tailwind para mostrar diferente
   * número de slides según el viewport. En móvil muestra 1 imagen,
   * mientras que en desktop puede mostrar múltiples.
   *
   * @param swiperEl - Elemento DOM del contenedor Swiper
   *
   * @internal
   */
  private initializeSwiper(swiperEl: SwiperContainer): void {
    const swiperParams = {
      slidesPerView: 1,
      loop: this.loop(),
      spaceBetween: 10,
      navigation: this.showNavigation(),
      pagination: this.showPagination()
        ? {
            clickable: true,
            dynamicBullets: true,
          }
        : false,
      breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 24 },
      },
    };

    Object.assign(swiperEl, swiperParams);
    swiperEl.initialize();
  }

  /**
   * Navega al slide anterior del carousel.
   *
   * @throws Error si Swiper no está inicializado
   */
  protected previousSlide(): void {
    const swiper = this.swiperRef()?.nativeElement.swiper;
    if (!swiper) throw new Error("Swiper not initialized");
    swiper.slidePrev();
  }

  /**
   * Navega al siguiente slide del carousel.
   *
   * @throws Error si Swiper no está inicializado
   */
  protected nextSlide(): void {
    const swiper = this.swiperRef()?.nativeElement.swiper;
    if (!swiper) throw new Error("Swiper not initialized");
    swiper.slideNext();
  }
}
````

**Ejemplo Servicio Core:**

````typescript
/**
 * Servicio para detección y observación de breakpoints responsive.
 *
 * Proporciona signals reactivos que permiten a los componentes adaptar
 * su comportamiento según el tamaño del viewport. Los breakpoints están
 * alineados con Tailwind CSS para consistencia en toda la aplicación.
 *
 * El servicio es singleton (providedIn: 'root') y mantiene una única
 * suscripción al BreakpointObserver de Angular CDK, optimizando
 * el rendimiento.
 *
 * @example
 * Uso en componente para layout condicional:
 * ```typescript
 * export class MyComponent {
 *   private readonly breakpoint = inject(Breakpoint);
 *
 *   readonly showMobileMenu = computed(() => this.breakpoint.isMobile());
 *   readonly columns = computed(() =>
 *     this.breakpoint.isDesktop() ? 4 : 2
 *   );
 * }
 * ```
 *
 * @example
 * Uso en templates con signals:
 * ```html
 * @if (breakpoint.isMobile()) {
 *   <app-mobile-nav />
 * } @else {
 *   <app-desktop-nav />
 * }
 * ```
 *
 * @see BreakpointObserver de @angular/cdk/layout
 */
@Injectable({
  providedIn: "root",
})
export class Breakpoint {
  private readonly breakpointObserver = inject(BreakpointObserver);

  /**
   * Breakpoints personalizados que coinciden con Tailwind CSS.
   *
   * Definidos como media queries CSS para máxima compatibilidad
   * con el sistema de diseño de Tailwind.
   */
  private readonly tailwindBreakpoints = {
    xs: "(max-width: 639px)",
    sm: "(min-width: 640px) and (max-width: 767px)",
    md: "(min-width: 768px) and (max-width: 1023px)",
    lg: "(min-width: 1024px) and (max-width: 1279px)",
    xl: "(min-width: 1280px) and (max-width: 1535px)",
    "2xl": "(min-width: 1536px)",
  };

  /**
   * Signal del breakpoint activo actual.
   *
   * Emite uno de: 'xs', 'sm', 'md', 'lg', 'xl', '2xl'.
   * Se actualiza automáticamente cuando cambia el tamaño del viewport.
   *
   * @returns Signal<BreakpointSize> con el breakpoint actual
   */
  readonly currentBreakpoint = toSignal(
    this.breakpointObserver.observe(Object.values(this.tailwindBreakpoints)).pipe(
      map(() => {
        for (const [key, query] of Object.entries(this.tailwindBreakpoints)) {
          if (this.breakpointObserver.isMatched(query)) {
            return key as BreakpointSize;
          }
        }
        return "xs" as BreakpointSize;
      })
    ),
    { initialValue: "xs" as BreakpointSize }
  );

  /**
   * True si el viewport es móvil (xs o sm).
   *
   * Útil para mostrar layouts mobile-first o componentes específicos
   * de móvil como menús hamburguesa.
   */
  readonly isMobile = computed(() => ["xs", "sm"].includes(this.currentBreakpoint()));

  /**
   * True si el viewport es tablet (md).
   *
   * Útil para layouts intermedios que requieren comportamiento específico
   * en tablets, diferente de móvil y desktop.
   */
  readonly isTablet = computed(() => this.currentBreakpoint() === "md");

  /**
   * True si el viewport es desktop (lg, xl, 2xl).
   *
   * Útil para features exclusivas de desktop como sidebars fijos,
   * multi-columna, o navegación expandida.
   */
  readonly isDesktop = computed(() => ["lg", "xl", "2xl"].includes(this.currentBreakpoint()));
}
````

**Ejemplo Función Utilitaria:**

````typescript
/**
 * Formatea un número como precio en pesos colombianos.
 *
 * Utiliza la API Intl.NumberFormat para formateo internacionalizado
 * con locale es-CO y moneda COP. El formato resultante usa separadores
 * de miles con punto (.) y sin decimales.
 *
 * @param amount - Cantidad numérica a formatear (debe ser positiva)
 * @returns String formateado como "$XXX.XXX" sin decimales
 *
 * @example
 * Formateo básico:
 * ```typescript
 * formatPrice(180000);  // "$180.000"
 * formatPrice(50000);   // "$50.000"
 * formatPrice(1500000); // "$1.500.000"
 * ```
 *
 * @example
 * Uso en templates:
 * ```html
 * <span>{{ formatPrice(product.price) }}</span>
 * ```
 *
 * @throws RangeError si amount es negativo o NaN
 *
 * @see Intl.NumberFormat para opciones avanzadas de formateo
 */
function formatPrice(amount: number): string {
  if (amount < 0 || isNaN(amount)) {
    throw new RangeError("Amount must be a positive number");
  }

  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
````

---

## Guía de Uso Rápida

**Cuándo usar cada nivel:**

- **Básico**: Código interno, helpers privados, implementaciones simples
- **Medio**: Componentes compartidos, servicios públicos, utils reutilizables
- **Avanzado**: Componentes core complejos, servicios críticos, APIs públicas principales

**Reglas Generales:**

1. **Toda la documentación DEBE estar en inglés** (descripciones, comentarios, ejemplos)
2. Toda descripción debe ser concisa (una línea cuando sea posible)
3. NO incluir `@default` tags
4. NO incluir `@returns` para funciones void
5. NO incluir `@remarks` sections
6. Incluir `@example` solo para componentes, servicios y guards desde nivel medio, para funciones e interfaces solo en nivel avanzado
7. Usar `@deprecated` con path de migración cuando aplique
8. Usar `@internal` para APIs privadas documentadas
9. Mantener ejemplos en TypeScript, no en JS
10. Ejemplos deben ser funcionales y seguir best practices del proyecto
11. Evitar redundancia: si el código es obvio, no sobre-documentar

**Tags Permitidos por Nivel:**

| Tag           | Básico | Medio                                     | Avanzado |
| ------------- | ------ | ----------------------------------------- | -------- |
| Descripción   | ✅     | ✅                                        | ✅       |
| `@param`      | ✅     | ✅                                        | ✅       |
| `@returns`    | ✅     | ✅                                        | ✅       |
| `@example`    | ❌     | ✅ (solo componentes, servicios y guards) | ✅       |
| `@see`        | ❌     | ❌                                        | ✅       |
| `@throws`     | ❌     | ❌                                        | ✅       |
| `@deprecated` | ✅     | ✅                                        | ✅       |
| `@internal`   | ❌     | ❌                                        | ✅       |

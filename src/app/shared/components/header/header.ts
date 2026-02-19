import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DOCUMENT,
  inject,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Whatsapp } from '@core/services';
import { toSignal } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, fromEvent, map, startWith } from 'rxjs';

/** Navigation link definition for the header menu. */
interface NavLink {
  readonly label: string;
  readonly path: string;
  readonly fragment?: string;
}

/**
 * Site-wide header with fixed positioning, scroll-aware styling,
 * and a responsive mobile menu.
 *
 * @example
 * ```typescript
 * <app-header />
 * ```
 */
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  /** Provides WhatsApp link generation for the CTA actions. */
  private readonly whatsapp = inject(Whatsapp);
  /** Injected document reference for scroll state detection. */
  private readonly _doc = inject(DOCUMENT);

  /** True when the document is scrolled beyond the header threshold. */
  protected readonly isScrolled = toSignal(
    fromEvent(this._doc, 'scroll').pipe(
      // Map to a boolean: has the user scrolled beyond 20px?
      map(() => this._doc.documentElement.scrollTop > 20),

      // Avoid emitting when the value has not changed.
      distinctUntilChanged(),

      // Provide an initial value to avoid undefined on startup.
      startWith(false),
    ),
    { initialValue: false },
  );

  /** True when the mobile navigation panel is open. */
  protected readonly isMobileMenuOpen = signal<boolean>(false);

  /** Computed WhatsApp link for the primary contact CTA. */
  protected readonly whatsappLink = computed<string>(() =>
    this.whatsapp.generateLink(
      'Hola, quiero información sobre los cursos para descuento en comparendos.',
    ),
  );

  /** Primary navigation links rendered in desktop and mobile menus. */
  protected readonly navLinks: NavLink[] = [
    { label: 'Inicio', path: '/' },
    { label: 'Cursos', path: '/cursos' },
    { label: 'Calculadora', path: '/calculadora' },
    { label: 'Ubicación', path: '/ubicacion' },
    { label: 'Preguntas', path: '/preguntas-frecuentes' },
    { label: 'Nosotros', path: '/nosotros' },
  ];

  /** Toggles the visibility of the mobile navigation panel. */
  protected toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((v) => !v);
  }

  /** Closes the mobile navigation panel. */
  protected closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }
}

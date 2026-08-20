import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DOCUMENT,
  inject,
  signal,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CONFIG } from '@core/data/config.data';
import { Whatsapp } from '@core/services';
import { toSignal } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, filter, fromEvent, map, startWith } from 'rxjs';
import { Icon } from '../icon/icon';
import { MenuIcon, XIcon } from 'lucide-angular';
import { NgOptimizedImage } from '@angular/common';

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
  imports: [RouterLink, RouterLinkActive, Icon, NgOptimizedImage],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  /** Provides WhatsApp link generation for the CTA actions. */
  private readonly whatsapp = inject(Whatsapp);
  /** Injected document reference for scroll state detection. */
  private readonly _doc = inject(DOCUMENT);
  /** Router used to derive active navigation state independently of rendered links. */
  private readonly router = inject(Router);

  /** Global site configuration with social media URLs. */
  protected readonly config = CONFIG;

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
  /** True when the desktop services menu is open. */
  protected readonly isServicesMenuOpen = signal<boolean>(false);

  /** Current URL after the latest completed navigation. */
  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );

  /** Active service path, including future nested paths, or null outside the services group. */
  protected readonly activeServicePath = computed<string | null>(() => {
    const currentUrl = this.currentUrl();
    return this.serviceLinks.find(
      (service) =>
        currentUrl === service.path || currentUrl.startsWith(`${service.path}/`),
    )?.path ?? null;
  });

  /** Whether the current route belongs to the services navigation group. */
  protected readonly hasActiveServiceRoute = computed<boolean>(
    () => this.activeServicePath() !== null,
  );

  /** Active desktop trigger classes matching normal active navigation links. */
  protected readonly servicesTriggerActiveClasses = computed<string>(() =>
    this.hasActiveServiceRoute() ? 'text-highlight! border-b-2 border-highlight!' : '',
  );

  /** Computed WhatsApp link for the primary contact CTA. */
  protected readonly whatsappLink = computed<string>(() =>
    this.whatsapp.generateLink(
      'Hola, quiero información sobre los cursos para descuento en comparendos.',
    ),
  );

  /** Primary navigation links rendered in desktop and mobile menus. */
  protected readonly navLinks: NavLink[] = [
    { label: 'Calculadora', path: '/calculadora' },
    { label: 'Ubicación', path: '/ubicacion' },
    { label: 'Preguntas', path: '/preguntas-frecuentes' },
    { label: 'Nosotros', path: '/nosotros' },
    { label: 'Contacto', path: '/contacto' },
  ];

  /** Service links grouped in the accessible services menu. */
  protected readonly serviceLinks: NavLink[] = [
    { label: 'Cursos pedagógicos', path: '/cursos' },
    { label: 'Refrendación de licencia', path: '/refrendacion' },
    { label: 'Exámenes médicos', path: '/examenes-medicos' },
  ];

  /** Icon reference for the mobile menu toggle button. */
  protected readonly MenuIcon = MenuIcon;

  /** Icon reference for the mobile menu close button. */
  protected readonly XIcon = XIcon;

  /** Toggles the visibility of the mobile navigation panel. */
  protected toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((v) => !v);
  }

  /** Closes the mobile navigation panel. */
  protected closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  /** Whether a service link matches the active service route. */
  protected isActiveService(path: string): boolean {
    return this.activeServicePath() === path;
  }

  /** Opens the desktop services menu for pointer or keyboard users. */
  protected openServicesMenu(): void {
    this.isServicesMenuOpen.set(true);
  }

  /** Toggles the accessible desktop services menu. */
  protected toggleServicesMenu(): void {
    this.isServicesMenuOpen.update((isOpen) => !isOpen);
  }

  /** Closes the desktop services menu after navigation or pointer exit. */
  protected closeServicesMenu(): void {
    this.isServicesMenuOpen.set(false);
  }

  /** Closes the services menu only when keyboard focus leaves its full group. */
  protected closeServicesMenuWhenFocusLeaves(event: FocusEvent): void {
    const group = event.currentTarget as HTMLElement;

    if (!group.contains(event.relatedTarget as Node | null)) {
      this.closeServicesMenu();
    }
  }
}

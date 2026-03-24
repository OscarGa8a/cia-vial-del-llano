import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '@shared/components';
import {
  GraduationCapIcon,
  HouseIcon,
  LucideIconData,
  MapPinIcon,
  NotepadTextIcon,
} from 'lucide-angular';

/**
 * Navigation link configuration for quick access cards.
 */
interface QuickLink {
  /** Target route or URL for navigation. */
  href: string;
  /** Display label shown in the card heading. */
  label: string;
  /** Short description displayed below the label. */
  description: string;
  /** Lucide icon component reference for visual representation. */
  icon: LucideIconData;
  /** Tailwind CSS classes for card styling and theming. */
  classes: string;
  /** ARIA label for accessibility. */
  ariaLabel: string;
}

/**
 * Quick navigation links section with cards to key pages.
 *
 * Displays a responsive grid of 4 navigation cards for quick access to main sections:
 * Calculator, Courses, Location, and Home page. Each card includes an icon,
 * label, description, and accessible routing.
 *
 * @example
 * ```typescript
 * <app-quick-links-section />
 * ```
 */
@Component({
  selector: 'app-quick-links-section',
  imports: [RouterLink, Icon],
  templateUrl: './quick-links-section.html',
  styleUrl: './quick-links-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickLinksSection {
  /** Array of quick link configurations with routing, icons, and styling. */
  protected readonly quickLinks: QuickLink[] = [
    {
      href: '/calculadora',
      label: 'Calculadora de Multas',
      description: 'Calcula el valor de tu multa con descuento.',
      icon: NotepadTextIcon,
      classes: 'bg-highlight-light text-highlight',
      ariaLabel: 'Ir a la calculadora de multas',
    },
    {
      href: '/cursos',
      label: 'Cursos Pedagógicos',
      description: 'Información completa sobre nuestros cursos.',
      icon: GraduationCapIcon,
      classes: 'bg-accent-light text-accent',
      ariaLabel: 'Ver información de cursos pedagógicos',
    },
    {
      href: '/ubicacion',
      label: 'Nuestra Ubicación',
      description: 'Cómo llegar a nuestras instalaciones.',
      icon: MapPinIcon,
      classes: 'bg-info-light text-info',
      ariaLabel: 'Ver ubicación de CIA Vial del Llano',
    },
    {
      href: '/',
      label: 'Página Principal',
      description: 'Volver al inicio para más información.',
      icon: HouseIcon,
      classes: 'bg-success-light text-success',
      ariaLabel: 'Ir a la página principal',
    },
  ];
}

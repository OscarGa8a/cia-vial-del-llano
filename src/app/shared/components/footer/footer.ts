import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONFIG } from '../../../core/data/config.data';
import { ClockIcon, MapPinIcon, PhoneIcon } from 'lucide-angular';
import { Icon } from '../icon/icon';
import { NgOptimizedImage } from '@angular/common';

/**
 * Site-wide footer with 4-column layout:
 * brand/description | quick links | contact info | social/legal
 *
 * @example
 * ```typescript
 * <app-footer />
 * ```
 */
@Component({
  selector: 'app-footer',
  imports: [RouterLink, Icon, NgOptimizedImage],
  styleUrl: './footer.css',
  templateUrl: './footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  /** Global site configuration used for footer content. */
  protected readonly config = CONFIG;

  /** Current year displayed in the copyright section. */
  protected readonly currentYear = computed(() => new Date().getFullYear());

  /** Primary navigation links displayed in the quick links column. */
  protected readonly quickLinks = [
    { label: 'Inicio', path: '/' },
    { label: 'Cursos', path: '/cursos' },
    { label: 'Calculadora de Multas', path: '/calculadora' },
    { label: 'Ubicación', path: '/ubicacion' },
    { label: 'Preguntas Frecuentes', path: '/preguntas-frecuentes' },
    { label: 'Nosotros', path: '/nosotros' },
  ] as const;

  /** Institutional badges rendered in the trust section. */
  protected readonly trustBadges = [
    'Ministerio de Transporte',
    'RUNT',
    'SIMIT',
    'Supertransporte',
  ] as const;

  /** Map pin icon used for address rows. */
  protected readonly MapPinIcon = MapPinIcon;

  /** Phone icon used for contact phone rows. */
  protected readonly PhoneIcon = PhoneIcon;

  /** Clock icon used for business hours rows. */
  protected readonly ClockIcon = ClockIcon;
}

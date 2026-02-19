import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONFIG } from '../../../core/data/config.data';
import { ClockIcon, MapPinIcon, PhoneIcon } from 'lucide-angular';
import { Icon } from '../icon/icon';

/**
 * Site-wide footer with 4-column layout:
 * brand/description | quick links | contact info | social/legal
 */
@Component({
  selector: 'app-footer',
  imports: [RouterLink, Icon],
  templateUrl: './footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  protected readonly config = CONFIG;

  protected readonly currentYear = computed(() => new Date().getFullYear());

  protected readonly quickLinks = [
    { label: 'Inicio', path: '/' },
    { label: 'Cursos', path: '/cursos' },
    { label: 'Calculadora de Multas', path: '/calculadora' },
    { label: 'Ubicación', path: '/ubicacion' },
    { label: 'Preguntas Frecuentes', path: '/preguntas-frecuentes' },
    { label: 'Nosotros', path: '/nosotros' },
  ] as const;

  protected readonly trustBadges = [
    'Ministerio de Transporte',
    'RUNT',
    'SIMIT',
    'Supertransporte',
  ] as const;

  protected readonly MapPinIcon = MapPinIcon;

  protected readonly PhoneIcon = PhoneIcon;

  protected readonly ClockIcon = ClockIcon;
}

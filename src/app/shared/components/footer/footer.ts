import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONFIG } from '../../../core/data/config.data';
import { SERVICES } from '@core/data/services.data';
import { ClockIcon, MapPinIcon, PhoneIcon } from 'lucide-angular';
import { Icon } from '../icon/icon';
import { NgOptimizedImage } from '@angular/common';

/** Site-wide footer with navigation and contact information. */
@Component({
  selector: 'app-footer',
  imports: [RouterLink, Icon, NgOptimizedImage],
  styleUrl: './footer.css',
  templateUrl: './footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  protected readonly config = CONFIG;
  protected readonly currentYear = computed(() => new Date().getFullYear());
  protected readonly quickLinks = [
    { label: 'Inicio', path: '/' },
    { label: 'Calculadora de Multas', path: '/calculadora' },
    { label: 'Ubicación', path: '/ubicacion' },
    { label: 'Preguntas Frecuentes', path: '/preguntas-frecuentes' },
    { label: 'Nosotros', path: '/nosotros' },
  ] as const;
  protected readonly serviceLinks = SERVICES;
  protected readonly MapPinIcon = MapPinIcon;
  protected readonly PhoneIcon = PhoneIcon;
  protected readonly ClockIcon = ClockIcon;
}

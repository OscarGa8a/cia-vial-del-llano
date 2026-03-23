import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon } from '@shared/components';
import {
  Building2,
  BusIcon,
  FileSearch,
  FingerprintPatternIcon,
  LucideIconData,
} from 'lucide-angular';

/**
 * Data model for a trust badge representing an official regulatory authority.
 */
interface TrustBadge {
  name: string;
  fullName: string;
  description: string;
  class: string;
  icon: LucideIconData;
}

/**
 * Trust and credibility indicators section displaying regulatory authority badges.
 *
 * Showcases official certifications and government affiliations including the Ministry
 * of Transport, traffic registration system, traffic violation database, and transport
 * superintendence. Each badge displays an icon and full organization name to build
 * user confidence.
 *
 * @example
 * ```typescript
 * <app-trust-badges-section />
 * ```
 */
@Component({
  selector: 'app-trust-badges-section',
  imports: [Icon],
  templateUrl: './trust-badges-section.html',
  styleUrl: './trust-badges-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrustBadgesSection {
  /**
   * Collection of official regulatory badges.
   *
   * Contains configuration for each trust badge including short names, full names,
   * descriptions, background colors, and SVG icon paths for rendering official
   * certifications and government affiliations.
   */
  protected readonly badges: TrustBadge[] = [
    {
      name: 'MinTransporte',
      fullName: 'Ministerio de Transporte',
      description: 'Ministerio de Transporte',
      class: 'text-blue-600 bg-blue-50',
      icon: BusIcon,
    },
    {
      name: 'RUNT',
      fullName: 'Registro Único Nacional de Tránsito',
      description: 'Registro Nacional de Tránsito',
      class: 'text-green-600 bg-green-50',
      icon: FingerprintPatternIcon,
    },
    {
      name: 'SIMIT',
      fullName: 'Sistema Integrado de Multas y Sanciones por Infracciones de Tránsito',
      description: 'Sistema de Infracciones',
      class: 'text-orange-600 bg-orange-50',
      icon: FileSearch,
    },
    {
      name: 'Supertransporte',
      fullName: 'Superintendencia de Transporte',
      description: 'Superintendencia de Transporte',
      class: 'text-red-600 bg-red-50',
      icon: Building2,
    },
  ] as const;
}

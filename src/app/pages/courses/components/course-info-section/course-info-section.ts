import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Clock4Icon, GlobeIcon, LucideIconData, PercentIcon } from 'lucide-angular';
import { Icon } from '@shared/components';
import { NgOptimizedImage } from '@angular/common';

/**
 * Represents a metric card displayed in the course quick-stats grid.
 */
interface QuickStat {
  /** Icon displayed for the metric card. */
  readonly icon: LucideIconData;
  /** Main metric value emphasized in the card. */
  readonly value: string;
  /** Supporting text that explains the metric value. */
  readonly label: string;
  /** Utility classes applied to the icon container styling. */
  readonly classes: string;
}

/**
 * Course information section with quick metrics about duration, discount, and certificate validity.
 *
 * @example
 * ```typescript
 * <app-course-info-section />
 * ```
 */
@Component({
  selector: 'app-course-info-section',
  imports: [Icon, NgOptimizedImage],
  templateUrl: './course-info-section.html',
  styleUrl: './course-info-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseInfoSection {
  /** Quick stats rendered as highlight cards in the section content area. */
  protected readonly quickStats: readonly QuickStat[] = [
    {
      icon: Clock4Icon,
      value: '4 horas',
      label: 'Duración del curso',
      classes: 'bg-primary-lighter text-primary',
    },
    {
      icon: PercentIcon,
      value: 'Hasta 50%',
      label: 'Descuento en tu multa',
      classes: 'bg-success-light text-success',
    },
    {
      icon: GlobeIcon,
      value: 'Nacional',
      label: 'Validez del certificado',
      classes: 'bg-highlight-light text-highlight',
    },
  ];
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Whatsapp } from '@core/services/whatsapp';
import { Icon } from '@shared/components';
import { CalendarDaysIcon, InfoIcon } from 'lucide-angular';

/**
 * Renders the schedule-visit CTA with WhatsApp contact action and walk-in guidance.
 *
 * @example
 * ```html
 * <app-schedule-cta-section />
 * ```
 */
@Component({
  selector: 'app-schedule-cta-section',
  imports: [Icon],
  templateUrl: './schedule-cta-section.html',
  styleUrl: './schedule-cta-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleCtaSection {
  /** Service used to generate WhatsApp links for the CTA action button. */
  protected readonly whatsapp = inject(Whatsapp);

  /** Calendar icon displayed in the CTA heading and action area. */
  protected readonly CalendarDaysIcon = CalendarDaysIcon;

  /** Info icon displayed alongside the walk-in availability note. */
  protected readonly InfoIcon = InfoIcon;
}

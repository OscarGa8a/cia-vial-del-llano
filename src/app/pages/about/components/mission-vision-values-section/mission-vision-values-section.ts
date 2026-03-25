import { ChangeDetectionStrategy, Component } from '@angular/core';
import { COMPANY, COMPANY_VALUES } from '@core/data/about-page.data';
import { Icon } from '@shared/components';
import { BowArrowIcon, CheckIcon, EyeIcon, HeartIcon } from 'lucide-angular';

/**
 * Mission, Vision, and Values section for the About page.
 *
 * Displays three highlighted cards with company mission, vision, and core values.
 * Uses static content from About page data and icon references for each card.
 *
 * @example
 * ```typescript
 * <app-mission-vision-values-section />
 * ```
 */
@Component({
  selector: 'app-mission-vision-values-section',
  imports: [Icon],
  templateUrl: './mission-vision-values-section.html',
  styleUrl: './mission-vision-values-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MissionVisionValuesSection {
  /** Company values list rendered in the values card. */
  protected readonly values = COMPANY_VALUES;

  /** Company mission and vision content source. */
  protected readonly company = COMPANY;

  /** Bow arrow icon reference for the mission card. */
  protected readonly BowArrowIcon = BowArrowIcon;

  /** Eye icon reference for the vision card. */
  protected readonly EyeIcon = EyeIcon;

  /** Heart icon reference for the values card header. */
  protected readonly HeartIcon = HeartIcon;

  /** Check icon reference for each value list item. */
  protected readonly CheckIcon = CheckIcon;
}

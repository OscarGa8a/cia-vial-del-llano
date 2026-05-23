import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CONFIG } from '@core/data/config.data';
import { Icon } from '@shared/components';

/**
 * Displays social media links (Facebook, Instagram, TikTok)
 * as interactive cards on the contact page.
 *
 * @example
 * ```typescript
 * <app-social-section />
 * ```
 */
@Component({
  selector: 'app-social-section',
  imports: [Icon],
  templateUrl: './social-section.html',
  styleUrl: './social-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialSection {
  /** Global site configuration with social media URLs. */
  protected readonly config = CONFIG;
}

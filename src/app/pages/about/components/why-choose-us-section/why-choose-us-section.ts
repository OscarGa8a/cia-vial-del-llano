import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ADVANTAGES } from '@core/data/about-page.data';
import { Icon } from '@shared/components';

/**
 * "Why Choose Us" section for the About page.
 * Displays a 6-card grid of advantages with icons.
 */
@Component({
  selector: 'app-why-choose-us-section',
  imports: [Icon],
  templateUrl: './why-choose-us-section.html',
  styleUrl: './why-choose-us-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhyChooseUsSection {
  /** List of advantages to display in the section, sourced from static data. */
  protected readonly advantages = ADVANTAGES;
}

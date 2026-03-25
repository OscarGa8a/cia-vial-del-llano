import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ABOUT_STATS } from '@core/data/about-page.data';

/**
 * Stats section for the About page.
 * Displays 4 key metrics on a gradient background: years, courses,
 * drivers trained, and certificate validity.
 */
@Component({
  selector: 'app-stats-section',
  imports: [],
  templateUrl: './stats-section.html',
  styleUrl: './stats-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsSection {
  /** Stats data source for rendering the metrics in the template. */
  protected readonly stats = ABOUT_STATS;
}

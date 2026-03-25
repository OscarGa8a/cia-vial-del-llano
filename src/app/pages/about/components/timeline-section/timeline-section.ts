import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TIMELINE_ITEMS } from '@core/data/about-page.data';

/**
 * Timeline section for the About page.
 * Displays company history milestones with a left-border timeline design.
 */
@Component({
  selector: 'app-timeline-section',
  imports: [],
  templateUrl: './timeline-section.html',
  styleUrl: './timeline-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineSection {
  /** List of timeline items to display in the section, sourced from static data. */
  protected readonly timelineItems = TIMELINE_ITEMS;
}

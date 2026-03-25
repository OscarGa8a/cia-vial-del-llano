import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FACILITIES } from '@core/data/about-page.data';

/**
 * Facilities / Gallery section for the About page.
 * Displays a bento-style grid of facility areas with gradient placeholders
 * and hover labels. Uses Gemini's col-span-2 layout pattern.
 */
@Component({
  selector: 'app-facilities-section',
  imports: [NgOptimizedImage],
  templateUrl: './facilities-section.html',
  styleUrl: './facilities-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacilitiesSection {
  /** The list of facility areas to display. */
  protected readonly facilities = FACILITIES;
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TESTIMONIALS } from '@core/data/about-page.data';

/**
 * Testimonials section for the About page.
 * Displays 3 customer testimonials with star ratings and initials.
 */
@Component({
  selector: 'app-testimonials-section',
  imports: [],
  templateUrl: './testimonials-section.html',
  styleUrl: './testimonials-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialsSection {
  /** List of testimonials to display in the section, sourced from static data. */
  protected readonly testimonials = TESTIMONIALS;

  /** Array used to render 5 stars via &#64;for. */
  protected readonly starArray = Array(5);
}

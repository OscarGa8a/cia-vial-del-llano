import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TESTIMONIALS } from '@core/data/testimonials.data';
import { TestimonialItem } from './testimonial-item/testimonial-item';

/**
 * Customer testimonials carousel displaying user reviews and ratings.
 *
 * Presents a collection of customer feedback with star ratings and quotes
 * showcasing user satisfaction and experience with the course program.
 *
 * @example
 * ```typescript
 * <app-testimonials-section />
 * ```
 */
@Component({
  selector: 'app-testimonials-section',
  imports: [TestimonialItem],
  templateUrl: './testimonials-section.html',
  styleUrl: './testimonials-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialsSection {
  /** Collection of customer testimonials loaded from application data. */
  protected readonly testimonials = TESTIMONIALS;
}

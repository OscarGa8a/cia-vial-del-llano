import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Testimonial } from '@core/models/testimonial.model';

/**
 * Renders a testimonial card with quote content, author data, and star rating.
 *
 * @example
 * ```typescript
 * <app-testimonial-item [testimonial]="testimonial" />
 * ```
 */
@Component({
  selector: 'app-testimonial-item',
  imports: [],
  templateUrl: './testimonial-item.html',
  styleUrl: './testimonial-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialItem {
  /** Testimonial data rendered by the card. */
  readonly testimonial = input.required<Testimonial>();

  /**
   * Maps a numeric rating to a 5-star filled and empty state array.
   *
   * @param rating - Numeric rating value used to mark filled stars
   * @returns Array of five booleans where true means a filled star
   */
  protected getStars(rating: number): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < rating);
  }
}

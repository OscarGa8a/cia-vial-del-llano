import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { DiscountCard } from '../../../models/discount';
import { Icon } from '@shared/components';

/**
 * Renders a discount card with its CTA action for the home discounts section.
 *
 * @example
 * ```typescript
 * <app-card-discount
 *   [infoDiscount]="discount"
 *   (clickChange)="onDiscountCtaClick()"
 * />
 * ```
 */
@Component({
  selector: 'app-card-discount',
  imports: [Icon],
  templateUrl: './card-discount.html',
  styleUrl: './card-discount.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDiscount {
  /** Discount content rendered by the card. */
  readonly infoDiscount = input.required<DiscountCard>();

  /** Emits when the user triggers the card CTA action. */
  readonly clickChange = output<void>();

  /**
   * Emits the CTA event to notify parent components about the user action.
   */
  protected openWhatsapp(): void {
    this.clickChange.emit();
  }
}

import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { DiscountCard as IDiscountCard } from '@core/models/discount';
import { Whatsapp } from '@core/services';
import { Icon } from '@shared/components';

/**
 * Renders a discount card with its CTA action for the home discounts section.
 *
 * @example
 * ```typescript
 * <app-discount-card
 *   [infoDiscount]="discount"
 *   (clickChange)="onDiscountCtaClick()"
 * />
 * ```
 */
@Component({
  selector: 'app-discount-card',
  imports: [Icon],
  templateUrl: './discount-card.html',
  styleUrl: './discount-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscountCard {
  /** Service for generating WhatsApp sharing links. */
  private readonly whatsapp = inject(Whatsapp);

  /** Discount content rendered by the card. */
  readonly infoDiscount = input.required<IDiscountCard>();

  /**
   * Opens a WhatsApp chat with a pre-filled message to inquire about booking a discount course.
   * @param message The pre-filled message to send in the WhatsApp chat.
   */
  protected openWhatsapp(message: string): void {
    this.whatsapp.openChat(message);
  }
}

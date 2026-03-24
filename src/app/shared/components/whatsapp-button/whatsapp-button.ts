import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Whatsapp } from '@core/services/whatsapp';
import { Icon } from '../icon/icon';

/**
 * Renders a floating WhatsApp CTA button with hover tooltip behavior.
 *
 * @example
 * ```typescript
 * <app-whatsapp-button />
 * ```
 */
@Component({
  selector: 'app-whatsapp-button',
  templateUrl: './whatsapp-button.html',
  styleUrl: './whatsapp-button.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
})
export class WhatsappButton {
  /**
   * WhatsApp service used to build the outbound contact URL.
   */
  private readonly whatsapp = inject(Whatsapp);

  /**
   * Controls tooltip visibility state for hover interactions.
   */
  protected readonly isTooltipVisible = signal<boolean>(false);

  /**
   * Computed WhatsApp link generated from configured phone/message values.
   */
  protected readonly whatsappLink = computed<string>(() => this.whatsapp.generateLink());

  /**
   * Shows the tooltip when the pointer enters the trigger area.
   */
  protected showTooltip(): void {
    this.isTooltipVisible.set(true);
  }

  /**
   * Hides the tooltip when the pointer leaves the trigger area.
   */
  protected hideTooltip(): void {
    this.isTooltipVisible.set(false);
  }
}

import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Whatsapp } from '@core/services/whatsapp';
import { Icon } from '../icon/icon';

/**
 * Floating WhatsApp action button fixed to the bottom-right corner.
 * Shows a tooltip on hover and pulses with a glow animation to draw attention.
 */
@Component({
  selector: 'app-whatsapp-button',
  templateUrl: './whatsapp-button.html',
  styleUrl: './whatsapp-button.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
})
export class WhatsappButton {
  private readonly whatsapp = inject(Whatsapp);
  protected readonly isTooltipVisible = signal<boolean>(false);

  protected readonly whatsappLink = computed<string>(() => this.whatsapp.generateLink());

  protected showTooltip(): void {
    this.isTooltipVisible.set(true);
  }

  protected hideTooltip(): void {
    this.isTooltipVisible.set(false);
  }
}

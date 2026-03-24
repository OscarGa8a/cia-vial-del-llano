import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Whatsapp } from '@core/services';
import { CalculatorIcon } from 'lucide-angular';
import { Icon, CalculatorForm } from '@shared/components';

/**
 * Preview section showcasing the fine calculator functionality.
 *
 * Displays a preview of the calculator tool with a call-to-action that generates
 * a WhatsApp link for users interested in calculating their fine discounts.
 *
 * @example
 * ```typescript
 * <app-calculator-preview-section />
 * ```
 */
@Component({
  selector: 'app-calculator-preview-section',
  imports: [Icon, CalculatorForm],
  templateUrl: './calculator-preview-section.html',
  styleUrl: './calculator-preview-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorPreviewSection {
  /** Service for generating WhatsApp sharing links. */
  private readonly whatsapp = inject(Whatsapp);

  /** Icon representing the calculator tool in the preview. */
  protected readonly CalculatorIcon = CalculatorIcon;

  /**
   * WhatsApp link with pre-filled message for calculator inquiry.
   *
   * Generates a WhatsApp conversation starter asking about potential fine discounts.
   */
  protected readonly whatsappLink = computed<string>(() =>
    this.whatsapp.generateLink(
      'Hola, quiero saber cuánto puedo ahorrar en mi comparendo. ¿Pueden ayudarme?',
    ),
  );
}

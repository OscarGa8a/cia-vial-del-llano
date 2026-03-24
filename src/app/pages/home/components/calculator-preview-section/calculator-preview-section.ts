import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalculatorForm } from '@shared/components';

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
  imports: [CalculatorForm],
  templateUrl: './calculator-preview-section.html',
  styleUrl: './calculator-preview-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorPreviewSection {}

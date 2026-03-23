import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Step } from '../../../models';
import { Icon } from '@shared/components';

/**
 * Renders a single process step card with icon, title, and description.
 *
 * @example
 * ```typescript
 * <app-step-item [step]="step" />
 * ```
 */
@Component({
  selector: 'app-step-item',
  imports: [Icon],
  templateUrl: './step-item.html',
  styleUrl: './step-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepItem {
  /** Step data displayed by the component. */
  readonly step = input.required<Step>();
}

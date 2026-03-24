import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  CalculatorHeroSection,
  SmdlvInfoSection,
  InfractionsTableSection,
  DiscountsDeadlinesSection,
  HowToUseSection,
  CalculatorCtaSection,
} from './components';
import type { Infraction } from '../../core/models/infraction.model';
import { CalculatorForm } from '@shared/components';

/**
 * Calculator page orchestrator.
 * Manages the signal that bridges the infractions table (emitter)
 * and the calculator form (receiver) when a row is clicked.
 */
@Component({
  selector: 'app-calculator',
  imports: [
    CalculatorHeroSection,
    CalculatorForm,
    SmdlvInfoSection,
    InfractionsTableSection,
    DiscountsDeadlinesSection,
    HowToUseSection,
    CalculatorCtaSection,
  ],
  templateUrl: './calculator.html',
  styleUrl: './calculator.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Calculator {
  /** Holds the infraction clicked in the table; passed down to the form. */
  protected readonly selectedInfraction = signal<Infraction | null>(null);

  /** Called when the user clicks a row in the infractions table. */
  protected onInfractionSelected(infraction: Infraction): void {
    this.selectedInfraction.set(infraction);
  }
}

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CalculatorHeroSectionComponent } from './components/calculator-hero-section.component';
import { CalculatorFormSectionComponent } from './components/calculator-form-section.component';
import { SmdlvInfoSectionComponent } from './components/smdlv-info-section.component';
import { InfractionsTableSectionComponent } from './components/infractions-table-section.component';
import { DiscountDeadlinesSectionComponent } from './components/discount-deadlines-section.component';
import { HowToUseSectionComponent } from './components/how-to-use-section.component';
import { CalculatorCtaSectionComponent } from './components/calculator-cta-section.component';
import type { Infraction } from '../../core/models/infraction.model';

/**
 * Calculator page orchestrator.
 * Manages the signal that bridges the infractions table (emitter)
 * and the calculator form (receiver) when a row is clicked.
 */
@Component({
  selector: 'app-calculator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CalculatorHeroSectionComponent,
    CalculatorFormSectionComponent,
    SmdlvInfoSectionComponent,
    InfractionsTableSectionComponent,
    DiscountDeadlinesSectionComponent,
    HowToUseSectionComponent,
    CalculatorCtaSectionComponent,
  ],
  template: `
    <app-calculator-hero-section />

    <app-calculator-form-section [preSelected]="selectedInfraction()" />

    <app-smdlv-info-section />

    <app-infractions-table-section
      (infractionSelected)="onInfractionSelected($event)"
    />

    <app-discount-deadlines-section />

    <app-how-to-use-section />

    <app-calculator-cta-section />
  `,
})
export class CalculatorComponent {
  /** Holds the infraction clicked in the table; passed down to the form. */
  protected readonly selectedInfraction = signal<Infraction | null>(null);

  /** Called when the user clicks a row in the infractions table. */
  protected onInfractionSelected(infraction: Infraction): void {
    this.selectedInfraction.set(infraction);
  }
}

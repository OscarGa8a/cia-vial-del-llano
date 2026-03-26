import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
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
import { Seo } from '@core/services/seo';
import { PAGE_SEO_CONFIG, SEO_CONFIG } from '@core/constants/seo';

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
export class Calculator implements OnInit {
  private readonly seo = inject(Seo);

  /** Holds the infraction clicked in the table; passed down to the form. */
  protected readonly selectedInfraction = signal<Infraction | null>(null);

  ngOnInit(): void {
    this.seo.updateMetaTags({
      title: PAGE_SEO_CONFIG.calculator.title,
      description: PAGE_SEO_CONFIG.calculator.description,
      keywords: PAGE_SEO_CONFIG.calculator.keywords,
      url: `${SEO_CONFIG.siteUrl}/calculadora`,
      type: 'website',
    });

    this.seo.addStructuredData(
      this.seo.generateBreadcrumbSchema([
        { name: 'Inicio', url: SEO_CONFIG.siteUrl },
        { name: 'Calculadora de Multas', url: `${SEO_CONFIG.siteUrl}/calculadora` },
      ]),
      'breadcrumb-schema',
    );
  }

  /** Called when the user clicks a row in the infractions table. */
  protected onInfractionSelected(infraction: Infraction): void {
    this.selectedInfraction.set(infraction);
  }
}

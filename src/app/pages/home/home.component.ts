import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroSectionComponent } from './components/hero-section.component';
import { TrustBadgesSectionComponent } from './components/trust-badges-section.component';
import { DiscountsSectionComponent } from './components/discounts-section.component';
import { StepsSectionComponent } from './components/steps-section.component';
import { CalculatorPreviewSectionComponent } from './components/calculator-preview-section.component';
import { TestimonialsSectionComponent } from './components/testimonials-section.component';
import { LocationSectionComponent } from './components/location-section.component';
import { FaqSectionComponent } from './components/faq-section.component';
import { FinalCtaSectionComponent } from './components/final-cta-section.component';

/**
 * Home page — the main landing page of CIA Vial del Llano.
 * Orchestrates all section components in the correct visual order.
 */
@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeroSectionComponent,
    TrustBadgesSectionComponent,
    DiscountsSectionComponent,
    StepsSectionComponent,
    CalculatorPreviewSectionComponent,
    TestimonialsSectionComponent,
    LocationSectionComponent,
    FaqSectionComponent,
    FinalCtaSectionComponent,
  ],
  template: `
    <app-hero-section />
    <app-trust-badges-section />
    <app-discounts-section />
    <app-steps-section />
    <app-calculator-preview-section />
    <app-testimonials-section />
    <app-location-section />
    <app-faq-section />
    <app-final-cta-section />
  `,
})
export class HomeComponent {}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactHeroSectionComponent } from './components/hero-section.component';
import { ContactOptionsSectionComponent } from './components/contact-options-section.component';
import { ContactFormSectionComponent } from './components/contact-form-section.component';
import { ContactFaqLinksSectionComponent } from './components/faq-quick-links-section.component';
import { ContactFinalCtaSectionComponent } from './components/final-cta-section.component';

/**
 * Contact page — Contacto page for CIA Vial del Llano.
 * Orchestrates all section components in the correct visual order.
 *
 * This is a zero-logic orchestrator that composes 5 section components
 * covering the company's contact channels, a message form with WhatsApp
 * integration, business hours, location info, FAQ quick links,
 * and a final call-to-action.
 */
@Component({
  selector: 'app-contact-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ContactHeroSectionComponent,
    ContactOptionsSectionComponent,
    ContactFormSectionComponent,
    ContactFaqLinksSectionComponent,
    ContactFinalCtaSectionComponent,
  ],
  template: `
    <app-contact-hero-section />
    <app-contact-options-section />
    <app-contact-form-section />
    <app-contact-faq-links-section />
    <app-contact-final-cta-section />
  `,
})
export class ContactPageComponent {}

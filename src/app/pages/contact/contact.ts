import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ContactFormSection,
  ContactOptionsSection,
  FaqQuickLinksSection,
  FinalCtaSection,
  HeroSection,
} from './components';

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
  selector: 'app-contact',
  imports: [
    HeroSection,
    ContactOptionsSection,
    ContactFormSection,
    FaqQuickLinksSection,
    FinalCtaSection,
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {}

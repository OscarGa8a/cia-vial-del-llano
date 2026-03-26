import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import {
  ContactFormSection,
  ContactOptionsSection,
  FaqQuickLinksSection,
  FinalCtaSection,
  HeroSection,
} from './components';
import { Seo } from '@core/services/seo';
import { PAGE_SEO_CONFIG, SEO_CONFIG } from '@core/constants/seo';

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
export class Contact implements OnInit {
  private readonly seo = inject(Seo);

  ngOnInit(): void {
    this.seo.updateMetaTags({
      title: PAGE_SEO_CONFIG.contact.title,
      description: PAGE_SEO_CONFIG.contact.description,
      keywords: PAGE_SEO_CONFIG.contact.keywords,
      url: `${SEO_CONFIG.siteUrl}/contacto`,
      type: 'website',
    });

    this.seo.addStructuredData(
      this.seo.generateBreadcrumbSchema([
        { name: 'Inicio', url: SEO_CONFIG.siteUrl },
        { name: 'Contacto', url: `${SEO_CONFIG.siteUrl}/contacto` },
      ]),
      'breadcrumb-schema',
    );
  }
}

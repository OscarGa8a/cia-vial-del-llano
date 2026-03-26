import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import {
  CertificationsSection,
  FacilitiesSection,
  FinalCtaSection,
  HeroSection,
  IntroductionSection,
  MissionVisionValuesSection,
  StatsSection,
  TeamSection,
  TestimonialsSection,
  TimelineSection,
  WhyChooseUsSection,
} from './components';
import { Seo } from '@core/services/seo';
import { PAGE_SEO_CONFIG, SEO_CONFIG } from '@core/constants/seo';

/**
 * About page — Nosotros page for CIA Vial del Llano.
 * Orchestrates all section components in the correct visual order.
 *
 * This is a zero-logic orchestrator that composes 11 section components
 * covering the company's history, mission, team, certifications,
 * facilities, testimonials, and call-to-action.
 */
@Component({
  selector: 'app-about',
  imports: [
    HeroSection,
    IntroductionSection,
    MissionVisionValuesSection,
    StatsSection,
    WhyChooseUsSection,
    TeamSection,
    CertificationsSection,
    FacilitiesSection,
    TestimonialsSection,
    TimelineSection,
    FinalCtaSection,
  ],
  templateUrl: './about.html',
  styleUrl: './about.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About implements OnInit {
  private readonly seo = inject(Seo);

  ngOnInit(): void {
    this.seo.updateMetaTags({
      title: PAGE_SEO_CONFIG.about.title,
      description: PAGE_SEO_CONFIG.about.description,
      keywords: PAGE_SEO_CONFIG.about.keywords,
      url: `${SEO_CONFIG.siteUrl}/nosotros`,
      type: 'website',
    });

    this.seo.addStructuredData(
      this.seo.generateBreadcrumbSchema([
        { name: 'Inicio', url: SEO_CONFIG.siteUrl },
        { name: 'Nosotros', url: `${SEO_CONFIG.siteUrl}/nosotros` },
      ]),
      'breadcrumb-schema',
    );
  }
}

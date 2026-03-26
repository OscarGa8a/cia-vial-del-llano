import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import {
  HeroSection,
  TrustBadgesSection,
  DiscountsSection,
  StepsSection,
  CalculatorPreviewSection,
  TestimonialsSection,
  LocationSection,
  FaqSection,
  FinalCtaSection,
} from './components';
import { Seo } from '@core/services/seo';
import { PAGE_SEO_CONFIG, SEO_CONFIG } from '@core/constants/seo';

/**
 * Home page — the main landing page of CIA Vial del Llano.
 * Orchestrates all section components in the correct visual order.
 */
@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [
    HeroSection,
    TrustBadgesSection,
    DiscountsSection,
    StepsSection,
    CalculatorPreviewSection,
    TestimonialsSection,
    LocationSection,
    FaqSection,
    FinalCtaSection,
  ],
})
export class HomeComponent implements OnInit {
  private readonly seo = inject(Seo);

  ngOnInit(): void {
    this.seo.updateMetaTags({
      title: PAGE_SEO_CONFIG.home.title,
      description: PAGE_SEO_CONFIG.home.description,
      keywords: PAGE_SEO_CONFIG.home.keywords,
      url: SEO_CONFIG.siteUrl,
      type: 'website',
    });

    this.seo.addStructuredData(this.seo.generateOrganizationSchema(), 'org-schema');
    this.seo.addStructuredData(this.seo.generateLocalBusinessSchema(), 'local-business-schema');
  }
}

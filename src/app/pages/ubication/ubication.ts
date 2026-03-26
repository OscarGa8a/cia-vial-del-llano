import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import {
  ContactInfoSection,
  GallerySection,
  HowToGetThereSection,
  ParkingInfoSection,
  ScheduleCtaSection,
  UbicationFaqSection,
  UbicationFinalCtaSection,
  UbicationHeroSection,
} from './components';
import { Seo } from '@core/services/seo';
import { PAGE_SEO_CONFIG, SEO_CONFIG } from '@core/constants/seo';

/**
 * Location (Ubicación) page showing company location, hours, directions, and contact info.
 *
 * Sections:
 * - Hero with breadcrumb and wave divider
 * - Contact info cards with Google Maps
 * - How to get there (car, bus, landmarks)
 * - Free parking info banner
 * - Photo gallery of facilities
 * - Schedule a visit CTA
 * - FAQ accordion
 * - Final CTA with phone and WhatsApp
 */
@Component({
  selector: 'app-ubication',
  imports: [
    UbicationHeroSection,
    ContactInfoSection,
    HowToGetThereSection,
    ParkingInfoSection,
    GallerySection,
    ScheduleCtaSection,
    UbicationFaqSection,
    UbicationFinalCtaSection,
  ],
  templateUrl: './ubication.html',
  styleUrl: './ubication.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Ubication implements OnInit {
  private readonly seo = inject(Seo);

  ngOnInit(): void {
    this.seo.updateMetaTags({
      title: PAGE_SEO_CONFIG.ubication.title,
      description: PAGE_SEO_CONFIG.ubication.description,
      keywords: PAGE_SEO_CONFIG.ubication.keywords,
      url: `${SEO_CONFIG.siteUrl}/ubicacion`,
      type: 'website',
    });

    this.seo.addStructuredData(
      this.seo.generateBreadcrumbSchema([
        { name: 'Inicio', url: SEO_CONFIG.siteUrl },
        { name: 'Ubicación', url: `${SEO_CONFIG.siteUrl}/ubicacion` },
      ]),
      'breadcrumb-schema',
    );
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
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
export class Ubication {}

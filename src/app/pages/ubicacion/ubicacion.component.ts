import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UbicacionHeroSectionComponent } from './components/ubicacion-hero-section.component';
import { ContactInfoSectionComponent } from './components/contact-info-section.component';
import { HowToGetThereSectionComponent } from './components/how-to-get-there-section.component';
import { ParkingInfoSectionComponent } from './components/parking-info-section.component';
import { GallerySectionComponent } from './components/gallery-section.component';
import { ScheduleCtaSectionComponent } from './components/schedule-cta-section.component';
import { UbicacionFaqSectionComponent } from './components/ubicacion-faq-section.component';
import { UbicacionFinalCtaSectionComponent } from './components/ubicacion-final-cta-section.component';

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
  selector: 'app-ubicacion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    UbicacionHeroSectionComponent,
    ContactInfoSectionComponent,
    HowToGetThereSectionComponent,
    ParkingInfoSectionComponent,
    GallerySectionComponent,
    ScheduleCtaSectionComponent,
    UbicacionFaqSectionComponent,
    UbicacionFinalCtaSectionComponent,
  ],
  template: `
    <app-ubicacion-hero-section />
    <app-contact-info-section />
    <app-how-to-get-there-section />
    <app-parking-info-section />
    <app-gallery-section />
    <app-schedule-cta-section />
    <app-ubicacion-faq-section />
    <app-ubicacion-final-cta-section />
  `,
})
export class UbicacionComponent {}

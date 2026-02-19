import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AboutHeroSectionComponent } from './components/hero-section.component';
import { AboutIntroductionSectionComponent } from './components/introduction-section.component';
import { AboutMissionVisionValuesSectionComponent } from './components/mission-vision-values-section.component';
import { AboutStatsSectionComponent } from './components/stats-section.component';
import { AboutWhyChooseUsSectionComponent } from './components/why-choose-us-section.component';
import { AboutTeamSectionComponent } from './components/team-section.component';
import { AboutCertificationsSectionComponent } from './components/certifications-section.component';
import { AboutFacilitiesSectionComponent } from './components/facilities-section.component';
import { AboutTestimonialsSectionComponent } from './components/testimonials-section.component';
import { AboutTimelineSectionComponent } from './components/timeline-section.component';
import { AboutFinalCtaSectionComponent } from './components/final-cta-section.component';

/**
 * About page — Nosotros page for CIA Vial del Llano.
 * Orchestrates all section components in the correct visual order.
 *
 * This is a zero-logic orchestrator that composes 11 section components
 * covering the company's history, mission, team, certifications,
 * facilities, testimonials, and call-to-action.
 */
@Component({
  selector: 'app-about-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AboutHeroSectionComponent,
    AboutIntroductionSectionComponent,
    AboutMissionVisionValuesSectionComponent,
    AboutStatsSectionComponent,
    AboutWhyChooseUsSectionComponent,
    AboutTeamSectionComponent,
    AboutCertificationsSectionComponent,
    AboutFacilitiesSectionComponent,
    AboutTestimonialsSectionComponent,
    AboutTimelineSectionComponent,
    AboutFinalCtaSectionComponent,
  ],
  template: `
    <app-about-hero-section />
    <app-about-introduction-section />
    <app-about-mission-vision-values-section />
    <app-about-stats-section />
    <app-about-why-choose-us-section />
    <app-about-team-section />
    <app-about-certifications-section />
    <app-about-facilities-section />
    <app-about-testimonials-section />
    <app-about-timeline-section />
    <app-about-final-cta-section />
  `,
})
export class AboutPageComponent {}

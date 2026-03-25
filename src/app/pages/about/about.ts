import { ChangeDetectionStrategy, Component } from '@angular/core';
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
export class About {}

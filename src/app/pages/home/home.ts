import { ChangeDetectionStrategy, Component } from '@angular/core';
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
export class HomeComponent {}

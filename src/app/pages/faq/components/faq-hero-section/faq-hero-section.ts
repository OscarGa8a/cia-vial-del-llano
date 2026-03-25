import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Hero section for the FAQ page.
 * Displays breadcrumb navigation, a large "?" icon, headline text,
 * and a wave divider matching the home page hero pattern.
 */
@Component({
  selector: 'app-faq-hero-section',
  imports: [NgOptimizedImage],
  templateUrl: './faq-hero-section.html',
  styleUrl: './faq-hero-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqHeroSection {}

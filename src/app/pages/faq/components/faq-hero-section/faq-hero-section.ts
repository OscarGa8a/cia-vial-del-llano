import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon } from '@shared/components';
import { CircleQuestionMarkIcon } from 'lucide-angular';

/**
 * Hero section for the FAQ page.
 * Displays breadcrumb navigation, a large "?" icon, headline text,
 * and a wave divider matching the home page hero pattern.
 */
@Component({
  selector: 'app-faq-hero-section',
  imports: [NgOptimizedImage, Icon],
  templateUrl: './faq-hero-section.html',
  styleUrl: './faq-hero-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqHeroSection {
  /** Expose the CircleQuestionMarkIcon for use in the template */
  protected readonly CircleQuestionIcon = CircleQuestionMarkIcon;
}

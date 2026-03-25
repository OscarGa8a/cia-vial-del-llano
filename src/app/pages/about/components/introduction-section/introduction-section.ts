import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon } from '@shared/components';
import { MedalIcon } from 'lucide-angular';

/**
 * Introduction / Story section for the About page.
 * Displays the company history narrative with a placeholder image
 * and a floating "10+ years" badge.
 */
@Component({
  selector: 'app-introduction-section',
  imports: [NgOptimizedImage, Icon],
  templateUrl: './introduction-section.html',
  styleUrl: './introduction-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroductionSection {
  /** Medal icon reference for the "2+ years" badge. */
  protected readonly MedalIcon = MedalIcon;
}

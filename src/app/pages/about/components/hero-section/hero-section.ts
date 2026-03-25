import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '@shared/components';
import { Building2Icon } from 'lucide-angular';

/**
 * Hero section for the About (Nosotros) page.
 *
 * Displays breadcrumb navigation, a building icon, headline content,
 * supporting subtitle, and a decorative wave divider consistent with
 * the visual pattern used across key landing sections.
 *
 * @example
 * ```typescript
 * <app-hero-section />
 * ```
 */
@Component({
  selector: 'app-hero-section',
  imports: [RouterLink, NgOptimizedImage, Icon],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSection {
  /** Building icon reference used in the hero visual header. */
  protected readonly Building2Icon = Building2Icon;
}

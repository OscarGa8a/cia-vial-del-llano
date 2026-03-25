import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

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
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSection {}

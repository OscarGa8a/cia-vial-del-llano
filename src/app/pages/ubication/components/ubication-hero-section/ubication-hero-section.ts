import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Hero section for the location page with breadcrumb, heading, and wave divider.
 */
@Component({
  selector: 'app-ubication-hero-section',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './ubication-hero-section.html',
  styleUrl: './ubication-hero-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UbicationHeroSection {}

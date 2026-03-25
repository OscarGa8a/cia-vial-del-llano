import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '@shared/components';
import { MailIcon } from 'lucide-angular';

/**
 * Hero section for the Contact (Contacto) page.
 * Displays breadcrumb navigation, a mail icon, headline text,
 * subtitle, and a wave divider matching the FAQ/About hero pattern.
 */
@Component({
  selector: 'app-hero-section',
  imports: [RouterLink, NgOptimizedImage, Icon],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSection {
  /** Expose the MailIcon for use in the template. */
  protected readonly MailIcon = MailIcon;
}

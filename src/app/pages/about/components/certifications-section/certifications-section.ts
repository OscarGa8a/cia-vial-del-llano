import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CERTIFICATIONS } from '@core/data/about-page.data';
import { Icon } from '@shared/components';

/**
 * Certifications section for the About page.
 * Displays official certifications and endorsements in a 4-column grid.
 */
@Component({
  selector: 'app-certifications-section',
  imports: [Icon],
  templateUrl: './certifications-section.html',
  styleUrl: './certifications-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CertificationsSection {
  /** List of certifications to display in the section, sourced from static data. */
  protected readonly certifications = CERTIFICATIONS;
}

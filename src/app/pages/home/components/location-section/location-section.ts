import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CONFIG } from '@core/data/config.data';
import { CircleUserIcon, Clock4Icon, MapPinIcon, PhoneIcon } from 'lucide-angular';
import { Icon } from '@shared/components';

/**
 * Location and business hours section with embedded Google Maps.
 *
 * Displays the organization's office location with an embedded Google Maps iframe
 * and a schedule table showing business hours for each day of the week.
 * The map URL is sanitized to allow nested iframes.
 *
 * @example
 * ```typescript
 * <app-location-section />
 * ```
 */
@Component({
  selector: 'app-location-section',
  imports: [Icon],
  templateUrl: './location-section.html',
  styleUrl: './location-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationSection {
  /** Angular DomSanitizer for bypassing iframe security restrictions. */
  private readonly sanitizer = inject(DomSanitizer);

  /** Application configuration with location and map embed details. */
  protected readonly config = CONFIG;

  /** Sanitized Google Maps embed URL safe for iframe rendering. */
  protected readonly mapSrc = this.sanitizer.bypassSecurityTrustResourceUrl(CONFIG.mapEmbedUrl);

  /** Map pin icon used for location display. */
  protected readonly MapPinIcon = MapPinIcon;

  /** Clock icon used for schedule display. */
  protected readonly Clock4Icon = Clock4Icon;

  /** Phone icon used for contact information display. */
  protected readonly PhoneIcon = PhoneIcon;

  /** Circle user icon used for staff or contact person display. */
  protected readonly CircleUserIcon = CircleUserIcon;

  /**
   * Business hours schedule organized by day.
   *
   * Shows working hours and status (open/closed) for each day.
   * Used to display operating hours in a schedule table.
   */
  protected readonly schedules = [
    { days: 'Lunes a Viernes', hours: '8:00 AM – 6:00 PM', open: true },
    { days: 'Sábados', hours: '8:00 AM – 2:00 PM', open: true },
    { days: 'Domingos', hours: 'Cerrado', open: false },
  ] as const;
}

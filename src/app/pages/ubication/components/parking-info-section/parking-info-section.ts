import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon } from '@shared/components';
import { CheckIcon, CircleParkingIcon } from 'lucide-angular';

/**
 * Shows parking availability details and free parking confirmation for visitors.
 *
 * @example
 * ```html
 * <app-parking-info-section />
 * ```
 */
@Component({
  selector: 'app-parking-info-section',
  imports: [Icon],
  templateUrl: './parking-info-section.html',
  styleUrl: './parking-info-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParkingInfoSection {
  /** Parking icon used in the section headline and visual cues. */
  protected readonly CircleParkingIcon = CircleParkingIcon;

  /** Check icon used to highlight included parking benefits. */
  protected readonly CheckIcon = CheckIcon;
}

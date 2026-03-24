import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon } from '@shared/components';
import {
  BuildingIcon,
  BusIcon,
  CarIcon,
  CheckIcon,
  ChevronRightIcon,
  CircleParkingIcon,
  ZapIcon,
} from 'lucide-angular';

/**
 * Displays travel guidance to the office by car, public transport, and landmarks.
 *
 * @example
 * ```html
 * <app-how-to-get-there-section />
 * ```
 */
@Component({
  selector: 'app-how-to-get-there-section',
  imports: [Icon],
  templateUrl: './how-to-get-there-section.html',
  styleUrl: './how-to-get-there-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HowToGetThereSection {
  /** Car icon used in the private transport section. */
  protected readonly CarIcon = CarIcon;

  /** Chevron icon used in directional list items. */
  protected readonly ChevronRightIcon = ChevronRightIcon;

  /** Parking icon used for parking availability hints. */
  protected readonly CircleParkingIcon = CircleParkingIcon;

  /** Bus icon used in the public transport section. */
  protected readonly BusIcon = BusIcon;

  /** Bolt icon used for quick route tips. */
  protected readonly ZapIcon = ZapIcon;

  /** Building icon used for nearby landmark references. */
  protected readonly BuildingIcon = BuildingIcon;

  /** Check icon used for highlighted recommendations. */
  protected readonly CheckIcon = CheckIcon;
}

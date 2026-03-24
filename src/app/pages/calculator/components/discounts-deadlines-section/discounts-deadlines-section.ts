import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon } from '@shared/components';
import { CameraIcon, HatGlassesIcon } from 'lucide-angular';

/**
 * Visual timeline cards showing the discount deadline windows
 * for both manual comparendos and fotomultas.
 */
@Component({
  selector: 'app-discounts-deadlines-section',
  imports: [Icon],
  templateUrl: './discounts-deadlines-section.html',
  styleUrl: './discounts-deadlines-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscountsDeadlinesSection {
  /** Icon references for use in the template. */
  protected readonly HatGlassesIcon = HatGlassesIcon;
  protected readonly CameraIcon = CameraIcon;
}

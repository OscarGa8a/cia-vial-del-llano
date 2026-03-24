import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CONFIG } from '@core/data/config.data';
import { Icon } from '@shared/components';
import { InfoIcon } from 'lucide-angular';

/**
 * Informational card explaining what the SMDLV is and its 2025 value.
 * Helps users understand how fine amounts are derived.
 */
@Component({
  selector: 'app-smdlv-info-section',
  imports: [Icon],
  templateUrl: './smdlv-info-section.html',
  styleUrl: './smdlv-info-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmdlvInfoSection {
  /** Formatted SMDLV daily value for display. */
  protected readonly smdlvFormatted = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(CONFIG.smdlvDaily2025);

  /** Icon reference for use in the template. */
  protected readonly InfoIcon = InfoIcon;
}

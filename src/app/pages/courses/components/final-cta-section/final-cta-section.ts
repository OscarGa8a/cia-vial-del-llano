import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CONFIG } from '@core/data/config.data';
import { Whatsapp } from '@core/services';
import { Icon } from '@shared/components';
import { GraduationCapIcon } from 'lucide-angular';

/**
 * Final call-to-action section for the courses page with WhatsApp conversion entrypoint.
 * Displays trust metrics and a primary enrollment CTA.
 *
 * @example
 * ```typescript
 * <app-final-cta-section />
 * ```
 */
@Component({
  selector: 'app-final-cta-section',
  imports: [Icon],
  templateUrl: './final-cta-section.html',
  styleUrl: './final-cta-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinalCtaSection {
  /** WhatsApp service used to build prefilled enrollment links. */
  private readonly whatsapp = inject(Whatsapp);

  /** Prebuilt WhatsApp URL for the final enrollment call-to-action button. */
  protected readonly whatsappLink = computed(() =>
    this.whatsapp.generateLink(
      'Hola, quiero agendar mi curso pedagógico para obtener el descuento en mi comparendo. ¿Cuándo hay disponibilidad?',
    ),
  );

  /** Key credibility metrics displayed in the section stats area. */
  protected readonly stats = [
    { value: CONFIG.stats.courses, label: 'Cursos realizados' },
    { value: CONFIG.stats.satisfaction, label: 'Clientes satisfechos' },
    { value: CONFIG.stats.yearsExperience, label: 'Años de experiencia' },
  ] as const;

  /** Graduation cap icon used in the section visual identity. */
  protected readonly GraduationCapIcon = GraduationCapIcon;
}

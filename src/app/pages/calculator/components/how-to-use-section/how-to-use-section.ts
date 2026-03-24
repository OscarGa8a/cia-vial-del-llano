import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Step {
  readonly number: string;
  readonly title: string;
  readonly description: string;
}

/**
 * "How to use the calculator" section — 3-step guide.
 */
@Component({
  selector: 'app-how-to-use-section',
  imports: [],
  templateUrl: './how-to-use-section.html',
  styleUrl: './how-to-use-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HowToUseSection {
  protected readonly steps: Step[] = [
    {
      number: '1',
      title: 'Selecciona la Infracción',
      description:
        'Elige si fue manual (agente de tránsito) o fotomulta, y busca el código de tu infracción en el formulario o en la tabla.',
    },
    {
      number: '2',
      title: 'Ingresa la Fecha',
      description:
        'Coloca la fecha exacta que aparece en tu comparendo. El sistema calculará los días hábiles transcurridos.',
    },
    {
      number: '3',
      title: 'Mira tu Ahorro',
      description:
        'Verás cuánto pagas con el descuento disponible y hasta cuándo tienes plazo. Luego agenda tu curso por WhatsApp.',
    },
  ];
}

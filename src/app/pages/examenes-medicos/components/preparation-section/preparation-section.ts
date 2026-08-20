import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CheckIcon } from 'lucide-angular';
import { Icon } from '@shared/components';

/** Helps visitors prepare a medical exam service request. */
@Component({
  selector: 'app-medical-exams-preparation-section',
  imports: [Icon],
  templateUrl: './preparation-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicalExamsPreparationSection {
  protected readonly prepareItems = [
    'El trámite de licencia para el que solicitas los exámenes médicos.',
    'La información que tengas disponible para tu solicitud.',
  ] as const;
  protected readonly confirmItems = [
    'La documentación disponible para tu solicitud.',
    'La cita, la ubicación, el valor y la disponibilidad.',
    'Los detalles que necesitas para continuar.',
  ] as const;
  protected readonly CheckIcon = CheckIcon;
}

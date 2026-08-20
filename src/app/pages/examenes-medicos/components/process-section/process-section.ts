import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { getServiceById } from '@core/data/services.data';
import { SERVICE_IDS } from '@core/models/service.model';
import { Whatsapp } from '@core/services';
import { Icon } from '@shared/components';

/** Shows the medical exam service request path. */
@Component({
  selector: 'app-medical-exams-process-section',
  imports: [Icon],
  templateUrl: './process-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicalExamsProcessSection {
  private readonly whatsapp = inject(Whatsapp);
  private readonly service = getServiceById(SERVICE_IDS.MEDICAL_EXAMS);

  protected readonly steps = [
    { title: 'Solicita los exámenes médicos', description: 'Escríbenos por WhatsApp para solicitar el servicio.' },
    { title: 'Comparte tu trámite de licencia', description: 'Cuéntanos qué trámite deseas realizar.' },
    { title: 'Confirma los detalles', description: 'Revisa documentación, cita, ubicación, valor y disponibilidad.' },
    { title: 'Continúa con la información confirmada', description: 'Avanza con los detalles que confirmaste para tu solicitud.' },
  ] as const;

  /** Opens the tracked medical exam service request. */
  protected contact(): void {
    this.whatsapp.openServiceChat(this.service, 'medical-exams-process');
  }
}

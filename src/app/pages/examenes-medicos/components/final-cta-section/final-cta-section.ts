import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { getServiceById } from '@core/data/services.data';
import { SERVICE_IDS } from '@core/models/service.model';
import { Whatsapp } from '@core/services';
import { MessageCircleIcon } from 'lucide-angular';
import { Icon } from '@shared/components';

/** Final invitation to request the medical exam service. */
@Component({
  selector: 'app-medical-exams-final-cta-section',
  imports: [Icon],
  templateUrl: './final-cta-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicalExamsFinalCtaSection {
  private readonly whatsapp = inject(Whatsapp);
  private readonly service = getServiceById(SERVICE_IDS.MEDICAL_EXAMS);
  protected readonly MessageCircleIcon = MessageCircleIcon;

  /** Opens the tracked final medical exam service request. */
  protected contact(): void {
    this.whatsapp.openServiceChat(this.service, 'medical-exams-final-cta');
  }
}

import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { getServiceById } from '@core/data/services.data';
import { SERVICE_IDS } from '@core/models/service.model';
import { Whatsapp } from '@core/services';
import { CheckIcon, StethoscopeIcon } from 'lucide-angular';
import { Icon } from '@shared/components';

/** Service-specific entry point for medical exam requests. */
@Component({
  selector: 'app-medical-exams-hero-section',
  imports: [Icon, NgOptimizedImage, RouterLink],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicalExamsHeroSection {
  private readonly whatsapp = inject(Whatsapp);
  private readonly service = getServiceById(SERVICE_IDS.MEDICAL_EXAMS);

  /** TODO: Replace only after the user supplies the approved Cloudinary public ID. */
  protected readonly heroImagePublicId = 'TODO_CLOUDINARY_PUBLIC_ID_MEDICAL_EXAMS';
  protected readonly quickHighlights = [
    'Servicio en Villavicencio',
    'Solicitud por WhatsApp',
    'Detalles por confirmar',
  ] as const;
  protected readonly CheckIcon = CheckIcon;
  protected readonly StethoscopeIcon = StethoscopeIcon;

  /** Opens the tracked, service-specific medical exam request. */
  protected contact(): void {
    this.whatsapp.openServiceChat(this.service, 'medical-exams-hero');
  }
}

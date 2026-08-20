import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Introduces the medical exam service for licence requests. */
@Component({
  selector: 'app-medical-exams-purpose-section',
  imports: [NgOptimizedImage],
  templateUrl: './purpose-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicalExamsPurposeSection {
  /** TODO: Replace only after the user supplies the approved Cloudinary public ID. */
  protected readonly referenceImagePublicId = 'TODO_CLOUDINARY_PUBLIC_ID_MEDICAL_EXAMS_PURPOSE';
}
